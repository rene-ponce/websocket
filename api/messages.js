const fs = require('fs');

class MessagesApi {
  constructor (file) {
    this.file = file;
  }

  async save(data) {
    try {
      // Create file if not exists
      if (!fs.existsSync(this.file)) {
        await fs.promises.writeFile(this.file, '[]', 'utf-8');
      }
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      const json = JSON.parse(contenido);
      let id = 0;
      // Set id value
      if (json.length === 0) {
        id = 1;
      } else {
        id = json.at(-1).id + 1;
      }
      data.id = id;
      json.push(data);
      // Write file
      await fs.promises.writeFile(this.file, JSON.stringify(json, null, 2));
      return `El id asignado es: ${id}`;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      const json = JSON.parse(contenido);
      const index = json.findIndex(el => {
        return el.id === Number(id);
      });
      // If index not found return null
      if (index === -1) {
        return null;
      }
      const item = json.splice(index, 1);
      return item;
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      return contenido;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      const json = JSON.parse(contenido);
      const index = json.findIndex(el => {
        return el.id === Number(id);
      });
      // Validate 
      if (index === -1) {
        throw new Error('Id no encontrado');
      }
      json.splice(index, 1);
      await fs.promises.writeFile(this.file, JSON.stringify(json, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      const contenido = await fs.promises.readFile(this.file, 'utf-8');
      const json = JSON.parse(contenido);
      json.splice(0, json.length);
      await fs.promises.writeFile(this.file, JSON.stringify(json, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MessagesApi;