/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('movie', table => {
    table.increments('id');
    table.string('title').notNullable();
    table.boolean('hasWatched').notNullable().defaultTo(false);
    table.boolean('isGoingToWatch').notNullable().defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('movie');
};
