// Update with your config settings.
const localPg = {
  host: 'localhost',
  database: 'games',
  user: 'user',
  password: 'pass',
};
const productionDbConnection = process.env.DATABASE_URL || localPg;



module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/games.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: productionDbConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  }

};
