module.exports = {
    name: 'settings',
    description: 'Shows current settings',
    usage: 'settings',
    category: 'admin',
    execute(client, message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#156f9c')
        .setTitle(':gear: Settings')
        .setDescription('These are your current settings:')
        .addFields(
            {name: 'Prefix:', value: '!'},
            {name: 'Allowed Roles:', value: 'Undefined'},
            {name: 'Delete User Command:', value: 'False'},
        )
        .setFooter('Dis mah foot!');

        message.channel.send(newEmbed);
        message.delete();
    }
}