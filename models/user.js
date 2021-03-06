const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    userName: String,
    alts: Object,
    profs: Object
});

module.exports = mongoose.model('User', userSchema, 'users');