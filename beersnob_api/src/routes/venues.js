const express = require('express');
const router = express.Router();

// Controllers
const { Op } = require("sequelize");

const models = require('../models');
const errorService = require('../services/errorService');



// Route for retrieving venues per id (or all)
router.get('/', async (req, res) => {

	let { id } = req.query;

	try {
		let foundVenues;
		if (id) {
			// Find one by ID
			foundVenues = await models.venue.findOne({
			  attributes: ['Name'],
				where: { 
					Id: id,
				}
			});
		} else {
			// Find all
			foundVenues = await models.venue.findAll()
		}

		// Get grouptype by id		
		res.status(200).json({
			venues: foundVenues
		});
	} catch(err) {
		errorService.send(res, err);
	}
});


// Route for looking up a venue name (e.g. for searchbars)
router.get('/search', async (req, res) => {

	// Get data
	let { q } = req.query;


	let foundVenues;
	try {

		if (!q || q.length < 3) {
			foundVenues = [];
		} else {
			foundVenues = await models.venue.findAll({
			  attributes: ['Name'],
				where: { 
					Name: {
						[Op.iLike]: `%${q}%`
					}
				}
			});
		}

		res.status(200).json({
			venues: foundVenues
		});
	} catch(err) {
		errorService.send(res, err);
	}
});


// Adding a new venue -> returns the venue Id and Name
router.post('/', async(req, res) => {

	let { Name } = req.body;
	let returnVenue;

	try {
		if (Name == null) 	errorService.raise(400, "venue name is required");

		// 1. Check if venue doesn't exist already
		returnVenue = await models.venue.findOne({
		  attributes: ['Name'],
			where: { 
				Name: {
					[Op.iLike]: `%${Name}%`
				}
			}
		});

		// 2. if returnVenue is still null -> create new one
		if (!returnVenue) {
			returnVenue = await models.venue.create({
				Name: Name
			});
		}

		// 3. Return
		res.status(200).json({
			venue: returnVenue
		});


	} catch(err) {
		errorService.send(res, err);
	}
});


module.exports = router;
