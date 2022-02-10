// const mongoose = require('mongoose');
// const Guild = require('../../models/guild');
// const User = require('../../models/user');

module.exports = {
    name: 'messageCreate',
    description: 'Event triggered off of message creation',
    complete: true,
    once: false,
    async execute(message, client) {
        // If the user is a bot - ignore the message:
        if (message.author.bot) return;

        // If there's no guild associated (aka, a DM) - ignore command
        if (!message.guildId) return;

        // If the message doesn't start with the prefix, or mention the bot, ignore
        if (!message.content.startsWith(client.prefix)) return;

        // If there is no member to the message, go fetch it
        if (!message.member) message.member = await message.guild.fetchMember(message);

        // Set the arguments for the command
        const args = message.content.slice(client.prefix.length).split(/ +/g);
        const cmd = args.shift().toLowerCase();

        //If the command prefix is provided, but no command - return.
        if (cmd.length === 0) return;

        // Check if command is one of the client commands, if not, check to see if it exists amongst the aliases, then if not - exit
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (!command) return;
        // Assuming all checks pass - execute the command
        command.execute(client, message, args);
    },
};
