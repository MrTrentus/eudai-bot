const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'guildDelete',
    description: 'Event triggered from deleting a guild (server)',
    complete: true,
    once: false,
    execute: async (guild, client) => {
        console.log(`Left server: ${guild.name}(${guild.id})`);

        await Guild.findOneAndDelete({ guildID: guild.id })
            .then(console.log(`Deleted guild: ${guild.name}(${guild.id})`))
            .catch((err) => {
                console.log(`There was an error deleting guild: ${guild.name}(${guild.id}) : ${err}`);
            });
    },
};
