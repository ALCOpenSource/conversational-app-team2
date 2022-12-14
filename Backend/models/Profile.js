const { Schema, model } = require("mongoose")


const ProfileSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    avatar: {
        type: String,
        required: false
    },
    social: {
        facebook: {
            type: String,
            required: false
        },
        twitter: {
            type: String,
            required: false
        },
        linkedIn: {
            type: String,
            required: false
        },
        github: {
            type: String,
            required: false
        },
    },
},
    { timestamps: true }
)

const Profile = model("profiles", ProfileSchema)

module.exports = Profile;