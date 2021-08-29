//LATEST STABLE 0.7.9 ALPHA && NORBIX [DEV]
const Discord = require('discord.js');
const { token, globalPrefix, build_version, mysql_host, mysql_user, mysql_password, mysql_database } = require('./config/config.js');
const client = new Discord.Client();
const cooldowns = new Discord.Collection();
const winston = require('winston');
const mysql = require('mysql');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

/*
 * [TESTING SPACE]
*/
    

/*
 * [.............]
*/

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `./logs/log_${Date.now()}` }),
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

const db_config = {
    host: mysql_host,
    user: mysql_user,
    password: mysql_password,
    database: mysql_database,
    multipleStatements: true,
    charset: "utf8mb4_general_ci",
};

var con;

function handleDisconnect() {
    con = mysql.createConnection(db_config);

    con.connect(function (err) {
        if (err) {
            console.log('There is an error while connecting to db: ', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

client.on('ready', () => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `@${client.user.username} at ${client.guilds.cache.size} servers.`,
            type: 'WATCHING'
        }
    });

    const Guilds = client.guilds.cache.map(guild => guild.id);

    logger.log('info', `App is going online as >>> ${client.user.tag} build: ${build_version}!`);
    logger.log('info', `${Guilds} >>> LOGGED`);

});

client.on('disconnect', () => { logger.log('info', `${client.user.tag} is going offline`)});
client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => logger.log('info', `App listening on >>> ${PORT}`));

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', async message => {
        var prefix = globalPrefix;

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        args = message.content.slice(prefix.length).trim().split(/\s+/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.args && !args.length) {
            let reply = `${message.author}, wybrane polecenie wymaga podania argumentów!`;

            if (command.usage) {
                reply += `\nPoprawne użycie komendy: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has('514552587605901322') || message.member.roles.cache.has('790040884019855370')) {
                const timeLeft = 0;
            } else {
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`hej zwolnij! Polecenie **${command.name}** będzie gotowe do użycia za **${timeLeft.toFixed(1)}** sekund.`);
                }
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.execute(message, args, con);
        } catch (error) {
            console.error(error);
            message.reply(`${message.author}, wystąpił błąd podczas próby uruchomienia komendy (przekaż błąd dla twórcy)!`);
        }
});

client.on('guildMemberAdd', member => {

    let newRoles = ['529765153609351191', '753605339731066981'];
    let avatar = member.user.avatarURL();
    let emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'bearLOVE');

    member.roles.add(newRoles);

    const newUserEmbed = new Discord.MessageEmbed()
        .setColor('0xE67E22')
        .setAuthor(`Nowy niedźwiadek w rodzince!`, `${avatar}`)
        .setDescription(`**${ user }** dołączył/a do naszej rodzinki, przywitajcie gorąco nowego niedźwiadka oraz oprowadźcie po serwerze ${emoji}!`)
        .setThumbnail(`https://cdn.discordapp.com/emojis/615717155006054453.png`)
        .setTimestamp();

    member.client.channels.fetch('787812026809450547').then(c => {
        c.send(newUserEmbed);
    })
});

client.on('guildMemberUpdate', (oldMember, newMember) => {

    const hadRole = oldMember.roles.cache.has('807230340543414312');
    const hasRole = newMember.roles.cache.has('807230340543414312');
    let user = newMember.user.username;
    let avatar = newMember.user.avatarURL();
    let emoji = newMember.guild.emojis.cache.find(emoji => emoji.name === 'bearGASM');

    const boosterEmbed = new Discord.MessageEmbed()
        .setColor('0x61A9E1')
        .setAuthor(`Nowe ulepszenie serwera!`, `${avatar}`)
        .setDescription(`**${user}** właśnie ulepszył/a serwer dla wszystkich niedźwiadków, podziękujcie na czacie tak jak tylko potraficie! ${emoji}!`)
        .setThumbnail(`https://i.imgur.com/bgt1hDD.png`)
        .setTimestamp();

    if (!hadRole && hasRole) {
        newMember.client.channels.fetch('787812026809450547').then(c => {
            c.send(boosterEmbed);
        })
    }

    const norbix = client.users.cache.find(user => user.id === `308766750529552386`);
    const newMemberID = newMember.user.id;
    if (newMemberID == norbix) {
        let firstHadRole = oldMember.roles.cache.has('787813088367345695');
        let firstHasRole = newMember.roles.cache.has('787813088367345695');
        let secondHadRole = oldMember.roles.cache.has('787813102883438633');
        let secondHasRole = newMember.roles.cache.has('787813102883438633');

        if (!firstHadRole && firstHasRole) {
            try {
                newMember.roles.remove('787813088367345695', 'auto-usuwanie przez dziadka');
            } catch (e) { console.log(e); }
        } else if (!secondHadRole && secondHasRole) {
            try {
                newMember.roles.remove('787813102883438633', 'auto-usuwanie przez dziadka');
            } catch (e) { console.log(e); }
        } else return;
    }
});


client.on('voiceStateUpdate', (oldState, newState) => {

    var userID = newState.id;

    if (newState.member.user.bot || newState.member.user.bot) return;

    if (newState.channelID !== oldState.channelID && newState.channelID !== null) {
        let newUserChannelID = newState.member.voice.channel.id;
        var color = '#00FF00';
        var text = 'joined voice channel'
        var thumbnail = 'https://i.imgur.com/km6Mt41.png';
        var emoji = ':inbox_tray:';
        var channel = newState.client.channels.cache.get(newUserChannelID).name;
        var author = newState.member.user.tag;
        var avatar = newState.member.user.avatarURL();
        var description = `${emoji} <@${userID}> **${text}** \`\`${channel}\`\`.`;

        generateEmbed(color, author, avatar, description, thumbnail);
    }
    else if (newState.channelID === oldState.channelID) {

        if (newState.serverDeaf === true && newState.serverDeaf !== oldState.serverDeaf) {
            var color = '#2C81C7';
            var text = 'has been deafed by {admin}';
            var thumbnail = 'https://i.imgur.com/ZGimzdV.png';
            var emoji = ':mute:';
            var author = newState.member.user.tag;
            var avatar = newState.member.user.avatarURL();
            var description = `${emoji} <@${userID}> **${text}** .`;

            generateEmbed(color, author, avatar, description, thumbnail);
        } else if (newState.serverDeaf === false && newState.serverDeaf !== oldState.serverDeaf) {
            var color = '#2CC791';
            var text = 'has been undeafed by {admin}';
            var thumbnail = 'https://i.imgur.com/83kNMK1.png';
            var emoji = ':speaker:';
            var author = newState.member.user.tag;
            var avatar = newState.member.user.avatarURL();
            var description = `${emoji} <@${userID}> **${text}** .`;

            generateEmbed(color, author, avatar, description, thumbnail);
        }

        if (newState.serverMute === true && newState.serverMute !== oldState.serverMute) {
            var color = '2C81C7';
            var text = 'has been muted by {admin}';
            var thumbnail = 'https://i.imgur.com/SqfjqEO.png';
            var emoji = newState.guild.emojis.cache.find(emoji => emoji.name === 'mute')
            var author = newState.member.user.tag;
            var avatar = newState.member.user.avatarURL();
            var description = `${emoji} <@${userID}> **${text}** .`;

            generateEmbed(color, author, avatar, description, thumbnail);
        } else if (newState.serverMute === false && newState.serverMute !== oldState.serverMute){
            var color = '#2CC791';
            var text = 'has been unmuted by {admin}';
            var thumbnail = 'https://i.imgur.com/ykffhwa.png';
            var emoji = ':microphone2:';
            var author = newState.member.user.tag;
            var avatar = newState.member.user.avatarURL();
            var description = `${emoji} <@${userID}> **${text}** .`;

            generateEmbed(color, author, avatar, description, thumbnail);
        }

    }
    else if (newState.channelID === null) {
        var color = '#FF0000';
        var text = 'left voice channel'
        var thumbnail = 'https://i.imgur.com/rfFF0d5.png';
        var emoji = ':outbox_tray:';
        var author = newState.member.user.tag;
        var avatar = newState.member.user.avatarURL();

        var description = `${emoji} <@${userID}> **${text}**.`;

        generateEmbed(color, author, avatar, description, thumbnail);
    }

    function generateEmbed(color, author, avatar, description, thumbnail) {
        const newUserEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(author, avatar)
            .setDescription(description)
            .setThumbnail(thumbnail)
            .setTimestamp();

        newState.client.channels.fetch('783784893318168657').then(c => {
            c.send(newUserEmbed);
        })
    }

});

const levelModule = require("./modules/levelModule.js");
levelModule.execute(client, con, logger);

client.login(token);