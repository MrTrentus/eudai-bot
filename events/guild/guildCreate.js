const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'guildCreate',
    description: 'Event triggered from creating/adding a guild (server)',
    complete: true,
    once: false,
    execute: async (guild, client) => {
        console.log(`Joined Server: ${guild.name}(${guild.id})`);

        let foundGuild = await fetchGuild(guild);

        // Guild already in database, somehow. Probably due to a failure on the delete. Regardless, do not add a new one.
        if (foundGuild) return;

        // Create a new guild, the ID is audo-generated.
        const newGuild = new Guild({
            // _id: mongoose.Types.ObjectId(),
            guildID: guild.id,
            guildName: guild.name,
            prefix: client.prefix,
            announceChannel: null,
        });

        // Save the new guild creation.
        await newGuild
            .save()
            .then((res) => console.log(`Added new guild to database: ${res.guildName}(${res.guildID})`))
            .catch((err) => console.log(`Error creating new guild: ${guild.name}: ${err}`));
    },
};

async function fetchGuild(guild) {
    try {
        const foundGuild = await Guild.findOne({
            guildID: guild.id,
        });

        return foundGuild;
    } catch (error) {
        console.log(`Error finding guild: ${error}`);
    }
}
