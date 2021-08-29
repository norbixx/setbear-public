module.exports = {
    name: 'fix',
    description: 'Command for fix any trouble with server f.e. voice.',
    aliases: ['napraw'],
    cooldown: 60.0,
    args: true,
    execute(message, args, con) {

        const permissionLevel = 'ADMINISTRATOR';
        const permissionGroup = ['790040884019855370', '514552587605901322']; 

        if (message.member.permissions.has(permissionLevel) || message.member.roles.cache.has(permissionGroup[0]) || message.member.roles.cache.has(permissionGroup[1])) {
            if (args[0] === 'voice') {
                try {
                    message.guild.setRegion('russia', 'Updating guild region to fix voice channels.').then(updated => {
                        setTimeout(function () {
                            console.log(`[INFO] - Updated guild region to ${updated.region.toUpperCase()} by ${message.author.username}`);
                        }, 1000);
                        setTimeout(function () {
                            message.guild.setRegion('europe', 'Fix complete.').then(updated => {
                                console.log(`[INFO] - Updated guild region to ${updated.region.toUpperCase()} by ${message.author.username}`);
                                message.channel.send(`${message.author}, naprawiłem kanały voice przełączając serwery RUSSIA -> ${updated.region.toUpperCase()} (najlepsza trasa).`);
                            });
                        }, 4000);
                    });
                } catch (e) {
                    console.log(e);
                }
            } else if (args[0] === '...') {

            } else return;
        } else {
            message.channel.send(`${message.author}, nie posiadasz permisji, aby użyć tej komendy!`);
        }
    }
}