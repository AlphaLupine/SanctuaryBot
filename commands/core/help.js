const { MessageEmbed } = require("discord.js")
const { purple } = require("../../colours.json");
const { prefix } = require("../../config.json");
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs")


module.exports = {
    config: {
        name: "help",
        description: "Sends help regarding commands!",
        usage: "help",
        category: "core",
        accessableby: "Everyone!",
        aliases: [],
        noalias: "No Aliases"
    },
    run: async (client, message ,args) => {

        const helpEmbed = new MessageEmbed()
            .setColor(purple)
            .setAuthor(`${message.guild.me.displayName}'s Command Centre!`, message.guild.iconURL)
            .setThumbnail(client.user.avatarURL)

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            helpEmbed.setDescription(`Here are my commands!\n My prefix is \`\`${prefix}\`\``) // TODO - Sync with DB
            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    helpEmbed.addFields({name: `${capitalise} \`\`${dir.size}\`\``, value: dir.map(c => `\`\`${c.config.name}\`\``).join(" | ")})
                } catch(err) {
                    console.log(err)
                }
            })
            helpEmbed.addFields({name: "Total Number Of Commands:", value: `${client.commands.size}`, inline: false})
            return message.channel.send(helpEmbed)
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(helpEmbed.setTitle("I Could Not Find That Command"))
            command = command.config

            helpEmbed.setDescription(stripIndents`
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description Availible!"}
            **Usage:** ${prefix}${command.usage ? `\`${command.name} ${command.usage}\`` : "No Usage Availible!"}
            **Accessable By:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "No Aliases!"}`)

            return message.channel.send(helpEmbed)
        }
        

    }
}