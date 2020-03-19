const { Client, Collection } = require('discord.js');
const config = require('./config.json');
const client = new Client();

["commands", "aliases"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));

client.login(config.token);