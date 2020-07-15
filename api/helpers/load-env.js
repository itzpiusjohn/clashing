'use strict';

const dotenv = require('dotenv');

/**
 * @type {boolean}
 * make sure that dotenv.config() is done only once
 * to avoid throwing warnings
 */
let init;

module.exports = () => {
	if (!init) {
		dotenv.config(
			{
				debug: process.env.NODE_ENV == 'development',
			},
		);
		init = true;
	}
};

// TODO: Test loadenv by checking env values
