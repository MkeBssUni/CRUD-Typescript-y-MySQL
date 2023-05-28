import { exec } from "child_process";
import {UseCase} from "../../../kernel/contracts"
import {ResponseApi} from "../../../kernel/types"
import { User } from "../entities/user"
import { UserRepository } from "./user.repository"
import { SaveUserDto, UpdateUserDto, LoginUserDto } from "../adapters/dto/user.dto";


export class GetUsersInteractor implements UseCase<null,User[]>{
    constructor(private readonly userRepository: UserRepository){}
    execute (): Promise<User[]> {
        return this.userRepository.findAll();
    }
}

export class GetUserInteractor implements UseCase<number, User>{
    constructor(private readonly userRepository: UserRepository){}
    execute (payload: number): Promise<User>{
        return this.userRepository.findUser(payload)
    }
}

export class SaveUserInteractor implements UseCase<SaveUserDto,User>{
    constructor(private readonly userRepository: UserRepository){}
    execute(payload: SaveUserDto): Promise<User> {
        return this.userRepository.saveUser(payload)
        
    }
}

export class UpdateUserInteractor implements UseCase<UpdateUserDto, User>{
    constructor(private readonly userRepository: UserRepository){}
    execute(payload: UpdateUserDto): Promise<User> {
        return this.userRepository.updateUser(payload)
    }
}

export class DeleteUserInteractor implements UseCase<number, User>{
    constructor(private readonly userRepository: UserRepository){}
    execute(payload: number): Promise<User> {
        return this.userRepository.deleteUser(payload)
    }
}

/* export class LoginUserInteractor implements UseCase<LoginUserDto, User>{
    constructor(private readonly userRepository: UserRepository){}
    execute(payload: ): Promise<User> {
        return this.userRepository.loginUser(payload)
    }
} */