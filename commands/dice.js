module.exports = {
    name: 'dice',
    description: 'Roll a dice.',
    aliases: ['kostka'],
    execute(message, args, con) {

        const color = '#000000';
        const author = message.member.user.id;
        const title = 'Rzucam kością...';
        const dice = 'https://i.imgur.com/RcfKvgB.png';
        var description = 'null';


        if (args.length > 0) {
            if (!isNaN(args[0])) {
                let min = 0;
                let max = args[0];

                var random = Math.floor(Math.random() * (max - min + 1)) + min;

                description = `<@${author}> Kośc wypadła na **${random}**!`;
                generateEmbed(color, title, description, dice);
            }
            else {
                description = `<@${author}> podany argument **nie jest liczbą**!`;
                generateEmbed(color, title, description, dice);
            }
        }
        else{
            let min = 1;
            let max = 6;

            var random = Math.floor(Math.random() * (max - min + 1)) + min;

            description = `<@${author}> Kość wypadła na **${random}**!`;
            generateEmbed(color, title, description, dice);
        }

        function generateEmbed(color, title, description, dice) {

            const Discord = require("discord.js");

            const newUserEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(title, dice)
                .setDescription(description)

            message.channel.send(newUserEmbed);
        }
    }
}