/*const config = require('../config.json');
const keyv = require('../db/keyv.js');

module.exports = {
    name: 'prefix',
    description: 'Prefix command.',
    async execute(message, args) {

        let db = keyv.getDb();

        if (message.member.permissions.has('ADMINISTRATOR')) {
            if (args.length) {
                await db.set('prefix', args[0]);
                return message.channel.send(`Succesfull set prefix to ${args[0]}.`);
            }

            return message.channel.send(`Your prefix is \`${await db.get('prefix') || config.globalPrefix}\``);

        } else {
            return message.channel.send(`${message.author} you don't have permission to change prefix!`);
        }
    }
}
*/