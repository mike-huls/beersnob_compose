const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	res.status(200).json({
		result: 'api working!'
	})
});


module.exports = router;