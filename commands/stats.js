module.exports = {
	name: 'stats',
	description: 'Statistic module',
	args: true,
	cooldown: 60,
	aliases: ['statistic', ],
    execute(message, args, con) {

		if (args[0] === 'reload') {
			try{
				message.guild.members.fetch()
				.then(users => {
					let numberOfUsers = users.filter(member => !member.user.bot).size;
					let numberOfUsersOnline = users.filter(member => member.presence.status !== "offline" && !member.user.bot).size;

					message.client.channels.fetch('777509893887885312').then(c => {
						let channelName = c.name;
						c.edit({ name: `${channelName.split(/:/).slice(0, -1)}: ${numberOfUsers}` }).catch(console.error);
					})

					message.client.channels.fetch('777531935882870814').then(c => {
						let channelName = c.name;
						c.edit({ name: `${channelName.split(/:/).slice(0, -1)}: ${numberOfUsersOnline}` }).catch(console.error);
					})

				})
				.catch(console.error);

				message.guild.fetchBans()
				.then(bans => {
					let numberOfBans = bans.size;

					message.client.channels.fetch('777528832168427621').then(c => {
						let channelName = c.name;
						c.edit({ name: `${channelName.split(/:/).slice(0, -1)}: ${numberOfBans}` }).catch(console.error);
					})
				})
				.catch(console.error);

				message.channel.send('Statistics was succesfully reloaded.');
			} catch (error) {
				console.log(error);
				message.channel.send('There was an error while reloading a statistics module.');
			}
		}
		else if (args[0] === 'setup'){
			console.log('setup');
		}
	}
}