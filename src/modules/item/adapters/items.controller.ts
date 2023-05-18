import { Request, Response, Router } from "express";
import {GetItemsInteractor} from '../use-cases/get-items-interactor'
import {GetItemInteractor} from "../use-cases/get-item-interactor"
import {SaveItemInteractor} from '../use-cases/save-item-interactor'
import {DeleteItemInteractor} from '../use-cases/delete-item-interactor'
import {UpdateItemInteractor} from '../use-cases/update-item-interactor'
import { Item } from "../entities/items";
import { ItemRepository } from "../use-cases/ports/item.repository";
import { SaveItemDto } from "./dto/save-item";
import { UpdateItemDto } from "./dto/update-item";
import { ItemStorageGateway } from "./items.storage.gateway";
import {ReponseApi} from "../../../kernel/types"

const router = Router();

export class ItemController{

    static getError(): ReponseApi<Item>{
        return{
            code: 500,
            error: true,
            message: 'Error interno del servidor',
        } as ReponseApi<Item>
    }

    static findAll = async (req: Request, res: Response): Promise<Response>=>{
        try {
            const itemRepository: ItemRepository= new ItemStorageGateway();
            const getInteractor: GetItemsInteractor = new GetItemsInteractor(itemRepository);

            const items: Item[] = await getInteractor.execute();
            const body: ReponseApi<Item>={
                code: 200,
                error: false,
                message: 'Ok',
                count: items.length,
                entities: items
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
            const repo: ItemRepository = new ItemStorageGateway();
            const interactor: GetItemInteractor = new GetItemInteractor(repo);

            const item: Item = await interactor.execute(id);
            const body: ReponseApi<Item>={
                code: 200,
                error: false,
                message: 'OK',
                count: 1,
                entity: item
            }

            return res.status(body.code).json(body);
        } catch (error) {
            console.log(error);
            return res.status(this.getError().code).json(this.getError())
        }
    }
    
    static insert = async (req: Request, res: Response): Promise<Response>=>{
        try {
            const payload: SaveItemDto= {...req.body} as SaveItemDto;
            const repo: ItemRepository= new ItemStorageGateway();
            const interactor: SaveItemInteractor = new SaveItemInteractor(repo);

            const item: Item= await interactor.execute(payload);
            const body: ReponseApi<Item>={
                code: 200,
                error: false,
                message: 'OK',
                count: 1,
                entity: item
            }

            return res.status(body.code).json(body);

        }catch (error) {
            console.log(error);
            return res.status(this.getError().code).json(this.getError())
        }
    }

    static update = async (req: Request, res: Response): Promise<Response>=>{
        try {
            const id: number = parseInt(req.params.id);
            const payload: UpdateItemDto= {id: id,...req.body} as UpdateItemDto;

            const repo: ItemRepository= new ItemStorageGateway();
            const interactor: UpdateItemInteractor = new UpdateItemInteractor(repo);

            const item: Item= await interactor.execute(payload)

            let body: ReponseApi<Item>={ 
                code: 200,
                error: false,
                message: 'OK',
                count: 1,
                entity: item
            }
            return res.status(body.code).json(body);

        } catch (error) {
            console.log(error);
            return res.status(this.getError().code).json(this.getError())
        }
    }

    static delete  = async (req: Request, res: Response): Promise<Response>=>{
        try {
            const id: number= parseInt(req.params.id);
            
            const repo: ItemRepository= new ItemStorageGateway();
            const interactor: DeleteItemInteractor= new DeleteItemInteractor(repo);

            const itemDeleted: Item = await interactor.execute(id);

            let body: ReponseApi<Item>={
                code: 200,
                error: false,
                message: 'OK',
                count: 1,
                entity: itemDeleted
            }

            if(!itemDeleted) body = {...body, code: 400, message: 'Error', count: undefined}
            return res.status(body.code).json(body);
            
        } catch (error) {
            console.log(error)
            return res.status(this.getError().code).json(this.getError())
        }
    }
}

router.get('/items/', ItemController.findAll)
router.get('/items/:id', ItemController.findOne)
router.post('/items/',ItemController.insert)
router.put('/items/:id',ItemController.update)
router.delete('/items/:id',ItemController.delete)

export default router;