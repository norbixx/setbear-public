module.exports = {
    name: 'cookie',
    description: 'Random cookie.',
    aliases: ['wrozba'],
    cooldown: 60.0,
    execute(message, args, con) {

        const titleArray = [
            'Ciasteczko spadło Ci pod nogi, otwierasz je i widzisz',
            'Ukruszyłes ciasteczko, które mówi..',
            'Stary podaje Ci ciasteczko, które mówi..',
            'VVici wypadło ciasteczko, czytasz napis, który mówi..',
            'Siadasz na uczte z misiami, bierzesz ciasteczko i widzisz napis..',
            'Ukradłes ciasteczko VVici, ciastko przepowiada Ci, że..',
            'Ciasteczko ujawnia Tobie twoją najskrytszą prawdę..',
            'Ciasteczko się losuje',
            '3RR0R zglitchowane ciasteczko 3RR0R'
        ];
        const invalid = 'Nieprawidłowy argument, poprawne użycie: **get**/**add {args}**/**remove {args}**/**modify {args}**/**list**/**list {args}**';

        const min = 0;
        const max = titleArray.length;

        var cookieList = "";
        var random = Math.floor(Math.random() * (max - min)) + min;
        const color = '0xEFBD38';
        const title = titleArray[random];
        const icon = 'https://i.imgur.com/iy3O2Bu.png';

        if (args.length > 0) {

            if (message.member.hasPermission('ADMINISTRATOR')
                || message.member.roles.cache.has('514552587605901322')
                || message.member.roles.cache.has('790040884019855370')) {

                if (args[0] === 'add') {
                    args = message.content.slice(12).replace("'", "");
                    add(args);
                } else if (args[0] === 'modify') {
                    if (typeof args[1] !== 'undefined') {
                        var id = args[1];
                        var newText = message.content.slice(16 + id.length).replace("'", "");
                        mod(id, newText);
                    } else {
                        message.channel.send(invalid);
                    }
                } else if (args[0] === 'remove') {
                    if (typeof args[1] !== 'undefined') {
                        del(args[1]);
                    } else {
                        message.channel.send(invalid);
                    }
                } else if (args[0] === 'get') {
                    if (typeof args[1] !== 'undefined') {
                        try {
                            getID(args[1]);
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        message.channel.send(invalid);
                    }
                } else if (args[0] === 'list') {
                    var page = 1;
                    if (args[1])
                        page = args[1];
                    list(page);
                } else {
                    message.channel.send(invalid);
                }
            } else {
                message.channel.send(`${message.author}, nie masz odpowiednich permisji, aby użyć tej komendy!`);
            }

        } else {
            get();
        }


        function get() {
            con.query('SELECT * FROM cookies ORDER BY RAND() LIMIT 1;', function (error, results, fields) {
                if (error) throw error;
                var description = `[${results[0].id}] ${results[0].text}`;
                generateEmbed(color, title, description, icon);
            });
        }

        function add(text) {
            con.query(`INSERT INTO cookies (text) VALUES ('${text}')`, function (error, results, fields) {
                if (error) throw error;

                message.channel.send(`${message.author}, wrozba dodana, jej ID to: **${results.insertId}**!`);
            });
        }

        function mod(id, newText) {
            if (!isNaN(id)) {
                con.query('UPDATE cookies SET text = ? WHERE id = ?;SELECT * FROM cookies WHERE id = ?', [newText, id, id], function (error, results, fields) {
                    if (error) throw error;

                    if (results[1].length > 0)
                        message.channel.send(`${message.author}, wróżba o ID: **${id}** została zmodyfikowana o następujący tekst: **${newText}**.`);
                    else
                        message.channel.send(`${message.author}, wróżba o ID: **${id}** nie istnieje.`);
                });
            } else {
                message.channel.send(`${message.author}, podaj poprawne ID (liczba).`);
            }
        }

        function del(id) {
            con.query(`DELETE FROM cookies WHERE id = ${id}`, function (error, results, fields) {
                if (error) throw error;
                message.channel.send(`${message.author}, wróżba o ID: **${id}** została usunięta.`);
            });
        }

        function getID(id) {
            if (!isNaN(id)) {
                con.query(`SELECT * FROM cookies WHERE id = ${id};`, function (error, results, fields) {
                    if (results.length > 0) {
                        var text = `${message.author}, wróżba o ID: **${id}** brzmi następująco: **${results[0].text}**.`;
                    } else {
                        var text = `${message.author}, wróżba o ID: **${id}** nie istnieje.`;
                    }
                    message.channel.send(text);
                });
            } else {
                message.channel.send(`${message.author}, podaj poprawne ID (liczba).`);
            }
        }

        function list(page) {
            const limit = 25;
            con.query(`SELECT * FROM cookies LIMIT ${(page - 1) * limit}, ${limit}`, function (error, results, fields) {
                if (error) throw error;
                printCookies(results);
                message.channel.send(`${message.author}, \`\`\`${cookieList}\n[ STRONA ${page} ]\`\`\``);
            });
        }

        function printCookies(array) {
            for (var i = 0; i < array.length; i++)
                cookieList += `[${array[i].id}] ${array[i].text}\n`;
        }

        function generateEmbed(color, title, description, icon) {

            const Discord = require("discord.js");

            const cookieEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(title, icon)
                .setDescription(description)

            message.channel.send(cookieEmbed);
        }
    }
}