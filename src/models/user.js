const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const db = require('../config/database');
const jwt = require('jsonwebtoken');

const User = db.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mobileno: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    city: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// User.methods.toJSON = function () {
//     const user = this
//     const userObject = user.toObject()
//     delete userObject.password
//     return userObject
// }
User.prototype.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ id: user.id, email: user.email.toString() }, "LOVEYOUMOMDAD")
    return token
}

User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
}
module.exports = User;