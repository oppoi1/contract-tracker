module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    options: {
      dialect: process.env.DIALECT,
      host: process.env.HOST || 'localhost'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'Kalle'
  }
}
