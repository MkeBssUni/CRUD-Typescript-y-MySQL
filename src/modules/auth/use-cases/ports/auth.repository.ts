import {AuthUser} from '../../entities/userAuth'
import { AuthUserDto } from '../../dto/auth-user'

export interface AuthRepository{
    login(payload: AuthUserDto): Promise<AuthUser>
}