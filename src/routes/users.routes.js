const express = require("express");
const router = new express.Router()
const db = require('../config/database');
const User = require('../models/user')
const Sequelize = require('sequelize');
const { or, and, gt, lt } = Sequelize.Op;


.post('/create/user', async (req, res) => {
    const qgetuery = `
    INSERT INTO users (email, firstname, lastname, age , mobileno , city , state)  VALUES ('${req.body.email}','${req.body.firstname}', '${req.body.lastname}','${req.body.age}', '${req.body.mobileno}', '${req.body.city}', '${req.body.state}')
    `;
    try {
        const exist = await db.query(`SELECT COUNT(*) FROM users WHERE email = '${req.body.email}'`)
        if (exist[0][0].count == 0) {
            // await db.query(query);
            User.create({
                "email": req.body.email,
                "firstname": req.body.firstname,
                "lastname": req.body.lastname,
                "age": req.body.age,
                "mobileno": req.body.mobileno,
                "city": req.body.city,
                "state": req.body.state,
                "password": req.body.password
            })
            res.send({ success: true, message: 'User created successfully' })
        } else {
            res.send({ success: true, message: 'user already exist' })
        }
    } catch (err) {
        console.log(err);
    }
})




// router.get('/', async (req, res) => {
//     const query = `
//     CREATE TABLE node_schema.userss (
//         email varchar,
//         firstName varchar,
//         lastName varchar,
//         age int
//     )`;
//     client.query(query, (err, res) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log('Table is successfully created');
//         client.end();
//     });

// })
module.exports = router