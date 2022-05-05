const knex = require('knex');

class DatabaseApi {

  constructor (config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async getAll() {
    const data = await this.knex.from(this.table).select('*').then(rows => console.log(rows));
    return data;
  }

  async getById(id) {}

  async create(data) {
    await this.knex(this.table).insert(data);
  }

  async update(id, data) {}

  async delete(id) {}

}

module.exports = DatabaseApi;