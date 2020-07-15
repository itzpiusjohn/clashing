'use strict';

exports.up = function(knex) {
	return knex.schema.createTable(
		'users',
		(table) => {
			table.bigIncrements('id', 11).unsigned().primary();
			table.string('name', 60).notNullable();
			table.string('email', 60).notNullable();
			table.string('mobile', 20).notNullable();
			table.string('password');
		},
	);
};

exports.down = function(knex) {
	return knex.schema.dropTable('users');
};
