'use strict';

const express = require('express');

/**
 * Express router to mount default functions.
 * @type {express.Router}
 * @const
 * @namespace usersRouter
 */
const router = new express.Router();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @return {express.Response}
 */
const index = (req, res, next) => {
	return res.json({
		message: 'it works!',
	});
};

router.get('/', index);

module.exports = router;

// TODO: Convert index route to health check route
