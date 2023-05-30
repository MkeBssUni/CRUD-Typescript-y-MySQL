import {UseCase} from "../../../kernel/contracts"
import {AuthUser} from '../entities/userAuth'
import { AuthUserDto } from "../dto/auth-user"
import { AuthRepository } from "./ports/auth.repository"

export class LogInUserInteractor implements UseCase<AuthUserDto,AuthUser>{
    constructor(private readonly authRepo: AuthRepository){}
    execute(payload: AuthUserDto): Promise<AuthUser> {
        return this.authRepo.login(payload);
    }
}