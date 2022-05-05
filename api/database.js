const knex = require('knex');

class DatabaseApi {

  constructor (config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async getAll() {
    let data = [];
    await this.knex.from(this.table).select('*').then(rows => {
      for (let row of rows) {
        data.push({...row});
      }
    });
    return data;
  }

  async getById(id) {
    let data = [];
    await this.knex.from(this.table).select('*').where({id}).then(rows => {
      for (let row of rows) {
        data.push({...row});
      }
    });
    return data;
  }

  async create(data) {
    await this.knex(this.table).insert(data);
  }

  async update(id, data) {
    await this.knex.where({id}).update(data);
  }

  async delete(id) {
    await this.knex.where({id}).del();
  }

}

module.exports = DatabaseApi;