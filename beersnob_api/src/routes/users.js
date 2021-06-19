const express = require('express');
const router = express.Router();

// Controllers
const { Op } = require("sequelize");

const models = require('../models');
const errorService = require('../services/errorService');



// Route for retrieving users per id (or all)
router.get('/', async (req, res) => {

	let { id } = req.query;

	try {
		let foundUsers;
		if (id) {
			// Find one by ID
			foundUsers = await models.user.findOne({
			  attributes: ['Name'],
				where: { 
					Id: id,
				}
			});
		} else {
			// Find all
			foundUsers = await models.user.findAll()
		}

		// Get grouptype by id		
		res.status(200).json({
			users: foundUsers
		});
	} catch(err) {
		errorService.send(res, err);
	}
});


// Route for looking up a user name (e.g. for searchbars)
router.get('/search', async (req, res) => {

	// Get data
	let { q } = req.query;


	let foundUsers;
	try {

		if (!q || q.length < 3) {
			foundUsers = [];
		} else {
			foundUsers = await models.user.findAll({
			  attributes: ['Name'],
				where: { 
					Name: {
						[Op.iLike]: `%${q}%`
					}
				}
			});
		}

		res.status(200).json({
			users: foundUsers
		});
	} catch(err) {
		errorService.send(res, err);
	}
});


// Adding a new user -> returns the user Id and Name
router.post('/', async(req, res) => {

	let { Name } = req.body;
	let returnUser;

	try {
		if (Name == null) 	errorService.raise(400, "user name is required");

		// 1. Check if user doesn't exist already
		returnUser = await models.user.findOne({
		  attributes: ['Name'],
			where: { 
				Name: {
					[Op.iLike]: `%${Name}%`
				}
			}
		});

		// 2. if returnUser is still null -> create new one
		if (!returnUser) {
			returnUser = await models.user.create({
				Name: Name
			});
		}

		// 3. Return
		res.status(200).json({
			user: returnUser
		});


	} catch(err) {
		errorService.send(res, err);
	}
});


module.exports = router;
