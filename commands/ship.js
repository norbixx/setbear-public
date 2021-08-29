module.exports = {
    name: 'ship',
    description: 'Checking the best combination with anything what you want.',
    cooldown: 5.0,
    args: true,
    execute(message, args, con) {

        const color = '0xBE1931';
        const title = 'Najlepsze połączenie to...';
        const description = '';
        const icon = 'https://i.imgur.com/5mNWuHW.png';

        if (args.length === 1) {
            var first = message.author.username.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
            var second = getUserFromMention(args[0]);

            var minFirst = Math.round(first.length * 0.3);
            var maxFirst = Math.round(first.length * 0.6);
            var minSecond = Math.round(second.length * 0.3);
            var maxSecond = Math.round(second.length * 0.6);

            var randomFirst = Math.round(Math.random() * (maxFirst - minFirst)) + minFirst;
            var randomSecond = Math.round(Math.random() * (maxSecond - minSecond)) + minSecond;

            const final = first.slice(0, randomFirst) + second.slice(randomSecond);

            let description = `${first} :revolving_hearts: ${second} = ${final}`;
            generateEmbed(color, title, description, icon);

        } else if (args.length > 1) {
            var first = getUserFromMention(args[0]);
            var second = getUserFromMention(args[1]);

            var minFirst = Math.round(first.length * 0.3);
            var maxFirst = Math.round(first.length * 0.6);
            var minSecond = Math.round(second.length * 0.3);
            var maxSecond = Math.round(second.length * 0.6);

            var randomFirst = Math.round(Math.random() * (maxFirst - minFirst)) + minFirst;
            var randomSecond = Math.round(Math.random() * (maxSecond - minSecond)) + minSecond;

            const final = first.slice(0, randomFirst) + second.slice(randomSecond);

            let description = `${first} :revolving_hearts: ${second} = ${final}`;
            generateEmbed(color, title, description, icon);
        } else {
            //no arguments
        }

        function generateEmbed(color, title, description, icon) {

            const Discord = require("discord.js");

            const shipEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(title, icon)
                .setDescription(description)

            message.channel.send(shipEmbed);
        }

        function getUserFromMention(mention) {
            if (!mention) return;

            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);

                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }

                return message.client.users.cache.find(user => user.id === `${mention}`).username;
            } else return mention;
        }
    }
}