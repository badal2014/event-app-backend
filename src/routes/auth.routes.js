const express = require("express");
const router = new express.Router()
const db = require('../config/database');
const User = require('../models/user')
const Sequelize = require('sequelize');
const { or, and, gt, lt } = Sequelize.Op;

// Login Route
router.post('/user/login', async (req, res) => {
    try {
        var user = await User.findOne({ where: { "email": req.body.email, [and]: [{ "password": [req.body.password] }] } })
        if (user) {
            const token = await user.generateAuthToken()
            res.send({ user, token, message: "Logged In Successfully" })
        }
        else {
            res.status(200).send({ mesage: "Unable to login " })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router