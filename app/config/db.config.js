module.exports = {
  HOST: process.env.PG_HOST,
  PORT: process.env.PG_PORT,
  USER: process.env.PG_USER,
  PASSWORD: process.env.PG_PASSWORD,
  DB: process.env.PG_DB,
  SCHEMA: process.env.PG_SCHEMA,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};