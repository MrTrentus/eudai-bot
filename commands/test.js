const { Permissions } = require('discord.js');

module.exports = {
    name: 'test',
    aliases: ['testing', 'tt', 'tester'],
    description: 'Testing',
    usage: 'test',
    complete: true,
    category: 'test',
    requiredPermissions: [Permissions.FLAGS.ADMINISTRATOR],
    execute: async (client, message, args) => {
        if (!message.member.permissions.has(this.requiredPermissions))
            return message.reply('Please contact an admin, you do not have permission to run this command.');

        // Delete the request message
        await message.delete({ timeout: 3000 });

        console.log(`${message.author.username} submitted a test from server: ${message.guild.name}!`);

        message.channel.send('Your test is complete, check server logs for details...');
    },
};
