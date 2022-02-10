const { MessageEmbed } = require('discord.js');
// const Guild = require('../models/guild');
// const mongoose = require('mongoose');

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Help! I need somebody to Help! Not just anybody...',
    usage: 'help [command]',
    complete: false,
    category: 'utility',
    execute: async (client, message, args) => {
        if (args[0]) {
            return await getCMD(client, message, args[0]);
        } else {
            return await helpMSG(client, message);
        }
    },
};

async function helpMSG(client, message) {
    const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle('Eudai Bot Help')
        // .setThumbnail(client.user.avatar())
        .setDescription(
            `For a full list of commands, please type \`${client.prefix}commands\` \n\nTo see more info about a specific command, please type \`${client.prefix}help <command>\` without the \`<>\``
        );

    return message.channel.send({
        embeds: [embed],
    });
}

async function getCMD(client, message, args) {
    // const guildDB = await Guild.findOne({
    //     guildID: message.guild.id,
    // });

    const embed = new MessageEmbed();

    const command = client.commands.get(args.toLowerCase()) || client.commands.get(client.aliases.get(args.toLowerCase()));

    let info = `No information found for command: **${args.toLowerCase()}**`;

    if (!command) {
        embed.setColor('#ff0000').setDescription(info);
        return message.channel.send({
            embeds: [embed],
        });
    }

    embed
        .setTitle(`Command: **${command.name}**`)
        .setDescription(`${command.description}`)
        .addFields(
            { name: '**Usage:**', value: `\`${client.prefix}${command.usage}\`` },
            {
                name: '**Required Permissions:**',
                value: `${command.requiredPermissions?.length ? command.requiredPermissions.map((perm) => `${perm.toArray()}`).join(', ') : 'none'}`,
            },
            { name: '**Category:**', value: `${command.category}`, inline: true },
            { name: '**Fully Functional:**', value: `${command.complete ? '✅' : '❌'}`, inline: true },
            {
                name: '**Aliases:**',
                value: `${command.aliases.length ? command.aliases.map((alias) => `\`${alias}\``).join(', ') : 'none'}`,
                inline: true,
            }
        )
        .setFooter({ text: '<> = REQUIRED | [] = OPTIONAL' })
        .setColor(client.embedColor);

    return message.channel.send({
        embeds: [embed],
    });
}
