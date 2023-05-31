import {Request, Response,Router} from 'express';
import {LogInUserInteractor} from '../use-cases/login-user-interactor'
import { User } from '../../user/entities/user';
import { ResponseApi } from '../../../kernel/types';
import { AuthStorageGateway } from './auth.storage.gateway';
import { AuthUser } from '../entities/userAuth';
import { AuthUserDto } from '../dto/auth-user';
import { AuthRepository } from '../use-cases/ports/auth.repository';

const router= Router();

export class AuthController{
    static getError(): ResponseApi<User>{
        return{
            code: 500,
            error: true,
            message: 'Error interno del servidor',
        } as ResponseApi<User>
    }

    static login= async (req: Request, res: Response): Promise<Response>=>{
        try {
            const payload: AuthUserDto= {...req.body} as AuthUserDto;
            const repo: AuthRepository = new AuthStorageGateway();
            const interactor: LogInUserInteractor = new LogInUserInteractor(repo);
            const user: AuthUser= await interactor.execute(payload);

            const body: ResponseApi<AuthUser>={
                code: 200,
                error: false,
                message: 'OK',
                count: 1,
                entity: user
            }
            return res.status(body.code).json(body);
        } catch (error) {
            console.log(error);
            return res.status(this.getError().code).json(this.getError())
        }
    }
}

router.post('/login/', AuthController.login)

export default router;