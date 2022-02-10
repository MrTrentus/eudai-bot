// const mongoose = require('mongoose');
// const Guild = require('../../models/guild');

module.exports = {
    name: 'guildDelete',
    description: 'Event triggered from deleting a guild (server)',
    complete: false,
    once: false,
    execute: async (message, client) => {
        console.log('wip');
    },
};

// module.exports = async (Discord, client, guild) => {
//     // Guild.findOneAndDelete({
//     //     guildID: guild.id
//     // }, (err, res) => {
//     //     if(err) console.error(err)
//     //     console.log(`I have been removed from server: ${guild.name}`);
//     // });
// };
