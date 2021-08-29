module.exports = {
    name: 'raffle',
    description: 'A raffle command with reaction under message',
    args: true,
    aliases: ['loteria'],
    async execute(message, args, con) {

        if (message.member.permissions.has('ADMINISTRATOR')) {

            if (args.length > 0) {

                const msgId = args[0];
                const emojiName = `${args[1]}`;
                const fetchMsg = await message.channel.messages.fetch(msgId);
                let reactions = fetchMsg.reactions.cache.find(emoji => emoji.name == emojiName);
                fetchMsg.reactions.cache.map(async (reaction) => {
                    let usersThatReacted = [];
                    if (reaction.emoji.name !== emojiName) return;
                    let reactedUsers = await reaction.users.fetch();
                    reactedUsers.map((user) => {
                        usersThatReacted.push(`**${user.username}#${user.discriminator}**`);
                    });
                    let users = usersThatReacted.join('-').trim();
                    let randomuser = Math.floor(Math.random() * usersThatReacted.length);
                    message.channel.send(`Giveaway wygrywa:\n${usersThatReacted[randomuser]}`);
                });

            } else {
                //brak argumentow
            }

        } else {
            message.channel.send(`${message.author}, nie posiadasz permisji, aby użyć tej komendy!`);
            return;
        }

    }

}