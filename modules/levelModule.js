module.exports = {
    name: "level-module",
    description: "Level module with experience.",
    execute(client, con, logger) {

        logger.log('info', "Level module activated");

        client.on('ready', () => {
            const Guilds = client.guilds.cache.map(g => g.id).join().split(',');

            for (var i = 0; i < Guilds.length; i++) {
                console.log(Guilds[i]);
            }











            /*const Discord = require('discord.js');
                const client = new Discord.Client();
                const list = client.guilds.cache.get("myServerID");
                list.members.cache.forEach(member => console.log(member.user.username));
                client.login('myTokenID');
             * 
             * 
             */
        });

        

        


    }
}