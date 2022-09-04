import express from "express";
import {Login} from "../controllers/LoginController.js";

const login = express.Router();

login.post('/', Login);

export default login;