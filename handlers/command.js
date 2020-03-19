const { readdirSync } = require("fs")


module.exports = (client) => {
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'))
        console.log("-------------------------------")
        console.log(`Loading Directory: "${dirs}"`)
        console.log("-------------------------------")
        for (let file of commands) {
            console.log(`${file} loaded`)
            const pull = require(`../commands/${dirs}/${file}`)
            client.commands.set(pull.config.name, pull)
            if(pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name))

        }
    }  
    ["core"].forEach(x => load(x))
}