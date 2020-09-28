const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Sequelize = require('sequelize');
const { or, and, gt, lt } = Sequelize.Op;


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "LOVEYOUMOMDAD")
        var user = await User.findAll({ where: { "email": decoded.email, [and]: [{ "id": [decoded.id] }] } })
        req.token = token
        req.user = user
        next();
    } catch (e) {
        res.status(401).send("Pleasae Authenticate")
    }
}
module.exports = auth;