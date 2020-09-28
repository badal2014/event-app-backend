const Sequelize = require('sequelize');
const db = require('../config/database');

const all_events = db.define('all_events', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    event_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    subscribe_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    event_date: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = all_events