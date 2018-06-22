module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'justvue',
    user: process.env.DB_USER || 'jvue',
    password: process.env.DB_PW || '2malTanzen',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'Kalle'
  }
}
