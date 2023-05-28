/* import * as dotenv from 'dotenv'
import * as jwt from "jsonwebtoken";
import { User } from "../modules/user/entities/user";

dotenv.config(); //Permite importar variables del archivo .env 

const generateToken=(payload: User){
    return jwt.sign(payload, process.env.SECRET as string);
} */