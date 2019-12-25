const { RichEmbed } = require('discord.js');
module.exports = {
    config: {
        name: 'queue',
        aliases: ["q"],
        category: "music",
        description: 'Queue command.',
        usage: "shows queued songs",
        accessableby: "everyone"
    },
    run: async(bot, message, args, ops) => {
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('❌ **Nothing playing in this server**');
        const embed = new RichEmbed()
            .setColor("GREEN")
            .setThumbnail(message.guild.iconURL)
            .setTimestamp()
            .setTitle("__**Song QUEUE**__\n")
            .setDescription(`${serverQueue.songs.map(song => `**${song.title}**\n`).join('\n')}\n\n🔻**__Now Playing__:**🔻\n ${serverQueue.songs[0].title}\n\n **Requested By:** ${message.author.username}`);
        return message.channel.send(embed)
    }
};