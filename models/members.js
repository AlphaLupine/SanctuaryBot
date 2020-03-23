const mongoose = require("mongoose");

const membersSchema = mongoose.Schema({
    userID: { type: String },
    rank: { type: String },
    currentXP: { type: Number },
    promotionXP: { type: Number },
    balance: { type: Number },
    messageXpGainLast: { type: String },
    memberJoinDate: { type: String },
})
module.exports = mongoose.model("Members", membersSchema);