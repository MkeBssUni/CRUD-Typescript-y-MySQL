import {UseCase} from "../../../kernel/contracts"
import {Item} from "../entities/items"
import { SaveItemDto } from "../adapters/dto/save-item"
import {ItemRepository} from "../use-cases/ports/item.repository"

export class SaveItemInteractor implements UseCase<SaveItemDto, Item>{
    constructor( private readonly itemRepository:ItemRepository){}
    execute(payload: SaveItemDto): Promise<Item>{
        return this.itemRepository.saveItem(payload)
    }
}