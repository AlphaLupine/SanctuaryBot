const { prefix } = require("../../config.json")
const mongoose =  require("mongoose")
const { dbLogin } = require("../../config.json")


module.exports = async client => {

    await mongoose.connect(dbLogin, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to the Mongodb database. \n------------------------------------------------");
    }).catch((err) => {
        console.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });

    console.log(`${client.user.tag} is now online!`)
    let activities = [ 'Coming Soon!', `Coming Soon!`, `Coming Soon!`], i = 0;
    setInterval(() => client.user.setActivity(`${prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING"}), 25000) //TODO Sync with DB
}