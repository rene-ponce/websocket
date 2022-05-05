const config = require('../config/config.js');
const knex = require('knex');

// MaySQL
const mysqlDb = knex(config.mysql);
mysqlDb.schema.createTable('products', table => {
  table.increments('id');
  table.string('title');
  table.double('price');
  table.string('thumbnail');
})
  .then(() => console.log('Table products created'))
  .catch((error) => { console.log(error); throw error })
  .finally(() => { mysqlDb.destroy() });

// SQLite
const sqliteDb = knex(config.sqlite);
sqliteDb.schema.createTable('messages', table => {
  table.increments('id');
  table.string('email');
  table.string('message');
  table.string('date');
})
  .then(() => console.log('Table messages created'))
  .catch((error) => { console.log(error); throw error })
  .finally(() => { sqliteDb.destroy(); });