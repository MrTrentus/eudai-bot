const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'commands',
    aliases: ['cmd'],
    description: 'Listing of all commands',
    usage: 'commands',
    complete: true,
    category: 'info',
    requiredPermissions: [],
    execute: async (client, message, args) => {
        if (!message.member.permissions.has(this.requiredPermissions)) return message.reply('You do not have permission to run this command.');

        // Delete the request message
        await message.delete({ timeout: 3000 });

        // Set Command Vars for Embed
        const commandNames = client.commands.reduce((acc, cmd) => acc + `${cmd.name}\n`, '');
        const commandCategories = client.commands.reduce((acc, cmd) => acc + `${cmd.category}\n`, '');
        const commandPerms = client.commands.reduce((acc, cmd) => acc + `${cmd.requiredPermissions?.length ? '✅' : '❌'}\n`, '');

        const embed = new MessageEmbed()
            .setColor(client.embedColor)
            .setTitle('Command List')
            .setDescription('Use `' + `${client.prefix}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\n`)
            .addFields(
                { name: 'Command', value: commandNames, inline: true },
                { name: 'Category', value: commandCategories, inline: true },
                { name: 'Requires Special Permissions', value: commandPerms, inline: true }
            );

        await message.channel.send({ embeds: [embed] });
    },
};

async function getAll(client, message) {
    const embed = new MessageEmbed().setColor(process.env.COLOR).setTitle('Command List').setThumbnail(client.user.avatarURL());

    const commands = (category) => {
        return client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `- \`${client.prefix + cmd.name}\``)
            .join('\n');
    };

    const info = client.categories
        .map((cat) => stripIndents`**${cat[0].toLowerCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => `${string}\n${category}`);

    message.delete();
    return message.channel.send();
}
