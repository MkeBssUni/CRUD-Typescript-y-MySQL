import {ResponseApi} from "../../../../kernel/types"
import {Item} from "../../entities/items"
import {SaveItemDto} from "../../adapters/dto/save-item"
import {UpdateItemDto} from "../../adapters/dto/update-item"

export interface ItemRepository{
    findAll(): Promise<Item[]>
    findItem(payload: number): Promise<Item>
    saveItem(payload: SaveItemDto): Promise<Item>
    updateItem(payload: UpdateItemDto): Promise<Item>
    deleteItem(payload: number): Promise<Item>

}