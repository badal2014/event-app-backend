const express = require('express');
const app = express();
const users = require('./routes/users.routes');
const auth = require('./routes/auth.routes')
const all_events = require('./routes/all.events.routes');
const cors = require('cors');
const port = process.env.PORT || 3000;
// const db = require('./config/database');

const findPeopleByName = require('./mailer/cron-job')


// db.authenticate()
//     .then(() => console.log('Database connected'))
//     .catch(err => console.log('Error', err))
app.use(cors())
findPeopleByName()
app.use(express.json())
app.use(users)
app.use(auth)
app.use(all_events)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})