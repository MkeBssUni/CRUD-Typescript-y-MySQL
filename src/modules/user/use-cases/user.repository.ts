import {ResponseApi} from '../../../kernel/types'
import { SaveUserDto, UpdateUserDto, LoginUserDto} from '../adapters/dto/user.dto'
import { User } from '../entities/user'

export interface UserRepository{
    findAll(): Promise<User[]>
    findUser(payload: number): Promise<User>
    saveUser(payload: SaveUserDto): Promise<User>
    updateUser(payload: UpdateUserDto): Promise<User>
    deleteUser(payload: number): Promise<User>
    //loginUser(payload: LoginUserDto): Promise<User>
}