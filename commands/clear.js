const { Permissions } = require('discord.js');
const { deleteMessage } = require('../utils/utils');

module.exports = {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clears X amount of messages, within the last 14 days',
    usage: 'clear <number>',
    complete: false,
    category: 'utility',
    requiredPermissions: [Permissions.FLAGS.MANAGE_MESSAGES],
    execute: async (client, message, args) => {
        try {
            if (!message.member.permissions.has(this.requiredPermissions)) return message.reply('Please contact an admin, you do not have permission to run this command.');

            // Make sure that the argument sent is a number, and is between 1 and 100
            if (!args[0]) return message.reply('This function requires an integer input from 1-100');
            if (isNaN(args[0])) return message.reply('This function requires an integer input from 1-1000');

            if (args[0] > 100) return message.reply('The cap on message deletion is 100');
            if (args[0] < 1) return message.reply('You must delete at least 1 message!');

            const amount = args[0];

            // Fetch all messages in the channel up to the limit
            const req = await message.channel.messages.fetch({ limit: amount });
            const messages = await req.toJSON();

            // Bulk delete any messages < 14 days old
            await message.channel.bulkDelete(messages, true);

            console.log(`${message.author.username}#${message.author.discriminator} deleted ${amount} messages from server: ${message.guild.name}`);

            // Delete the request message
            deleteMessage(message);
            // !TODO: This will have to wait, but eventually allow a "force" option to over-ride the 14 day rule and delete 1 by 1
            // // If the user decides to "force" the call with flag `-force`
            // if (args[1] && args[1].toString() === '-force') {
            //     const waitMsg = await message.channel.send('Please be patient, deleting messages greater than 14 days....');
            //     const start = Date.now();

            //     // Loop through messages, determine if older than 14 days, then delete (up to the limit)
            //     await Promise.all(
            //         messages.map(async (msg) => {
            //             const daysPassed = Math.floor(start - msg.createdTimestamp / (24 * 60 * 60 * 1000));
            //             if (daysPassed > 14) {
            //                 await msg.delete();
            //             }
            //         })
            //     );

            //     // messages.forEach((msg) => {
            //     //     // Determine if the message is older than 14 days: now - created Time / (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
            //     //     const daysPassed = Math.floor(start - msg.createdTimestamp / (24 * 60 * 60 * 1000));
            //     //     if (daysPassed > 14) {
            //     //         msg.delete();
            //     //     }
            //     // });

            //     const finishMsg = await message.channel.send('Clear completed! (this message will self-destruct in 5 seconds 💣💣)');
            //     setTimeout(() => {
            //         finishMsg.delete();
            //         waitMsg.delete();
            //     }, 5000);
            // }
        } catch (error) {
            message.reply('There was an error deleting messages, please try again later.');
            console.log(`Error: ${error}`);
        }
    },
};
