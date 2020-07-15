'use strict';

const {Base} = require('models/base');

/**
 * @extends {Base}
 */
class User extends Base {
	/**
   * @return {string} table name
   */
	static get tableName() {
		return 'users';
	}

	/**
   * @return {Object} JSON schema
   */
	static get jsonSchema() {
		return {
			type: 'object',
			required: [
				'name',
				'email',
				'mobile',
			],
			properties: {
				id: {type: 'integer'},
				name: {type: 'string', minLength: 1, maxLength: 60},
				email: {type: 'string', minLength: 1, maxLength: 60},
				mobile: {type: 'string', minLength: 1, maxLength: 20},
				password: {type: 'string'},
			},
		};
	}
}

module.exports = User;
