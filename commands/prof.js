module.exports = {
    name: 'prof',
    aliases: ['job', 'profs', 'jobs'],
    description: 'Add Professions',
    usage: 'prof [args]',
    category: 'info',
    execute(client, message, args, Discord) {
        const ch = client.channels.cache.find((channels) => channels.name === 'profs');
        if (ch) {
            ch.fetch({ limit: 1 }).then((messages) => {
                // const lastMessage = messages.first();
                console.log(messages.content);
            });
        }
    },
};
