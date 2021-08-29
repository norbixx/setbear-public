module.exports = {
    name: 'try',
    description: 'Try command.',
    aliases: ['choose'],
    execute(message, args, con) {

        const color = '#F2D82C';
        const author = message.member.user.id;
        const avatar = message.member.user.avatarURL();
        const title = 'SetBear - maszyna losująca';
        const dice = 'https://i.imgur.com/RcfKvgB.png';
        const text = 'Wybieram';
        var description = 'null';

        if (message.content.includes('choose'))
            args = message.content.slice(8).trim().split(/[|.]+/);
        else
            args = message.content.slice(5).trim().split(/[|.]+/);

        function checkArgs(args) {
            if (args.length > 1) {
                return 2;
            } else {
                var random = Math.round(Math.random());
                return random;
            }
        }

        switch (checkArgs(args)) {
            case 0:
                description = `<@${author}> ${text} **TAK**!`;
                generateEmbed(color, avatar, title, description, dice);
                break;
            case 1:
                description = `<@${author}> ${text} **NIE**!`;
                generateEmbed(color, avatar, title, description, dice);
                break;
            case 2:
                var random = Math.floor(Math.random() * ((args.length - 1) - 0 + 1)) + 0;
                description = `<@${author}> ${text} **${args[random]}**!`;
                generateEmbed(color, avatar, title, description, dice);
                break;
        }

        function generateEmbed(color,  avatar, title, description, dice) {

            const Discord = require("discord.js");
            
            const newUserEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(title, dice)
                .setDescription(description)

            message.channel.send(newUserEmbed);
        }
    }
}