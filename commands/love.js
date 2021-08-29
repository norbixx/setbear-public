module.exports = {
    name: 'love',
    description: 'Checking love to mentioned person or to anything what you want.',
    cooldown: 4.0,
    args: true,
    execute(message, args, con) {

        const min = 0;
        const max = 100;
        const heartArray = [
            'heart',
            'orange_heart',
            'yellow_heart',
            'green_heart',
            'blue_heart',
            'purple_heart',
            'brown_heart'
        ];
        var random = Math.floor(Math.random() * (max - min)) + min;
        var randomHeart = Math.floor(Math.random() * (heartArray.length - min)) + min;
        args = message.content.slice(6);

        const color = '0xBE1931';
        const title = 'SetBear - licznik miłości';
        const icon = 'https://i.imgur.com/6X9GxeM.png';
        const description = `${message.author} loffcia ${args} w ${random}% :${heartArray[randomHeart]}:!`;

        generateEmbed(color, title, description, icon);

        function generateEmbed(color, title, description, icon) {

            const Discord = require("discord.js");

            const loveEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(title, icon)
                .setDescription(description)

            message.channel.send(loveEmbed);
        }
    }
}