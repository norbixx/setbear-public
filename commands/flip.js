module.exports = {
    name: 'flip',
    description: 'Flip a coin.',
    aliases: ['coin'],
    execute(message, args, con) {

        switch (Math.round(Math.random())){
            case 0:
                message.channel.send(`${message.guild.emojis.cache.find(emoji => emoji.name === 'bearCoin')} misiek`);
                break;
            case 1:
                message.channel.send(`${message.guild.emojis.cache.find(emoji => emoji.name === '14')} reszka`);
                break;
        }

    }
}
