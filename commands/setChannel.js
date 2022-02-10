const Guild = require('../models/guild');
const mongoose = require('mongoose');

module.exports =  {
    name: 'setchannel',
    aliases: ['sc'],
    description: 'Work in progress, meant to set channels for various items',
    usage: 'setChanel <channel type> <channel mention>',
    category: 'admin',
    execute: async (client, message, args, Discord, prefix) => {
        if(args.length < 2) return message.channel.send('Please supply a channel type, and mention a channel').then(m => m.delete({timeout: 5000}));
        if(args[0] != 'announce') return message.channel.send('Currently only allowed to set the \'announce\' channel').then(m => m.delete({timeout: 5000}));
        let channel = message.mentions.channels.first();

        const guild = await Guild.findOne({
            guildID: message.guild.id
        });

        await guild.updateOne({
            announceChannel: channel
        });

        return message.channel.send(`The announcement channel has been updated to ${channel}`).then(m => m.delete({timeout: 10000}));
    }
}