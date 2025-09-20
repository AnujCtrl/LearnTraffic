module.exports = {
  development: {
    username: process.env.DB_USER || 'traffic_user',
    password: process.env.DB_PASSWORD || 'traffic_password',
    database: process.env.DB_NAME || 'traffic_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log, // Enable SQL logging in development
  },
  test: {
    username: process.env.DB_USER || 'traffic_user',
    password: process.env.DB_PASSWORD || 'traffic_password',
    database: process.env.DB_NAME_TEST || 'traffic_db_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  },
};
