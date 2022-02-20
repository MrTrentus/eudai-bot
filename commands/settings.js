const { Permissions, MessageEmbed } = require('discord.js');
// const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = {
    name: 'settings',
    description: 'Shows current settings',
    usage: 'settings',
    category: 'admin',
    requiredPermissions: [Permissions.FLAGS.ADMINISTRATOR],
    execute: async (client, message, args) => {
        if (!message.member.permissions.has(this.requiredPermissions))
            return message.reply(
                'Please contact an admin, you do not have permission to run this command.'
            );

        // Delete the request message
        await message.delete({ timeout: 3000 });

        const guild = await Guild.findOne({
            guildID: message.guild.id,
        });

        console.log(guild);

        const embed = new MessageEmbed()
            .setColor('#156f9c')
            .setTitle(':gear: Settings')
            .setDescription('These are your current settings:')
            .addFields(
                { name: 'Prefix:', value: '!' },
                { name: 'Allowed Roles:', value: 'Undefined' },
                { name: 'Delete User Command:', value: 'False' }
            )
            .setFooter({ text: 'Footer!' });

        await message.channel.send({
            embeds: [embed],
        });
    },
};
