const Guild = require('../models/guild');
const { Permissions } = require('discord.js');
const { deleteMessage } = require('../utils/utils');

module.exports = {
    name: 'announce',
    aliases: ['ano'],
    description: 'Announcement time!',
    usage: 'announce <message here>',
    complete: false,
    category: 'info',
    requiredPermissions: [Permissions.FLAGS.MANAGE_GUILD],
    execute: async (client, message, args) => {
        // Fetch the guild
        const guild = await Guild.findOne({
            guildID: message.guild.id,
        });

        const ch = message.guild.channels.cache.find((channel) => channel.id === guild.announceChannel);
        if (ch) {
            ch.send(args.join(' '));
        } else {
            message.channel.send(`There doesn't seem to be an announcement channel currently set. Please set one with \`${guild.prefix}setchannel announce #channel\``);
        }
    },
};
