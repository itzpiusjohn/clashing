'use strict';

const express = require('express');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('helpers/db');
const log = require('helpers/logger');

/**
 * Express router to mount default functions.
 * @type {express.Router}
 */
const router = new express.Router();

router.post(
	'/login',
	[
		body(['mobile_number', 'password']).trim(),
		body('mobile_number')
			.exists()
			.withMessage('Mobile number is required.')
			.custom(
				(value) => {
					return new Promise(
						(resolve, reject) => {
							value = value.replace(/[-. +]/gi, '');

							db.query(
								'SELECT IF(COUNT(*), TRUE, FALSE) AS `exists` FROM `users` WHERE `mobile_number` = ?',
								value,
								(e, r) => {
									if (e) {
										log.error(e);
										reject(new Error('Mobile number verification failed.'));
										return;
									}

									if (!r[0].exists) {
										reject(new Error('This moblile number is not in use.'));
										return;
									}

									resolve('The moblile number exists.');
								},
							);
						},
					);
				},
			),
		body('password')
			.exists({})
			.withMessage('Password is required.'),
	],
	(req, res) => {
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(400).json(
				{
					message: 'Validation error.',
					errors: validationErrors.array(),
				},
			);
		}

		const data = req.body;
		data.mobile_number = data.mobile_number.replace(/[-. +]/gi, '');

		db.query(
			'SELECT name, email, mobile_number, password FROM users WHERE mobile_number = ?',
			data.mobile_number,
			(e, r) => {
				if (e) {
					log.error(e);
					res.status(500).json(
						{
							message: 'Some error occured while fetching user record.',
						},
					);
					return;
				}

				if (!bcrypt.compareSync(data.password, r[0].password)) {
					return res.status(401).json(
						{
							message: 'Authentication failed.',
							error: 'Incorrect password.',
						},
					);
				}

				delete r[0].password;
				return res.json(
					{
						message: 'Login successful.',
						user: r[0],
						token: jwt.sign(
							{
								user_id: r[0].id,
							},
							process.env.APP_KEY,
							{
								expiresIn: '14d',
							},
						),
					},
				);
			},
		);
	},
);

module.exports = router;
