const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            // useFindAndModify: false,
            // poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4,
        };

        mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@discordbots.n2vfv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            dbOptions
        );
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose has successfully connected!');
        });

        mongoose.connection.on('err', (err) => {
            console.error(`Mongoose connection error: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection lost');
        });
    },
};
