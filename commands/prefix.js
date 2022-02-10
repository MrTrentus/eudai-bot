const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports =  {
    name: 'prefix',
    aliases: ['p'],
    description: 'Change a prefix',
    usage: 'prefix [new prefix]',
    category: 'utility',
    execute: async (client, message, args, Discord) => {
        message.delete();

        if(!message.member.hasPermission('MANAGE_GUILD')){
            return message.reply('You do not have permission to use this command, please contact a server adminitrator.').then(m => m.delete({timeout: 10000}));
        };

        const settings = await Guild.findOne({
            guildID: message.guild.id
        });

        if(args.length < 1){
            return message.channel.send('You must supply a new prefix!').then(m => m.delete({timeout: 10000}));
        };

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`Your server prefix has been updated to \'${args[0]}\'`).then(m => m.delete({timeout: 10000}));
    }
}