// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:docker@localhost:5432/movies',
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'movies',
      user:     'postgres',
      password: 'docker'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'movies',
      user:     'postgres',
      password: 'docker'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }

};
