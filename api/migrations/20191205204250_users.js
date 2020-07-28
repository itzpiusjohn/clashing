'use strict';

exports.up = function(knex) {
	return knex.schema.createTable(
		'users',
		(table) => {
			table.bigIncrements('id', 11).unsigned();
			table.string('name', 60).notNullable();
			table.string('email', 60).notNullable();
			table.string('mobile_number', 20);
			table.string('role', 20).defaultTo('customer').notNullable();
			table.string('password');
			table.timestamp('created_at', {precision: 6}).defaultTo(knex.fn.now(6)).notNullable();
			table.timestamp('updated_at', {precision: 6}).defaultTo(knex.fn.now(6)).notNullable();
			table.timestamp('deleted_at', {precision: 6});
			table.unique('email', 'uk-email');
			table.unique('mobile_number', 'uk-mobile_number');
		},
	);
};

exports.down = function(knex) {
	return knex.schema.dropTable('users');
};
