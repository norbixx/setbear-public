const { build_version, build_date } = require('../config/config.js');

module.exports = {
    name: 'version',
    description: 'Return version of app.',
    aliases: ['ver', 'v'],
    execute(message, args, con) {
        message.channel.send(`SetBear aktualny build: **${build_version}**. Ostatnia zmiana: **${build_date}**`);
    }
}
