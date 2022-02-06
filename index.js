const { Client, Intents } = require('discord.js');
const { token, prefix } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
client.once('ready', () => {
    console.log("LAA Bot is ready!");
    console.log('Prefix : '+prefix);
});

client.on('message', message => {
    console.log(message.content);
    if (message.content === prefix+'ping' ) {
        // "Pong"으로 되돌려 칩니다.
        message.channel.send("Pong");
    }
});

client.login(token);