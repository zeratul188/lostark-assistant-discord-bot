const { Client, Intents } = require('discord.js');
const { token, prefix } = require('./config.json');
const { confirm, edit } = require('./channel-ids.json');
const { jobs, servers } = require('./datas.json');

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
] });
client.once('ready', () => {
    console.log("LAA Bot is ready!");
    console.log('Prefix : '+prefix);
});

client.on('message', message => {
    if (message.channelId === confirm) {
        var contents = message.content.split(' ');
        if (contents[0] === prefix+'역할부여') {
            if (contents.length === 4) {
                const nickname = contents[1];
                const job = contents[2];
                const server = contents[3];
                if (jobs.indexOf(job) === -1) {
                    client.users.cache.get(message.author.id).send('입력하신 클래스랑 일치하는 클래스가 없습니다.');
                } else if (servers.indexOf(server) === -1) {
                    client.users.cache.get(message.author.id).send('입력하신 서버랑 일치하는 서바가 없습니다.');
                } else {
                    const job_role = message.guild.roles.cache.find(role => role.name === job);
                    const role = message.guild.roles.cache.find(role => role.name === '사용자');
                    message.member.roles.add(job_role);
                    message.member.roles.add(role);
                    const new_nickname = nickname+'/'+server;
                    message.member.setNickname(new_nickname);
                    client.users.cache.get(message.author.id).send('인증 완료하였습니다. 로스트아크 어시스턴트 디스코드 벌명은 '+new_nickname+'입니다.');
                }
            } else {
                client.users.cache.get(message.author.id).send('입력하지 않은 부분이 있거나 입력할 항목 갯수를 초과하였습니다. 다시 양식에 맞게 입력해주시기 바랍니다.');
            }
        }
        message.delete();
    } else if (message.channel.name === edit) {
        var contents = message.content.split(' ');
        if (contents[0] === prefix+'수정') {
            if (contents.length === 4) {
                const nickname = contents[1];
                const job = contents[2];
                const server = contents[3];
                if (jobs.indexOf(job) === -1) {
                    client.users.cache.get(message.author.id).send('입력하신 클래스랑 일치하는 클래스가 없습니다.');
                } else if (servers.indexOf(server) === -1) {
                    client.users.cache.get(message.author.id).send('입력하신 서버랑 일치하는 서바가 없습니다.');
                } else {
                    for (let i = 0; i < message.member.roles.cache.size; i++) {
                        if (jobs.indexOf(message.member.roles.cache.at(i).name) !== -1) {
                            const undo_job_role = message.guild.roles.cache.find(role => role.name === message.member.roles.cache.at(i).name);
                            message.member.roles.remove(undo_job_role);
                            break;
                        }
                    }
                    const job_role = message.guild.roles.cache.find(role => role.name === job);
                    message.member.roles.add(job_role);
                    const new_nickname = nickname+'/'+server;
                    message.member.setNickname(new_nickname);
                    client.users.cache.get(message.author.id).send('정보를 변경하였습니다.');
                }
            } else {
                client.users.cache.get(message.author.id).send('입력하지 않은 부분이 있거나 입력할 항목 갯수를 초과하였습니다. 다시 양식에 맞게 입력해주시기 바랍니다.');
            }
        }
        message.delete();
    }
});

client.login(token);