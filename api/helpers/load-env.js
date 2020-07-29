'use strict';

/**
 * @type {boolean}
 * make sure that dotenv.config() is done only once
 * to avoid throwing warnings
 */
let init;

const debug = (process.env.NODE_ENV || 'development') == 'development';

module.exports = () => {
	if (!init) {
		require('dotenv').config(
			{
				debug: debug,
			},
		);
		init = true;
	}
};

// TODO: Test loadenv by checking env values
