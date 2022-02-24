const { MessageAttachment, Permissions } = require('discord.js');
const { deleteMessage } = require('../utils/utils');
const Guild = require('../models/guild');

module.exports = {
    name: 'file',
    aliases: [],
    description: 'Create a text file from your message',
    usage: 'file | <input>',
    complete: false,
    category: 'utility',
    requiredPermissions: [],
    execute: async (client, message, args) => {
        if (!message.member.permissions.has(this.requiredPermissions)) return message.reply(`You do not have permission to run the ${this.name} command`);

        if (args[0] != '|') return message.reply('You must supply a pipe `|` to the content you wish to provide');

        // Fetch the guild for this message
        const guild = await Guild.findOne({
            guildID: message.guild.id,
        });

        // Remove the command portion of the content
        const fileContent = message.content.replace(`${guild.prefix}file | `, '');

        // Create a new MessageAttachment object with the new fileContent
        const attachment = new MessageAttachment(Buffer.from(fileContent, 'utf-8'), `${message.author.username}.txt`);

        await message.channel.send({ files: [attachment] });

        // Delete the request message
        deleteMessage(message);
    },
};
