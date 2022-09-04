import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import user from "./routes/user.js";
import login from "./routes/login.js";
import service from "./routes/service.js";
import dotenv from "dotenv";
import { AuthenticateToken } from "./controllers/LoginController.js";

dotenv.config();


const app = express();

const port = process.env.HTTP_PORT;

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("DATABASE CONNECTED"));

app.use(cors());
app.use(express.json());
app.all('/api/*', AuthenticateToken)
app.use('/api/v1/user', user);
app.use('/api/v1/login', login);
app.use('/api/v1/service', service);

app.listen(port, ()=>{
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
})