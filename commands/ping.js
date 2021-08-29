module.exports = {
    name: "ping",
    description: "Latency test.",
    execute(message, args, con) {
        message.channel.send("Pinging...").then(m => {
            try {
                var pingTMP = m.createdTimestamp - message.createdTimestamp;
                var ping = Math.round(pingTMP / 2);
                m.edit(`Pong! ~ ${ping}ms`);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}