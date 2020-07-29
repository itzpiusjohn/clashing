'use strict';

const winston = require('winston');
const path = require('path');

// Load env once
require('helpers/load-env')();

const transports = [];

winston.addColors({
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	debug: 'green',
});

if (process.env.APP_ENV == 'production') {
	const logDirectory = path.resolve('storage/logs');

	// Combined logs to default.log
	transports.push(
		new winston.transports.File(
			{
				filename: `${logDirectory}/default.log`,
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.json(),
				),
				handleExceptions: true,
				level: 'info',
			},
		),
	);

	// Error logs to error.log
	transports.push(
		new winston.transports.File(
			{
				filename: `${logDirectory}/error.log`,
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.json(),
				),
				handleExceptions: true,
				level: 'error',
			},
		),
	);
} else {
	transports.push(
		new winston.transports.Console(
			{
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.simple(),
				),
				handleExceptions: true,
				level: 'debug',
			},
		),
	);
}

module.exports = winston.createLogger({
	transports,
	// Silence all logs during testing
	silent: process.env.APP_ENV == 'testing' ? true : false,
});

// TODO: Figure out a way to test logger
