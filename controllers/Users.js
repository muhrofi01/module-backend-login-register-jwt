import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUsers = async(req, res) => {
    try{
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const register = async(req, res) => {
    const {name, email, password, confPassword} = req.body;
    if (password !== confPassword) return res.status(400).json({
        message: "Password dan Confirm Password tidak cocok"
    })
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({message:"Registrasi berhasil"})
    } catch (error) {
        console.log(error);
    }
}