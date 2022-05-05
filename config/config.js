module.exports = {
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: `./db/ecommerce.sqlite`
    },
    useNullAsDefault: true
  },
  mysql: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'course'
    }
  }
}