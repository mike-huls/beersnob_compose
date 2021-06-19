const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const loggingService = require('./services/loggingService')
const NAMESPACE = 'server';


// Create app
const app = express();


/* Logging the request */
app.use((req, res, next) => {
	loggingService.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

	res.on('finish', () => {
		loggingService.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
	});
	next();
});


/* Parse requests */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));


/* Rules of API*/
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Headers', 'GET PATCH DELETE POST PUT')
		return res.status(200).json({});
	}
	next();
})


/* Routes */
app.use('/api/countries', require('./routes/countries'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/venues', require('./routes/venues'));
app.use('/api/beers', require('./routes/beers'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/test', require('./routes/test'));


/* Error Handling */
app.use((req, res, next) => {
	const error = new Error('not found');
	return res.status(404).json({
		message: error.message
	});
})


/* Create Server */
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
	loggingService.info(NAMESPACE, `Server running on ${PORT}`)
})