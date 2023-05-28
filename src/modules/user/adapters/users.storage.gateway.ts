import { User } from "../entities/user";
import { UserRepository } from "../use-cases/user.repository";
import { SaveUserDto, UpdateUserDto } from "./dto/user.dto";
import {pool} from '../../../utils/dbconfig'
import { hashPassword } from "../../../utils/functions";

export class UserStorageGateway implements UserRepository{
    async findAll(): Promise<User[]> {
        try {
            const response = await pool.query('Select * from users;')
            const users: User[] = response.rows;
            return users;
        } catch (error) {
            console.log("Error Get", error)
            throw new Error;
        }
    }

    async findUser(payload: number): Promise<User> {
        try {
            const response = await pool.query('Select * from users where id=$1;',[payload])       
            return response.rows[0] as User;
        } catch (error) {
            console.log("Error en Get One", error)
            throw new Error;
        }
    }

    async saveUser(payload: SaveUserDto): Promise<User> {
        try {
            const {username, password, role} = payload;
            const hashedPassword= await hashPassword(password);
            const response= await pool.query("Insert into users (username, password, role) values ($1,$2,$3) returning *;",[username,hashedPassword,role])
            const user= response.rows[0] as User;
            return user
        } catch (error) {
            console.log("Error save", error);
            throw new Error;
        }
    }

    async updateUser(payload: UpdateUserDto): Promise<User> {
        try {
            const {id, username, password, role} = payload;
            const hashedPassword= await hashPassword(password);
            const exists: boolean= false;
            const user: User = await this.findUser(id);
            if(user){
                const response= await pool.query('update users set username=$2, password=$3, role=$4 where id=$1 returning *;', [id, username, hashedPassword, role])
                const updatedUser= response.rows[0] as User;
                return updatedUser;
            }else{
                throw new Error("User not found");
            }
        } catch (error) {
            console.log("Error Update", error);
            throw new Error;
        }
    }

    async deleteUser(payload: number): Promise<User> {
        try {
            const id: number= payload;
            const exists: boolean= false;
            const user: User = await this.findUser(id);
            if(user){
                const response= await pool.query('delete from users where id=$1 returning *;', [id])
                const deletedUser= response.rows[0] as User;
                return deletedUser;
            }else{
                throw new Error("User not found");
            }
        } catch (error) {
            console.log("Error Delete", error);
            throw new Error;
        }
    }
}