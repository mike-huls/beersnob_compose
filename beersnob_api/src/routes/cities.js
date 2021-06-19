const express = require('express');
const router = express.Router();

// Controllers
const { Op } = require("sequelize");

const models = require('../models');
const errorService = require('../services/errorService');



// Route for retrieving countries per id (or all)
router.get('/', async (req, res) => {

	let { id } = req.query;

	try {
		let foundCities;
		if (id) {
			// Find one by ID
			foundCities = await models.city.findOne({
			  attributes: ['Name'],
				where: { 
					Id: id,
				}
			});
		} else {
			// Find all
			foundCities = await models.city.findAll({
				attributes: ['Name']
			})
		}

		// Get grouptype by id		
		res.status(200).json({
			countries: foundCities
		});
	} catch(err) {
		errorService.send(res, err);
	}
});


// Route for looking up a city name (e.g. for searchbars)
router.get('/search', async (req, res) => {

	// Get data
	let { q } = req.query;


	let foundCities;
	try {

		if (!q || q.length < 3) {
			foundCities = [];
		} else {
			foundCities = await models.city.findAll({
			  attributes: ['Name'],
				where: { 
					Name: {
						[Op.iLike]: `%${q}%`
					}
				}
			});
		}

		res.status(200).json({
			countries: foundCities
		});
	} catch(err) {
		errorService.send(res, err);
	}
});


// Adding a new city -> returns the city Id and Name
router.post('/', async(req, res) => {

	let { Name } = req.body;
	let returncity;

	try {
		if (Name == null) 	errorService.raise(400, "Name is required");

		// 1. Check if city doesn't exist already
		returncity = await models.city.findOne({
			where: { 
				Name: {
					[Op.iLike]: `%${Name}%`
				}
			}
		});

		// 2. if returncity is still null -> create new one
		if (!returncity) {
			returncity = await models.city.create({
				Name: Name
			});
		}

		// 3. Return
		res.status(200).json({
			city: returncity
		});


	} catch(err) {
		errorService.send(res, err);
	}
});


module.exports = router;
