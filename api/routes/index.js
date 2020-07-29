'use strict';

const express = require('express');

/**
 * Express router to mount default functions.
 * @type {express.Router}
 */
const router = new express.Router();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */
const healthCheck = (req, res) => {
	return res.json({
		message: 'it works!',
	});
};

router.get('/', healthCheck);

module.exports = router;
