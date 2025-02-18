import { Schema } from "mongoose";

export const socialLinksSchema = Schema({
    instagram: {
        type: String
    },
    linkedin: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
}, { timestamps: true })
