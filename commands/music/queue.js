const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'queue',
        aliases: ["q"],
        category: "music",
        description: 'shows queued songs',
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to see queue!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");
        };
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('❌ **Nothing playing in this server**');
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .setTitle("__**Song QUEUE**__\n")
            .setDescription(`${serverQueue.songs.map(song => `**${song.title}**\n`).join('\n')}\n\n🔻**__Now Playing__**🔻\n ${serverQueue.songs[0].title}\n\n **Requested By:** ${message.author.username}`);
        return message.channel.send(embed)
    }
};