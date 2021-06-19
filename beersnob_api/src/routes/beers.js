const express = require('express');
const router = express.Router();

const { Op } = require("sequelize");

const models = require('../models');
const errorService = require('../services/errorService');


// Route for looking up beer by name
router.get('/search', async (req, res) => {

	// Get data
	let { q } = req.query;


	let foundBeers;
	try {

		if (!q || q.length < 3) {
			foundBeers = [];
		} else {
			foundBeers = await models.beer.findAll({
			  attributes: ['Name', 'Type'],
				where: { 
					Name: {
						[Op.iLike]: `%${q}%`
					}
				}
			});
		}

		res.status(200).json({
			beers: foundBeers
		});
	} catch(err) {
		errorService.send(res, err);
	}
});


// Route for retrieving beers per id (or all)
router.get('/', async (req, res) => {

	let { id } = req.query;

	try {
		let foundBeers;
		if (id) {
			foundBeers = await models.beer.findOne({
			  attributes: ['Name', 'Type'],
				where: { 
					Id: id,
				}
			});
		} else {
			foundBeers = await models.beer.findAll()
		}

		// Get grouptype by id		
		res.status(200).json({
			beer: foundBeers
		});
	} catch(err) {
		errorService.send(res, err);
	}
});

// Adding a new beer -> returns the beer
router.post('/', async(req, res) => {

	let { Name, Type } = req.body;
	let returnbeer;

	try {
		if (Name == null) 	errorService.raise(400, "beer name is required");

		// 1. Check if beer doesn't exist already
		returnbeer = await models.beer.findOne({
		  attributes: ['Name'],
			where: { 
				Name: {
					[Op.iLike]: `%${Name}%`
				}
			}
		});

		// 2. if returnbeer is still null -> create new one
		if (!returnbeer) {
			returnbeer = await models.beer.create({
				Name: Name,
				Type: Type
			});
		}

		// 3. Return
		res.status(200).json({
			beer: returnbeer
		});


	} catch(err) {
		errorService.send(res, err);
	}
});


module.exports = router;
	