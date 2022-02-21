const mongoose = require('mongoose');

const guildSchema = mongoose.Schema(
    {
        // _id: mongoose.Schema.Types.ObjectId,
        guildID: String,
        guildName: String,
        prefix: String,
        announceChannel: String,
    },
    { autoIndex: true },
    { collection: 'guilds' }
);

module.exports = mongoose.model('Guild', guildSchema);
