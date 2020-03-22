
module.exports = {
    config: {
        name: "purge",
        description: "Clears a specified amount of messages!",
        usage: "purge <amount> [user] - <tag> = required | [tag] = optional | You may only delete up to 100 messages per usage",
        category: "moderation",
        accessableby: "Staff",
        aliases: [],
        noalias: "No Aliases"
    },
    run: async (client, message ,args) => {
        let permissions = ["MANAGE_MESSAGES"];
        if(!message.member.hasPermission(permissions)) return message.reply(` you do not have permission to use this command!`).then(m => m.delete({timeout: 10000}));
        if(!args[0] || isNaN(args[0]) || args[0] > 100) return message.reply(` Incorrect command usage! Use \`\`help purge\`\` for more information!`).then(m => m.delete({timeout: 10000}));
        async function purge() {
            if(!args[1]) {
                await message.channel.messages.fetch({limit: args[0]})
                .then(fetched => {
                    const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);
                    message.channel.bulkDelete(notPinned);
                });
            }
            else {
                let target = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(u => u.user.username.toLowerCase().includes(args[1].toLowerCase()) || u.displayName.toLowerCase().includes(args[1].toLowerCase()) || u.user.tag.toLowerCase().includes(args[1].toLowerCase()));
                if(!target) return message.reply(` Could not find user \`\`${args[1]}\`\``).then(m => m.delete({timeout: 10000}));
                await message.channel.messages.fetch({limit: 100})
                .then(messages => {
                    messages = messages.filter(m => m.author.id === target.id).array().slice(0, args[0])
                    message.channel.bulkDelete(messages, {limit: args[0]})
                });
            }
        }
        message.delete();
        await purge();
        message.channel.send(`Successfully purged ${args[0]} messages!`).then(m => m.delete({timeout: 10000}));
    }
}