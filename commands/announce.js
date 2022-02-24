const Guild = require('../models/guild');
const mongoose = require('mongoose');

module.exports = {
    name: 'announce',
    aliases: ['ano'],
    description: 'Announcement time!',
    usage: 'announce <message here>',
    complete: false,
    category: 'info',
    requiredPermissions: [],
    execute: async (client, message, guild, args) => {
        const guild = await Guild.findOne({
            guildID: message.guild.id,
        });

        const ch = message.guild.channels.cache.find((channel) => channel.id === guild.announceChannel);
        if (ch) {
            ch.send(args.join(' '));
        } else {
            message.channel
                .send(
                    `There doesn't seem to be an announcement channel currently set. Please set one with \`.setchannel announce #channel\``
                )
                .then((m) => m.delete({ timeout: 10000 }));
        }
    },
};
