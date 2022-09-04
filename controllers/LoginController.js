
import dotenv from 'dotenv';
import User from "../models/User.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const Login = async (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if(user === null ){
            return res.status(404).json({message : "User not found"})
        }else{
            // return res.json(user.salt)
            if(user.validPassword(req.body.password)){
                const username = { username : req.body.username};
                const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
    
                res.status(201).json({accessToken: accessToken, message: "User Loged in"});
            }else{
                return res.status(400).json({message : "Password wrong"});
            }
        }
    })
}

export const AuthenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message : 'Unauthorized Token'}); 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user

        next()
    })
}