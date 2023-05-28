import { Request, Response, Router } from "express";
import { GetUserInteractor, GetUsersInteractor, SaveUserInteractor, UpdateUserInteractor,DeleteUserInteractor } from "../use-cases/user.interactors";
import { User } from "../entities/user";
import { UserRepository } from "../use-cases/user.repository";
import { UserStorageGateway } from "./users.storage.gateway";
import { ResponseApi } from "../../../kernel/types";
import { SaveUserDto, UpdateUserDto } from "./dto/user.dto";

const router = Router();

export class UserController{
    static getError(): ResponseApi<User>{
        return{
            code: 500,
            error: true,
            message: 'Error interno del servidor',
        } as ResponseApi<User>
    }

    static findAll = async (req: Request, res: Response): Promise<Response>=>{
        try {
            const userRepository: UserRepository = new UserStorageGateway();
            const getUsers: GetUsersInteractor = new GetUsersInteractor(userRepository);
            const users: User[] = await getUsers.execute();
            const body: ResponseApi<User>={
                code: 200,
                error: false,
                message: 'Ok',
                count: users.length,
                entities: users
            }
            return res.status(body.code).json(body);
        } catch (error) {
            console.log(error);
            return res.status(this.getError().code).json(this.getError())
        }
    }

    static findOne = async (req:Request, res: Response): Promise<Response>=>{
        try {
            const id: number= parseInt(req.params.id);
            const repo: UserRepository = new UserStorageGateway();
            const interactor: GetUserInteractor= new GetUserInteractor(repo);

            const user: User = await interactor.execute(id);
            const body: ResponseApi<User>={
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
    

    static insert = async (req: Request, res: Response): Promise<Response>=>{
        try {
            const payload: SaveUserDto= {...req.body} as SaveUserDto;
            const repo: UserRepository= new UserStorageGateway();
            const interactor: SaveUserInteractor= new SaveUserInteractor(repo);
            const user: User= await interactor.execute(payload);
            const body: ResponseApi<User>={
                code: 200,
                error: false,
                message: 'Ok',
                entity: user
            }
            return res.status(body.code).json(body)
        } catch (error) {
            console.log(error);
            return res.status(this.getError().code).json(this.getError())
        }
    }

    static update= async (req: Request, res:Response): Promise<Response>=>{
        try {
            const id: number = parseInt(req.params.id);
            const payload: UpdateUserDto= {id:id, ...req.body} as UpdateUserDto;

            const repo: UserRepository = new UserStorageGateway();
            const interactor: UpdateUserInteractor = new UpdateUserInteractor(repo);

            const user: User = await interactor.execute(payload);
            let body: ResponseApi<User>={
                code: 200,
                error: false,
                message: 'Ok',
                entity: user
            }
            return res.status(body.code).json(body);
        } catch (error) {
            console.log(error);
            return res.status(this.getError().code).json(this.getError())
        }
    }

    static delete= async (req: Request, res: Response): Promise<Response>=>{
        try {
            const id: number = parseInt(req.params.id);
            const repo: UserRepository = new UserStorageGateway();
            const interactor: DeleteUserInteractor = new DeleteUserInteractor(repo);
            const user: User = await interactor.execute(id);
            const body: ResponseApi<User>={
                code: 200,
                error: false,
                message: 'Ok',
                entity: user
            }
            return res.status(body.code).json(body);
        } catch (error) {
            console.log(error);
            return res.status(this.getError().code).json(this.getError())
        }
    }
}

router.get('/users/', UserController.findAll);
router.get('/users/:id', UserController.findOne);
router.post('/users/', UserController.insert);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;