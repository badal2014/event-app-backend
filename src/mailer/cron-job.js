var cron = require('node-cron');
const main = require('./node-mailer')

var findPeopleByName = function (userName, done) {
    cron.schedule('*/5 * * * * *', () => {
        console.log('stoped task');
        // main()
    });
    // User.find({ username: userName }, (err, data) => {
    //     if (err) {
    //         done(err);
    //     }
    //     done(null, data);
    // })
};

module.exports = findPeopleByName