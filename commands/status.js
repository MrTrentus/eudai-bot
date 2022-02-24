const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'status',
    aliases: [],
    description: 'Gets the status of the commands / events',
    usage: 'status',
    complete: false,
    category: 'admin',
    requiredPermissions: [Permissions.FLAGS.MANAGE_GUILD],
    execute: async (client, message, args) => {
        if (!message.member.permissions.has(this.requiredPermissions)) return message.reply('Please contact an admin, you do not have permission to run this command.');

        // Set Command Vars for Embed
        const commandNames = client.commands.reduce((acc, cmd) => acc + `${cmd.name}\n`, '');
        const commandDesc = client.commands.reduce((acc, cmd) => acc + `${cmd.description}\n`, '');
        const commandCompletion = client.commands.reduce((acc, cmd) => acc + `${cmd.complete ? '✅' : '❌'}\n`, '');

        // Set Event Vars for Embed
        const eventNames = client.events.reduce((acc, event) => acc + `${event.name}\n`, '');
        const eventDesc = client.events.reduce((acc, event) => acc + `${event.description}\n`, '');
        const eventCompletion = client.events.reduce((acc, event) => acc + `${event.complete ? '✅' : '❌'}\n`, '');

        // Create Embed for commands
        const commandEmbed = new MessageEmbed()
            .setColor(client.embedColor)
            .setTitle('Current Command Status')
            .addFields(
                { name: 'Command', value: commandNames, inline: true },
                { name: 'Description', value: commandDesc, inline: true },
                { name: 'Completed', value: commandCompletion, inline: true }
            );

        // Create Embed for events
        const eventEmbed = new MessageEmbed()
            .setColor(client.embedColor)
            .setTitle('Current Event Status')
            .addFields(
                { name: 'Command', value: eventNames, inline: true },
                { name: 'Description', value: eventDesc, inline: true },
                { name: 'Completed', value: eventCompletion, inline: true }
            );

        await message.channel.send({
            embeds: [commandEmbed],
        });

        await message.channel.send({
            embeds: [eventEmbed],
        });
    },
};
