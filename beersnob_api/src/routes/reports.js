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
		let foundReports;
		if (id) {
			// Find one by ID
			foundReports = await models.report.findOne({
			  attributes: ['Created', 'Modified', 'VenueId', 'BeerId', 'UserId', 'Price', 'Rating', 'Review'],
				where: { 
					Id: id,
				}
			});
		} else {
			// Find all
			foundReports = await models.report.findAll({
			  attributes: ['Created', 'Modified', 'VenueId', 'BeerId', 'UserId', 'Price', 'Rating', 'Review'],
			});
		}

		// Get grouptype by id		
		res.status(200).json({
			reports: foundReports
		});
	} catch(err) {
		errorService.send(res, err);
	}
});



// Adding a new report -> returns the report
router.post('/', async(req, res) => {

	let { VenueId, BeerId, UserId, Price, Rating, Review } = req.body;

	try {
		if (VenueId == null) 	errorService.raise(400, "VenueId is required");
		if (BeerId == null) 	errorService.raise(400, "BeerId is required");
		if (UserId == null) 	errorService.raise(400, "UserId is required");


		// 1. if returnReport is still null -> create new one
		let returnReport = await models.report.create({
			'VenueId':VenueId, 
			'BeerId': BeerId, 
			'UserId': UserId, 
			'Price': Price, 
			'Rating': Rating, 
			'Review': Review 
		});

		// 3. Return
		res.status(200).json({
			report: returnReport
		});


	} catch(err) {
		errorService.send(res, err);
	}
});


module.exports = router;
