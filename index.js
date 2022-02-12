const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, MessageComponentInteraction } = require('discord.js');
const { confirm, edit } = require('./channel-ids.json');
const { jobs, servers, job_emojis } = require('./datas.json');
const colors = require('./colors.json');

//const { token } = require('./config.json'); //테스트용

const prefix = '!';

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

/*
client.on('messageReactionAdd', async (reaction, user) => {
    console.log(`emoji : ${reaction.emoji.name}`);
    console.log(`Message Channel : ${reaction.message.channelId}\nConfirm Channel : ${confirm}`);
    if (reaction.message.channelId === confirm) {
        
    }
});
*/

//client.on('messageReactionRemove', )

client.once('ready', () => {
    console.log("LAA Bot is ready!");
    console.log(`Prefix : ${prefix}`);
});

client.on('message', async message => {
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
                    client.users.cache.get(message.author.id).send('정보를 변경하였습니다.');
                }
            } else {
                message.reply({
                    content: '입력하지 않은 부분이 있거나 입력할 항목 갯수를 초과하였습니다. 다시 양식에 맞게 입력해주시기 바랍니다.',
                    ephemeral: true
                });
                //client.users.cache.get(message.author.id).send('입력하지 않은 부분이 있거나 입력할 항목 갯수를 초과하였습니다. 다시 양식에 맞게 입력해주시기 바랍니다.');
            }
        }
        message.delete();
    } else {
        if (message.content.split(' ')[0] === prefix+'정보') {
            var roleList = '';
            var jobList = '';
            for (let i = 0; i < message.member.roles.cache.size-1; i++) {
                if (jobs.indexOf(message.member.roles.cache.at(i).name) !== -1) {
                    jobList += message.member.roles.cache.at(i).name+'\n';
                } else {
                    roleList += message.member.roles.cache.at(i).name+'\n';
                }
            }

            const informationEmbed = new MessageEmbed()
                .setColor(colors.keycard)
                .setTitle(message.member.nickname)
                .setThumbnail(message.author.avatarURL())
                .addFields(
                    { name: '본인 역할', value: roleList, inline: true},
                    { name: '클래스', value: jobList, inline: true}
                )
                .setFooter({
                    text: 'Lostark Assistant',
                    iconURL: 'https://cdn.discordapp.com/attachments/941186050741649489/941186087672500284/app_icon.png'
                });

            message.reply({
                ephemeral: true,
                embeds: [informationEmbed]
            });
        } else if (message.content.split(' ')[0] === prefix+'도움') {

            const row = new MessageActionRow()
			.addComponents(
                new MessageButton()
					.setLabel('로스트아크 어시스턴트 앱')
					.setStyle('LINK')
                    .setURL('https://play.google.com/store/apps/details?id=com.lostark.lostarkapplication')
            );

            const helpEmbed = new MessageEmbed()
                .setColor(colors.keycard)
                .setTitle('LAA Bot 명령어')
                .setDescription('LAA Bot의 명령어들의 사용법을 확인하실 수 있습니다.')
                .setThumbnail('https://cdn.discordapp.com/attachments/941186050741649489/941186087672500284/app_icon.png')
                .addFields(
                    { name: '!도움', value: 'LAA Bot의 명령어 목록을 확인합니다.' },
                    { name: '!정보', value: '나의 정보를 출력합니다. (별명, 직업, 본인 역할)' },
                    { name: '!역할부여', value: '*\'__👌-사용자-인증__\' 채널에서만 사용가능*\n디스코드 가입시 사용자 인증을 합니다.' },
                    { name: '!수정', value: '*\'__#✎-정보수정__\' 채널에서만 사용 가능*\n본인의 별명, 서버, 클래스를 변경할 때 사용합니다.' }
                )
                .setFooter({
                    text: 'Lostark Assistant',
                    iconURL: 'https://cdn.discordapp.com/attachments/941186050741649489/941186087672500284/app_icon.png'
                });

            message.reply({
                embeds: [helpEmbed],
                components: [row],
                ephemeral: true
            });

            const filter = (btnInt) => {
                return message.member.id === btnInt.user.id;
            }

            const collector = message.channel.createMessageComponentCollector({
                filter,
                max: 1,
                time: 1000 * 15
            })

            collector.on('collect', (i) => {
                i.reply({
                    content: '로스트아크 어시스턴트 플레이스토어 엽니다.',
                    ephemeral: true
                })
            })

            collector.on('end', async (collection) => {
                /*collection.forEach((click) => {
                    console.log(click.user.id, click.customId)
                })*/

                if (collection.first()?.customId === 'btnEdit') {
                    // edit the target channel position
                    
                }
            })
        }
    }
});


//테스트용
//client.login(token);

//Heroku 전용
client.login(process.env.TOKEN);