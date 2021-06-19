module.exports = {
  development: {
    username: "postgres",
    password: "mikepw",
    database: "beersnob",
    host: "localhost",
    port: "5432",
    dialect: "postgres"
  },
  production: {
    dialect: 'mssql',
    database: 'Test',
    username: 'testaccount',
    host: 'localhost',
    port: '1433',
    password: 'mike230889'
  }
}
