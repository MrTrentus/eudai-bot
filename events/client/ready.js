module.exports = {
    name: 'ready',
    description: 'Ready status for the starting of the discord bot',
    once: true,
    complete: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
