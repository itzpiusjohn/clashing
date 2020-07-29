'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const db = require('helpers/db');
const log = require('helpers/logger');

/**
 * Express router to mount default functions.
 * @type {express.Router}
 */
const router = new express.Router();

const mobileNumberRegex = /^\+([1-9]{1,3})([-. ]{1,})?([1-9]{1})?([0-9]{1,2})?([-. ]{1,})?([0-9]{1,3})([-. ]{1,})?([0-9]{4})$/;

router.post(
	'/register',
	[
		body(['name', 'email', 'mobile_number', 'password']).trim(),
		body('name')
			.exists()
			.withMessage('Name is required.')
			.isString()
			.withMessage('Name must be a string.')
			.isLength({min: 3})
			.withMessage('Name must be at least 3 characters long'),
		body('email')
			.exists()
			.withMessage('Email is required')
			.isEmail()
			.withMessage('Email must be a valid email address')
			.custom(
				(value) => {
					return new Promise(
						(resolve, reject) => {
							db.query(
								'SELECT IF(COUNT(*), TRUE, FALSE) AS `exists` FROM `users` WHERE `email` = ?',
								value,
								(e, r) => {
									if (e) {
										log.error(e);
										reject(new Error('Email address verification failed.'));
										return;
									}

									if (r[0].exists) {
										reject(new Error('This email address is already in use.'));
										return;
									}

									resolve('The email address is unique.');
								},
							);
						},
					);
				},
			),
		body('mobile_number')
			.exists()
			.withMessage('Mobile number is required.')
			.matches(mobileNumberRegex)
			.withMessage('Mobile number should look like +12234567890')
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

									if (r[0].exists) {
										reject(new Error('This moblile number is already in use.'));
										return;
									}

									resolve('The moblile number is unique.');
								},
							);
						},
					);
				},
			),
		body('password')
			.isLength({min: 5})
			.withMessage('Password the password must contain at least 5 characters.'),
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

		data.password = bcrypt.hashSync(data.password, 10);
		data.mobile_number = data.mobile_number.replace(/[-. +]/gi, '');

		db.query('INSERT INTO `users` SET ?', data, (e, r) => {
			if (e) {
				log.error(e);
				res.status(500).json(
					{
						message: 'Some error occured while creating user record.',
					},
				);
				return;
			}

			db.query(
				'SELECT `name`, `email`, `mobile_number`, `role` FROM `users` WHERE `id` = ?',
				r.insertId,
				(e, r) => {
					if (e) {
						log.error(e);
						res.status(500).json(
							{
								message: 'Some error occured while fetching new user record.',
							},
						);
						return;
					}

					const token = jwt.sign(
						{
							user_id: r.insertId,
						},
						process.env.APP_KEY,
						{
							expiresIn: '14d',
						},
					);

					return res.json(
						{
							message: 'User created successfully.',
							user: r[0],
							token,
						},
					);
				},
			);
		});
	});

module.exports = router;
