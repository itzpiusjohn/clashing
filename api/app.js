'use strict';

// Module imports
const http = require('http');
const express = require('express');
const boot = require('helpers/boot');
const apiIndex = require('routes/index');
const log = require('helpers/logger');

// Load env once
require('helpers/load-env')();

const app = express();

app.set('title', process.env.APP_NAME || 'APP_NAME');
app.set('env', process.env.APP_ENV || 'APP_ENV');

// Setup app middlewares and routes
boot(app);

// Default routes
app.use('/', apiIndex);

const server = http.createServer(app);

server.listen(process.env.HTTP_PORT, (err) => {
	if (err) {
		log.error(err);
		return 1;
	}
	log.info('HTTP running on port ' + process.env.HTTP_PORT);
});


// TODO: Tests that app mounts
// TODO: Add health check route
