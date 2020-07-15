'use strict';

require('helpers/load-env')();

const defaultConf = {
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	},
	migrations: {
		tableName: 'migrations',
	},
};

module.exports = {
	development: defaultConf,
	production: defaultConf,
	testing: defaultConf,
	testing: {
		client: 'sqlite3',
		connection: {
			filename: './testdb',
		},
		useNullAsDefault: true,
		migrations: {
			tableName: 'migrations',
		},
	},
};
