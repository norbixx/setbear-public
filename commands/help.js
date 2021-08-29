const { prefix } = require('../config/config.js');

module.exports = {
    name: 'help',
    description: 'List of all commands with description',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 3,
    execute(message, args, con) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Lista wszystkich komend:');
            data.push(commands.map(command => command.name).join(', '));

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('wysłałem listę wszystkich komend do Ciebie poprzez prywatną wiadomość.');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('wygląda na to, że nie mogę wysłać do Ciebie wiadomości! Może masz zablokowane przyjmowanie prywatnych wiadomości?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('to nie jest poprawna komenda!');
        }

        data.push(`**Nazwa:** ${command.name}`);

        if (command.aliases) data.push(`**Aliasy:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Opis:** ${command.description}`);
        if (command.usage) data.push(`**Użycie:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} sekund`);

        message.channel.send(data, { split: true });
    }
}