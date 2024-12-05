import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400,
        //It wil automatically delete the token after 24 hours.
    }
})

export default mongoose.model("BlacklistToken", blacklistTokenSchema);

//A file can have only one export default.
//When importing, we can use any name to refer to the export. Here we are specifying the name we want to give to the export.

//export const is used to export multiple variables, functions, classes from a file. We import them using the same name as they ar exported.
//One file can have multiple export const variables. 