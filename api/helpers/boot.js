'use strict';

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const log = require('helpers/logger');

/**
 * @param {express.Application} app
 */
module.exports = (app) => {
	app.use(express.urlencoded({
		extended: false,
	}));
	app.use(
		morgan(
			'dev', {
				stream: {
					write: (msg) => {
						log.info(msg);
					},
				},
			},
		),
	);

	if (app.get('env') == 'production') {
		app.use(
			morgan(
				'combined',
				{
					stream: reqLog,
				},
			),
		);
	}

	app.use(express.json());
	app.use(helmet());
	app.use(express.static(path.resolve('public')));
};
