import { AuthUser } from "../entities/userAuth";
import { AuthRepository } from "../use-cases/ports/auth.repository";
import { AuthUserDto } from "../dto/auth-user";
import {pool} from '../../../utils/dbconfig'
import {validatePassword} from '../../../utils/functions'
import {generateToken} from '../../../config/jwt'
import { User } from "../../user/entities/user";

export class AuthStorageGateway implements AuthRepository{
    async login(payload: AuthUserDto): Promise<AuthUser>{
        try {
            const {username, password} = payload;
            const response = await pool.query('Select * from users where username=$1;',[username]);
            if(response.rows[0]){
                const user= response.rows[0] as AuthUser;
                if(await validatePassword(password, user.password)){
                    const usuario=await pool.query('Select * from users where id=$1;',[user.id]);
                    const fullUser= response.rows[0] as User;
                    const token: string= generateToken(fullUser);
                    const authUser: AuthUser= {
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        token: token
                    }
                    return authUser;
                }else{
                    throw new Error("Error Login");
                }
            }else{
                throw new Error("User not found");
            }
        } catch (error) {
            throw new Error("Error LOGIN");
        }
    }
}