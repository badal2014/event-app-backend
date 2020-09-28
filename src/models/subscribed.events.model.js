const Sequelize = require('sequelize')
const db = require('../config/database');

const subscribed_events = db.define('subscribed_events', {
    event_id: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    event_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subscribe_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subscription_date: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = subscribed_events;