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

function createCertification(clone) {
    var row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('인증받기')
                    .setStyle('PRIMARY')
                    .setCustomId('btnConfirm'),
                new MessageButton()
                    .setLabel('로스트아크 어시스턴트 앱')
                    .setStyle('LINK')
                    .setURL('https://play.google.com/store/apps/details?id=com.lostark.lostarkapplication'),
                new MessageButton()
                    .setLabel('로스트아크 어시스턴트 사이트')
                    .setStyle('LINK')
                    .setURL('https://lostark-assistant-next.vercel.app')
    );

    clone.send({
        content: `:tada:  **로스트아크 어시스턴트 디스코드**에 오신걸 환영합니다!! :tada:
저희 디스코드를 사용하시려면 아래의 **규칙**을 꼭 확인해주세요.

- **채팅, 음성**을 사용하실 때 상대방을 비하하는 발언, **욕설** 등을 사용하지 마세요.
- 채팅할 내용이 있을 때 주제에 맞는 카테고리에 입력해주시기 바랍니다. ex) 창술사 관련 얘기면 창술사 채팅방을 이용, 자유채팅방에서 간단하게 얘기하는 정도는 인정
- 로스트아크 어시스턴트 서버에서 개인 거래는 **금지**입니다. 저희 서버에서 일어난 금전적 사기에 의한 피해는 저희가 책임지지 않습니다.
- 저희 디스코드 서버는 **규칙**과 **공지사항**을 확인하지 않아 생기는 불이익에 대해서는 책임지지 않습니다.

인증 후 **__🧍-별명-변경__**에서 별명을 변경해주시고, **__🏢-직업-설정__**에서 직업을 변경해주시기 바랍니다.
`,
        components: [row]
    });

    const filter = i => {
        return i.customId === 'btnConfirm';
    };

    const collector = clone.createMessageComponentCollector({
        filter
    });

    
    collector.on('collect', async i => {
        if (i.customId === 'btnConfirm') {
            const add_role = i.guild.roles.cache.find(role => role.name === '인증자');
            //const add_role = message.guild.roles.cache.find(role => role.name === '사용자');
            var isDouble = false;
            for (let j = 0; j < i.member.roles.cache.size; j++) {
                if (i.member.roles.cache.at(j).name === '인증자' || i.member.roles.cache.at(j).name === '사용자') {
                    isDouble = true;
                    break;
                }
            }
            if (isDouble) {
                await i.reply({
                    content: '이미 권한을 부여받았습니다.',
                    ephemeral: true
                });
            } else {
                i.member.roles.add(add_role);
                client.channels.cache.get('945891054408847470').send(`\`\`\`${i.member.user.username}(${i.member.id})님이 \"사용자\" 권한을 부여받았습니다.\`\`\``);
                await i.reply({
                    content: `\"사용자\" 권한을 획득하셨습니다.
${client.channels.cache.get('945902634898980914').toString()}에서 별명을 변경해 주시고, ${client.channels.cache.find(channel => channel.name === '🏢-직업-설정').toString()}에서 직업을 선택해주세요.`,
                    ephemeral: true
                });
            }
        }
    });

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });
}

function processCertification() {
    var channel = client.channels.cache.find(channel => channel.name === '👌-사용자-인증');
    channel.clone().then(clone => createCertification(clone));
    channel.delete();
}

function createJob(clone) {
    var job1_row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('버서커')
            .setStyle('SECONDARY')
            .setCustomId('btnJob1'),
        new MessageButton()
            .setLabel('디스트로이어')
            .setStyle('SECONDARY')
            .setCustomId('btnJob2'),
        new MessageButton()
            .setLabel('워로드')
            .setStyle('SECONDARY')
            .setCustomId('btnJob3'),
        new MessageButton()
            .setLabel('홀리나이트')
            .setStyle('SECONDARY')
            .setCustomId('btnJob4'),
    );
    var job2_row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('배틀마스터')
            .setStyle('SECONDARY')
            .setCustomId('btnJob5'),
        new MessageButton()
            .setLabel('인파이터')
            .setStyle('SECONDARY')
            .setCustomId('btnJob6'),
        new MessageButton()
            .setLabel('기공사')
            .setStyle('SECONDARY')
            .setCustomId('btnJob7'),
        new MessageButton()
            .setLabel('창술사')
            .setStyle('SECONDARY')
            .setCustomId('btnJob8'),
        new MessageButton()
            .setLabel('스트라이커')
            .setStyle('SECONDARY')
            .setCustomId('btnJob9'),
    );
    var job3_row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('데빌헌터')
            .setStyle('SECONDARY')
            .setCustomId('btnJob10'),
        new MessageButton()
            .setLabel('블래스터')
            .setStyle('SECONDARY')
            .setCustomId('btnJob11'),
        new MessageButton()
            .setLabel('호크아이')
            .setStyle('SECONDARY')
            .setCustomId('btnJob12'),
        new MessageButton()
            .setLabel('스카우터')
            .setStyle('SECONDARY')
            .setCustomId('btnJob13'),
        new MessageButton()
            .setLabel('건슬링어')
            .setStyle('SECONDARY')
            .setCustomId('btnJob14'),
    );
    var job4_row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('아르카나')
            .setStyle('SECONDARY')
            .setCustomId('btnJob15'),
        new MessageButton()
            .setLabel('서머너')
            .setStyle('SECONDARY')
            .setCustomId('btnJob16'),
        new MessageButton()
            .setLabel('바드')
            .setStyle('SECONDARY')
            .setCustomId('btnJob17'),
        new MessageButton()
            .setLabel('소서리스')
            .setStyle('SECONDARY')
            .setCustomId('btnJob18'),
    );
    var job5_row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('데모닉')
            .setStyle('SECONDARY')
            .setCustomId('btnJob19'),
        new MessageButton()
            .setLabel('블레이드')
            .setStyle('SECONDARY')
            .setCustomId('btnJob20'),
        new MessageButton()
            .setLabel('리퍼')
            .setStyle('SECONDARY')
            .setCustomId('btnJob21'),
        new MessageButton()
            .setLabel('도화가')
            .setStyle('SECONDARY')
            .setCustomId('btnJob22')
    );

    clone.send({
        content: `:office: **직업**을 선택할 때 아래 직업들을 확인하신 후 **본인 캐릭터**의 직업을 선택하시면 **직업 역할**이 추가됩니다.

이미 직업을 선택해도 다른 직업으로 변경할 경우 다른 직업을 선택하면 원래 직업은 삭제되고 새로운 직업이 추가됩니다.
        
인증 후 직업 선택 후 별명을 변경하지 않으셨다면 ${client.channels.cache.get('945902634898980914').toString()}에서 **별명**을 변경해주시기 바랍니다.`,
        components: [job1_row, job2_row, job3_row, job4_row, job5_row]
    });

    const filter = i => {
        var result = false;
        for (let index = 0; index < 22; index++) {
            if (i.customId === 'btnJob'+(index+1)) {
                result = true;
                break;
            }
        }
        return result;
    };

    const collector = clone.createMessageComponentCollector({
        filter
    });
    
    collector.on('collect', async i => {
        var undo_job = 'none';
        var job = 'none';
        for (let index = 0; index < 22; index++) {
            if (i.customId === 'btnJob'+(index+1)) {
                var isDouble = false;
                job = jobs[index];
                for (let t = 0; t < i.member.roles.cache.size; t++) {
                    if (jobs.indexOf(i.member.roles.cache.at(t).name) !== -1) {
                        const undo_job_role = i.guild.roles.cache.find(role => role.name === i.member.roles.cache.at(t).name);
                        undo_job = undo_job_role.name;
                        i.member.roles.remove(undo_job_role);
                        isDouble = true;
                        break;
                    }
                }
                const job_role = i.guild.roles.cache.find(role => role.name === job);
                i.member.roles.add(job_role);

                if (isDouble) {
                    await i.reply({
                        content: `\"${undo_job}\"에서 \"${job}\"으로 직업을 변경하셨습니다.`,
                        ephemeral: true
                    });
                } else {
                    await i.reply({
                        content: `\"${job}\" 직업을 설정하셨습니다.`,
                        ephemeral: true
                    });
                }
                
                break;
            }
        }
    });

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });
}

function processJob() {
    var channel = client.channels.cache.find(channel => channel.name === '🏢-직업-설정');
    channel.clone().then(clone => createJob(clone));
    channel.delete();
}

client.once('ready', () => {
    console.log("LAA Bot is ready!");
    console.log(`Prefix : ${prefix}`);

    processCertification();
    processJob();
});

client.on('message', async message => {
    if (message.channelId === '945902634898980914') {
        if (message.content.charAt(0) === prefix) {
            var isMember = false;
            for (let t = 0; t < message.member.roles.cache.size; t++) {
                if (message.member.roles.cache.at(t).name === '사용자') {
                    isMember = true;
                }
            }
            if (!isMember) {
                const role = message.guild.roles.cache.find(role => role.name === '사용자');
                message.member.roles.add(role);
            }
            message.member.setNickname(message.content.substring(1));
            client.users.cache.get(message.author.id).send(`\`\`\`별명을 변경하였습니다. "사용자" 역할을 부여받았습니다.\`\`\``);
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
            });
        } else if (message.content.split(' ')[0] === prefix+'아이디') {
            await message.reply({
                content: `현재 채널 ID : ${message.channel.id}`,
                ephemeral: true
            });
        }
    }
});


//테스트용
//client.login(token);

//Heroku 전용
client.login(process.env.TOKEN);