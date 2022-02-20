const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'guildCreate',
    description: 'Event triggered from creating/adding a guild (server)',
    complete: true,
    once: false,
    execute: async (guild, client) => {
        console.log(`Joined Server: ${guild.name}(${guild.id})`);

        const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: guild.id,
            guildName: guild.name,
            prefix: client.prefix,
            announceChannel: null,
        });

        await newGuild
            .save()
            .then((res) => console.log(`Added new guild to database: ${res.guildName}(${res.guildID})`))
            .catch((err) => console.log(`Error creating new guild: ${guild.name}: ${err}`));
    },
};
