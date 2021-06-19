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
		let foundCountries;
		if (id) {
			// Find one by ID
			foundCountries = await models.country.findOne({
			  attributes: ['Name'],
				where: { 
					Id: id,
				}
			});
		} else {
			// Find all
			foundCountries = await models.country.findAll()
		}

		// Get grouptype by id		
		res.status(200).json({
			countries: foundCountries
		});
	} catch(err) {
		errorService.send(res, err);
	}
});


// Route for looking up a country name (e.g. for searchbars)
router.get('/search', async (req, res) => {

	// Get data
	let { q } = req.query;


	let foundCountries;
	try {

		if (!q || q.length < 3) {
			foundCountries = [];
		} else {
			foundCountries = await models.country.findAll({
			  attributes: ['Name'],
				where: { 
					Name: {
						[Op.iLike]: `%${q}%`
					}
				}
			});
		}

		res.status(200).json({
			countries: foundCountries
		});
	} catch(err) {
		errorService.send(res, err);
	}
});


// Adding a new country -> returns the country Id and Name
router.post('/', async(req, res) => {

	let { Name } = req.body;
	let returnCountry;

	try {
		if (Name == null) 	errorService.raise(400, "Country name is required");

		// 1. Check if country doesn't exist already
		returnCountry = await models.country.findOne({
		  attributes: ['Name'],
			where: { 
				Name: {
					[Op.iLike]: `%${Name}%`
				}
			}
		});

		// 2. if returnCountry is still null -> create new one
		if (!returnCountry) {
			returnCountry = await models.country.create({
				Name: Name
			});
		}

		// 3. Return
		res.status(200).json({
			country: returnCountry
		});


	} catch(err) {
		errorService.send(res, err);
	}
});


module.exports = router;
