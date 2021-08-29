module.exports = {
    name: 'reload',
    description: 'Reload for typed command.',
    args: true,
    aliases: ['r'],
    cooldown: 0.0,
    execute(message, args, con) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`${message.author}, nie ma komendy o podanej nazwie lub aliasie **${commandName}**!`);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Komenda **${command.name}** została odświeżona!`);

        } catch (error) {
            console.error(error);
            message.channel.send(`Wystąpił błąd podczas odświeżania komendy **${command.name}**: \n${error.message}`);
        }
    }
}