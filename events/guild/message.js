const Members = require("../../models/members.js")
const { prefix } = require("../../config.json");

module.exports = async (client, message) => {
   
    if(message.author.bot || message.channel.type === "dm") return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()

	let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    if(commandfile){
        commandfile.run(client, message, args)
        console.log(`${message.author.username}#${message.author.discriminator} (${message.author}) used *${cmd} from guild: ${message.member.guild} | guild id: ${message.member.guild.id}`)
    }
    
    if(message.content.startsWith(prefix)) return // So that commands don't count towards xp gain
    //Level system
    let memberData = await Members.findOne({userID: message.author.id})
    console.log(memberData)
    if (!memberData) {
        const memberDoc = new Members({
            userID: message.author.id,
            rank: "Civillian",
            currentXP: "0",
            promotionXP: "450", //2xp per message (10 sec cooldown) | 5xp per 15 minutes spent in voice - Needs to be done in guildVoiceStatusUpdate event
            balance: "0",
            messageXpGainLast: "0",
            memberJoinDate: "0",
        })
        memberDoc.save();
        console.log(`New member data created for ${message.author.tag} in guild: ${message.guild.name}(${message.guild.id})`)
    }
    else {
        //TODO - Implement a 10 second cooldown
        let current = memberData.currentXP + 2;
        if(current >= memberData.promotionXP) {
            //Can only be completed once roles and requirements have been created (switch statement)
            memberData.save();
            message.channel.send(`Congratulations **${message.author.tag}!** You have now ranked up to **RANK!**`).then(m => {
                m.delete({timeout: 10000})
            })
        }
        else {
            memberData.currentXP = current
            memberData.save();
        }


    }

}