// const { Client } = require('pg');

// const client = new Client({
//     user: 'badal',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'badal123',
//     port: 5432,
// });
// client.connect()
// module.exports = client;

const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize('postgres', 'badal', 'badal123', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
module.exports = db;

