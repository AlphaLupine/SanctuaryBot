
module.exports = async client => {
    
    let activities = [ 'Coming Soon!', `Coming Soon!`, `Coming Soon!`], i = 0;
    setInterval(() => client.user.setActivity(`*help | ${activities[i++ % activities.length]}`, { type: "WATCHING"}), 25000)
}