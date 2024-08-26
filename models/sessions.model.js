import mongoose from "mongoose";
import { COLLECTION } from "../utils/collections.js";

const sessionScheme = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId
    },
    email: {
        type: String
    },
    key: {
        type: String
    }
})

const SessionModel = new mongoose.model(COLLECTION.SESSIONS, sessionScheme)


export const createTokenDB = (data) => {
    return SessionModel.create(data)
}

export const getApiKey = (data) => {
    return SessionModel.findById(data)
}

export const findEmail = (data) => {
    return SessionModel.findOne(data)
}

export default SessionModel
