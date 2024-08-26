import UserModel, { createUser, findUserDB } from "../models/users.model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { createTokenDB } from "../models/sessions.model.js";

export const register = async (req, res) => {
  const { userName, password, email } = req.body;
  try {
    const user = await findUserDB({ email });
    console.log(user);
    if (user) throw new Error("User name is existed");
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    const newUser = {
      userName,
      password: hash,
      email,
    };
    console.log(newUser);
    const createNewUser = await createUser(newUser);
    res.status(200).send({
      message: "Register successful",
      user: createNewUser,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkEmail = await findUserDB({ email });
    if (!checkEmail) throw new Error("Email is not existed");
    const checkPassword = bcrypt.compareSync(password, checkEmail.password);
    if (!checkPassword) throw new Error("Email or password is incorrect");
    const ramdonString = uuidv4();
    const key = ramdonString;
    console.log(checkEmail._id.toString())
    const apikey = `mern-${checkEmail._id.toString()}-${email}-${key}`
    console.log(apikey)
    const newSession = {
        userId: checkEmail._id.toString(),
        email,
        key: key
    }
    const createToken = await createTokenDB(newSession)
    res.status(200).send({
      message: "Login successful",
      token: key
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
