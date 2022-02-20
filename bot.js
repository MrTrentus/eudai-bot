const { Client, Intents, Collection } = require('discord.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

dotenv.config();
const token = process.env.BOT_TOKEN;

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.prefix = process.env.PREFIX;
// client.commands.status = {};
// client.events.status = {};
client.embedColor = '#138999';
client.mongoose = require('./db/mongoose');
// client.categories = ['admin', 'utility', 'info'];

// Created a Handler for each "item" - event and command
// This will loop through the handlers and require them.
// Each handler in return will require each of the subsequent commands or events

//'command_handler',
['command_handler', 'event_handler'].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.mongoose.init();
client.login(token);
