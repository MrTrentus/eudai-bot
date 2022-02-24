const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['pong'],
    category: 'info',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `ping`,
    requiredPermissions: [],
    complete: true,
    execute: async (client, message, guild, args) => {
        if (!message.member.permissions.has(this.requiredPermissions))
            return message.reply('Please contact an admin, you do not have permission to run this command.');

        // Delete the request message
        await message.delete({ timeout: 3000 });

        const msg = await message.channel.send('🏓 Pinging...');
        message.channel.sendTyping();

        const embed = new MessageEmbed()
            .setColor(client.embedColor)
            .setTitle('🏓 Pong!')
            .setDescription(
                `Bot Latency is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI Latency is **${Math.round(
                    client.ws.ping
                )} ms**`
            );

        message.channel.send({
            embeds: [embed],
        });
    },
};
