# contract-tracker

A vuejs beginner repo. It consists of two folders containing the client and the server.

The client is written with VueJS and Vuex.
The server is written in Typescript with ExpressJS and TypeORM.

Clone the repo, create a ORMConfig.json in the server1 folder and type in following information:

[
  {
    "name": "default",
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "USERNAME",
    "password": "PASSWORD",
    "database": "DATABASE",
    "synchronize": true,
    "entities": [
      "src/entities/**/*.ts"
    ]
  }
]

Except fill username, password and database with adaquate information.
The option "synchronize" says it will refresh the database if it exists with all tables, but will remove all entries.

I could need some help with authentication and general file usage / file upload.
