// const mongoose = require('mongoose');
// const Guild = require('../../models/guild');

// module.exports = async (Discord, client, guild) => {
//     guild = new Guild({
//         _id: mongoose.Types.ObjectId(),
//         guildID: guild.id,
//         guildName: guild.name,
//         prefix: process.env.PREFIX,
//         announceChannel: null
//     });

//     guild.save()
//     .then(result => console.log(result))
//     .catch(err => console.error(err));

//     console.log(`I have joined a new server: ${guild.guildName}`);
// };

module.exports = {
    name: 'guildCreate',
    description: 'Event triggered from creating/adding a guild (server)',
    complete: false,
    once: false,
    execute: async (message, client) => {
        console.log('wip');
    },
};
