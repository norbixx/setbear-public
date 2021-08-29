module.exports = {
    name: 'clear',
    description: 'clear command',
    args: true,
    async execute(message, args, con) {

        const min = 2;
        const max = 100;

        function clear(args) {
            if (message.member.permissions.has('ADMINISTRATOR') || message.member.permissions.has('MANAGE_MESSAGES'))
                if (!isNaN(args[0])) {
                    if (args.length === 1) {
                        if (args[0] >= min && args[0] <= max) {
                            return 4;
                        } else {
                            return 3;
                        }
                    } else if (args.length > 1) {
                        if (args[0] >= min && args[0] <= max) {


                            //todo (sprawdzenie czy poszlo czy error, jak dziala to return 5, jak nie to return 2)
                            message.channel.messages.fetch(args[1]);

                        } else {
                            return 3;
                        }
                    }
                } else {
                    return 1
                }
            else {
                return 0;
            }
        }

        switch (clear(args)) {
            case 0:
                message.channel.send(`${message.author} nie posiadasz permisji, aby użyć tej komendy!`).then(sentMessage => {
                    sentMessage.delete({ timeout: 5000 })
                });
                break;
            case 1:
                message.channel.send(`:recycle: ${args[0]} **nie jest liczbą**, musisz podać liczbę z przedziału **2-100**!`).then(sentMessage => {
                    sentMessage.delete({ timeout: 10000 });
                });
                break;
            case 2:
                message.channel.send(`:recycle: Niepoprawne ID: **message ID**, sprawdź czy podałeś poprawne ID wiadomości!`).then(sentMessage => {
                    sentMessage.delete({ timeout: 10000 });
                });
                break;
            case 3:
                message.channel.send(`:recycle: Mogę usunąć tylko **od 2 do 100 wiadomości**!`).then(sentMessage => {
                    sentMessage.delete({ timeout: 10000 });
                });
                break;
            case 4:
                try {
                    await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                        message.channel.bulkDelete(messages);
                    });
                }
                catch (e) {
                    console.log(e);
                }
                message.channel.send(`:recycle: Usunąłem **${args[0]} wiadomości**!`).then(sentMessage => {
                    sentMessage.delete({ timeout: 5000 });
                });
                break;
            case 5:
                console.log('clear with exception');
                break;
        }

        /*
        function checkArgs(args) {
            if (message.member.permissions.has('ADMINISTRATOR') || message.member.roles.cache.has('514552587605901322')) {
                    if (args.length > 0) {
                        if (!isNaN(args)) {
                            if (args > 100 || args < 2)
                                return 2;
                            else
                                return 0;
                        } else {
                            return 1;
                        }
                    } else {
                        return 2;
                    }
            } else {
                return 4;
            }
        }

        switch (checkArgs(args)) {
            case 0:
                try {
                    await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                        message.channel.bulkDelete(messages);
                    });
                }
                catch (e) {
                    console.log(e);
                }
                message.channel.send(`:recycle: I have deleted \`\`${args[0]} messages\`\`!`).then(sentMessage => {
                    sentMessage.delete({ timeout: 5000 });
                });
                break;
            case 1:
                //message.channel.clone();
                //message.channel.delete();
                break;
            case 2:
                message.channel.send(`:recycle: I can delete only \`\`2-100 messages\`\`. If you want to clear all messages use \`\`!clear all\`\`(not working atm)!`).then(sentMessage => {
                    sentMessage.delete({ timeout: 10000 });
                });
                break;
            case 3:
                message.channel.send(`${message.author} you don't have permission to delete messages!`).then(sentMessage => {
                    sentMessage.delete({ timeout: 5000 })
                });
                break;
        }

        */
    }
}
