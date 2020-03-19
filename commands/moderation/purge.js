const { MessageEmbed } = require("discord.js")
const { purple } = require("../../colours.json");
const { prefix } = require("../../config.json");

module.exports = {
    config: {
        name: "purge",
        description: "Clears a specified amount of messages!",
        usage: "purge <amount> [user]",
        category: "moderation",
        accessableby: "Staff",
        aliases: [],
        noalias: "No Aliases"
    },
    run: async (client, message ,args) => {
        let permissions = [] // TO FINISHED


    }
}