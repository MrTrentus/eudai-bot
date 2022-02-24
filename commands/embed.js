module.exports = {
    name: 'embed',
    aliases: ['em'],
    description: 'Creates Embeds',
    usage: 'embed [args]',
    category: 'info',
    execute: async (client, message, args) => {
        args.forEach((arg) => {
            console.log(`Argument: ${arg}`);
        });

        let fullArgs = args.join('--');
        console.log(`Full Args: ${fullArgs}`);
        // const newEmbed = new Discord.MessageEmbed()
        // .setColor('#304281')
        // .setTitle('Testing Embed')
        // .setDescription('Yay Description!')
        // .setFooter('Dis mah foot!');

        // message.channel.send(newEmbed);
        // message.delete();
    },
};
