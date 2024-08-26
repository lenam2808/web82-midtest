import mongoose from "mongoose";
import { COLLECTION } from "../utils/collections.js";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    }, 
    email: {
        type:String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const UserModel = new mongoose.model(COLLECTION.USERS, userSchema)

export default UserModel

export const findUserDB = (data) => {
    return UserModel.findOne(data)
}

export const createUser = (data) => {
    return UserModel.create(data)
}