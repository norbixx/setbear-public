module.exports = {
    name: 'hack',
    description: 'Hack somebody!',
    aliases: ['cheat'],
    cooldown: 60.0,
    execute(message, args, con) {

        const user = getUserFromMention(args[0]);

        if (args[0].startsWith('<@') && args[0].endsWith('>')) {
            args[0] = args[0].slice(2, -1);

            if (args[0].startsWith('!')) {
                args[0] = args[0].slice(1);
            }
        }

        const tag = message.client.users.cache.find(user => user.id === `${args[0]}`).discriminator;
        
        const loginArray = [
            '69@gmail.com',
            'wielki@gmail.com',
            '21cm@gmail.com',
            'kucyk@gmail.com',
            'sweet@gmail.com',
            'sadness@gmail.com',
            'dzidzia@gmail.com',
            'fannorbixa@gmail.com',
            'placki@gmail.com'
        ];

        const passwordArray = [
            'jestemsexy1',
            'kotlecik1',
            'bezsensu1',
            'alfabetzA1',
            'kochacpieski1',
            'fannorbixa1',
            'paluszki1',
            'pandy69',
            'misie69',
            'serduszko21',
            'discord1',
            'hackermen1',
            'thebestof3',
            'szopeknamisiu1',
            'lovu1',
            'pieniazek69'
        ];

        const dmArray = [
            'Bedziesz ze mną chodzić?',
            'Ale ona ma d0pe',
            'Hello Daddy',
            'Send nudes, ok?',
            'jeje ajem de amerikano!',
            'Du ju spik polish?',
            'Kocham moją mame',
            'Wyslać Ci najnowsze filmy erotyczne?',
            'Obejrzysz ze mną My Little pony?',
            'Jestem twoim ffanem',
            'pozdrowisz mnje?!!',
            'Sciągaj spodnie',
            'Pytong?',
            'Tato, co to znaczy fiflok?',
            'adoptowałam szopka',
            'mam misia własnego',
            'ale wczoraj bylo rzygane',
            'XDDDD',
            'Będzie pite'
        ];

        const ipArray = [
            '127.0.0.1:691',
            '127.0.0.1:121',
            '127.0.0.1:623',
            '127.0.0.1:732',
            '127.0.0.1:742',
            '127.0.0.1:834',
            '127.0.0.1:145',
            '127.0.0.1:161',
            '127.0.0.1:731',
            '127.0.0.1:832',
            '127.0.0.1:530',
            '127.0.0.1:952',
            '127.0.0.1:783'
        ];

        const folderArray = [
            'Fap',
            'PrzepisyUrodzinowe',
            'StaraOrazStary',
            'NotFap',
            'cenzura',
            'bajki',
            'podrywy',
            'nie otwierać',
            'nic tu nie ma',
            'Cracki',
            'Kasa',
            'ERROR',
            'LEGO',
            'wiersze',
            'piosenki',
            'MojFalsz',
            'NagieZdjecia',
            'IPdiscord'
        ];

        const filesArray = [
            'zdjęciami **Norbixa**',
            'zdjęciami **VVici**',
            'zdjęciami **Psow**',
            'zdjęciami **Kotow**',
            'zdjęciami **Kucykow**',
            'piosenkami o ** Norbix **',
            'piosenkami o ** VVicia **',
            'nagimi zdjęciami ** Niedzwiadkow **'
        ];

        const gameArray = [
            'My Little Pony +18',
            'My Little Kurczak',
            'Crush Saga',
            'HTML p0rn',
            'hack&back',
            'Grand Theft Girl',
            'Kucyk z wielkiej doliny',
            'Happy Kid',
            'Love with me'
        ];

        const statusArray = [
            'Subsrybujcie Norbixa',
            'Followujcie Norbixa',
            'Jak złapac misia?',
            'Jak złapac szopa?',
            'Kiedy Strim?',
            '**BANNED**',
            'Czy ty jesteś....?',
            'Czemu ona jedzie na tej zmywarce?'
        ];

        message.channel.send(`Hackowanie ${user}...`).then(m => {
            setTimeout(function () {
                m.edit(`* ▙Szukanie loginu Discord...*`);
            }, 1000);
            setTimeout(function () {
                m.edit(` *▜Dane: **Login:** ${user}${randomizer(loginArray)} **Hasło**: ${randomizer(passwordArray)}*`);
            }, 4000);
            setTimeout(function () {
                m.edit(` *▟Przeszukiwanie PW do znajomych...*`);
            }, 5000);
            setTimeout(function () {
                m.edit(` ▛**Ostatina PW:** ${randomizer(dmArray)}`);
            }, 8000);
            setTimeout(function () {
                m.edit(` *▙Szukanie adresu **IP**...*`);
            }, 9000);
            setTimeout(function () {
                m.edit(` *▜Dane: **${randomizer(ipArray)}***`);
            }, 12000);
            setTimeout(function () {
                m.edit(` *▟Przesyłanie szkodliwego oprogramowania do **#${tag}***`);
            }, 15000);
            setTimeout(function () {
                m.edit(` *▛Przesyłanie zakończone, przeszukiwanie plików...*`);
            }, 16000);
            setTimeout(function () {
                m.edit(` *▜Uzyskano dostęp. **Folder**: ${randomizer(folderArray)}*`);
            }, 19000);
            setTimeout(function () {
                m.edit(` *▙Podmienianie plików...*`);
            }, 20000);
            setTimeout(function () {
                m.edit(` *▟Zastąpiono pliki ${randomizer(filesArray)}*`);
            }, 23000);
            setTimeout(function () {
                m.edit(` *▛Uzyskiwanie dostępu do Steam....*`);
            }, 24000);
            setTimeout(function () {
                m.edit(` *▜Dostęp uzyskany. Przeszukiwanie ukrytych gier...*`);
            }, 25000);
            setTimeout(function () {
                m.edit(` *▙**Znaleziono gre**: ${randomizer(gameArray)}*`);
            }, 28000);
            setTimeout(function () {
                m.edit(` *▛Udostępnianie statusu Steam...*`);
            }, 29000);
            setTimeout(function () {
                m.edit(` *▟ **STATUS**: ${randomizer(statusArray)}*`);
            }, 32000);
            setTimeout(function () {
                m.edit(` *▜Hakowanie zakończone...*`);
            }, 33000);
        });

        function randomizer(array) {
            const min = 0;
            const max = array.length;
            return array[Math.round(Math.random() * (max - min)) + min];
        }
        
        function getUserFromMention(mention) {
            if (!mention) return;

            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);

                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }

                return message.client.users.cache.find(user => user.id === `${mention}`).username;
            } else return mention;
        }
        
    }
}