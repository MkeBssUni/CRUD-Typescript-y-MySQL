import * as dotenv from 'dotenv'
import * as jwt from "jsonwebtoken";
import { User } from "../modules/user/entities/user";
import { Response, Request, NextFunction } from 'express';

dotenv.config(); //Permite importar variables del archivo .env 

export const generateToken=(payload: User)=>{
    return jwt.sign(payload, process.env.SECRET as string);
} 

export const auth = async (req:Request, res: Response, next: NextFunction)=>{
    try {
        const token= req.headers.authorization?.replace('Bearer ','')
    } catch (error) {
        res.status(400).json({message: 'Unauthorized'});
    }
}