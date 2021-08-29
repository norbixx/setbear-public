//LATEST STABLE 0.0.5 ALPHA && NORBIX

const Discord = require('discord.js');
const { globalPrefix, token } = require('./config.json');
const cooldowns = new Discord.Collection();

const client = new Discord.Client();

const addons = require('./assets/addons.js');
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `./logs/log_${addons.getCurrentDate()}` }),
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

client.on('ready', () => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `@${client.user.username} at ${client.guilds.cache.size} servers.`,
            type: 'WATCHING'
        }
    });

    logger.log('info', `App is going online as ${client.user.tag}!`);
});

client.on('disconnect', () => { logger.log('info', `${client.user.tag} is going offline`)});
client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/cool', (req, res) => res.send(cool()))
    .listen(PORT, () => logger.log('info', `App listening on :${PORT}`));

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', async message => {

    if (message.channel.id === '791331845518262322' || message.channel.id === '651552453682266155' || message.member != null || message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has('514552587605901322')) {

        let args;
        var prefix = globalPrefix;

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        args = message.content.slice(prefix.length).trim().split(/\s+/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.args && !args.length) {
            let reply = ` You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
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

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(` please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply(' there was an error trying to execute that command!');
        }
    }
});

client.on('guildMemberAdd', member => {

    let newRoles = ['529765153609351191', '753605339731066981'];
    let user = member.user.username;
    let avatar = member.user.avatarURL();
    let emoji = member.guild.emojis.cache.find(emoji => emoji.name === 'bearLOVE');

    member.roles.add(newRoles);

    const newUserEmbed = new Discord.MessageEmbed()
        .setColor('0xE67E22')
        .setAuthor(`Nowy niedźwiadek w rodzince!`, `${avatar}`)
        .setDescription(`**${user}** dołączył/a do naszej rodzinki, przywitajcie gorąco nowego niedźwiadka oraz oprowadźcie po serwerze ${emoji}!`)
        .setThumbnail(`https://cdn.discordapp.com/emojis/615717155006054453.png`)
        .setTimestamp();

    member.client.channels.fetch('514550982122799114').then(c => {
        c.send(newUserEmbed);
    })
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
            var text = 'has been deafed by admin';
            var thumbnail = 'https://i.imgur.com/ZGimzdV.png';
            var emoji = ':mute:';
            var author = newState.member.user.tag;
            var avatar = newState.member.user.avatarURL();
            var description = `${emoji} <@${userID}> **${text}**.`;

            generateEmbed(color, author, avatar, description, thumbnail);
        } else if (newState.serverDeaf === false && newState.serverDeaf !== oldState.serverDeaf) {
            var color = '#2CC791';
            var text = 'has been undeafed by admin';
            var thumbnail = 'https://i.imgur.com/83kNMK1.png';
            var emoji = ':speaker:';
            var author = newState.member.user.tag;
            var avatar = newState.member.user.avatarURL();
            var description = `${emoji} <@${userID}> **${text}**.`;

            generateEmbed(color, author, avatar, description, thumbnail);
        }

        if (newState.serverMute === true && newState.serverMute !== oldState.serverMute) {
            var color = '2C81C7';
            var text = 'has been muted by admin';
            var thumbnail = 'https://i.imgur.com/SqfjqEO.png';
            var emoji = newState.guild.emojis.cache.find(emoji => emoji.name === 'mute')
            var author = newState.member.user.tag;
            var avatar = newState.member.user.avatarURL();
            var description = `${emoji} <@${userID}> **${text}**.`;

            generateEmbed(color, author, avatar, description, thumbnail);
        } else if (newState.serverMute === false && newState.serverMute !== oldState.serverMute) {
            var color = '#2CC791';
            var text = 'has been unmuted by admin';
            var thumbnail = 'https://i.imgur.com/ykffhwa.png';
            var emoji = ':microphone2:';
            var author = newState.member.user.tag;
            var avatar = newState.member.user.avatarURL();
            var description = `${emoji} <@${userID}> **${text}**.`;

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

        newState.client.channels.fetch('791630279440859156').then(c => {
            c.send(newUserEmbed);
        })
    }

});

client.login(token);