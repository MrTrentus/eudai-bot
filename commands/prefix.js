const Guild = require('../models/guild');
const { Permissions } = require('discord.js');
const { deleteMessage } = require('../utils/utils');

module.exports = {
    name: 'prefix',
    aliases: ['p'],
    description: 'Change a prefix',
    usage: 'prefix [new prefix]',
    complete: false,
    category: 'utility',
    requiredPermissions: [Permissions.FLAGS.MANAGE_GUILD],
    execute: async (client, message, args) => {
        if (!message.member.permissions.has(this.requiredPermissions))
            return message.reply(`You do not have permission to run the ${this.name} command`);

        if (args.length < 1) {
            return message.reply('You must supply a new prefix!');
        }

        const guild = await Guild.findOne({
            guildID: message.guild.id,
        });

        await guild.updateOne({
            prefix: args[0],
        });

        await message.channel.send(`Your server prefix has been updated to \`${args[0]}\``).then((m) => deleteMessage(m));

        // Delete the request message
        deleteMessage(message);
    },
};
