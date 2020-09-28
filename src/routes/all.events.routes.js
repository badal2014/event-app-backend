const express = require('express');
const router = new express.Router();
const All_events = require('../models/all.events.model');
const auth = require('../middleware/authJwt');
const subscribed_events = require('../models/subscribed.events.model');
const User = require('../models/user');
const db = require('../config/database');
const Sequelize = require('sequelize')
const { or, and, gt, lt } = Sequelize.Op;


router.post('/create/event', auth, async (req, res) => {
    console.log(`${req.body.event_date}T10:39:55.312Z`)
    try {
        await All_events.create({
            "user_id": req.user[0].id,
            "event_name": req.body.event_name,
            "description": req.body.description,
            "status_active": req.body.status_active,
            "subscribe_status": req.body.subscribe_status,
            "event_date": `'${req.body.event_date} 18:11:13.061 +00:00'`,
        })
        if (req.body.subscribe_status === "true") {
            const event = await All_events.findOne({ where: { 'event_name': req.body.event_name } })
            console.log("in abd", event)
            try {
                await subscribed_events.create({
                    "user_id": event.user_id,
                    'event_id': event.id,
                    'event_name': event.event_name,
                    'subscribe_date': new Date(),
                    'subscription_date': `'${event.event_date} 18:11:13.061 +00:00'`,
                    "description": event.description,
                })
            }
            catch (err) {
                console.log(err)
            }
            res.send(event)
        } else {
            res.send({ success: true, message: 'Task created successfully' })
        }
        // res.send({ success: true, message: 'Task created successfully' })
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.post('/subscribe/event', auth, async (req, res) => {
    try {
        const event = await All_events.findOne({ where: { 'event_name': req.body.event_name, [and]: [{ "id": [req.body.event_id] }] } })
        if (event) {
            console.log("event", event)
            var todayDate = new Date().toISOString().slice(0, 10);
            // const update = `UPDATE all_events SET subscribe_status = true WHERE id='${req.body.event_id}' AND event_name='${req.body.event_name}'`
            const create = `INSERT INTO subscribed_events (event_id , event_name , subscribe_date , subscription_date , description) VALUES ('${event.id}' , '${event.event_name}' , '${todayDate} 18:11:13.061 +00:00' , '${event.event_date} 18:11:13.061 +00:00', '${event.description}')`
            await db.query(create)
            // console.log(uStatus)
            // try {
            //     await subscribed_events.create({
            //         'event_id': event.id,
            //         'event_name': event.event_name,
            //         'subscribe_date': new Date(),
            //         'subscription_date': new Date(),
            //     })
            // }
            // catch (err) {
            //     console.log(err)
            // }
            res.send(event)
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})
module.exports = router