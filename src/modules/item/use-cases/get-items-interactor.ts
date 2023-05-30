import {UseCase} from "../../../kernel/contracts"
import {Item} from "../entities/items"
import {ItemRepository} from "./ports/item.repository"

export class GetItemsInteractor implements UseCase<null, Item[]>{
    constructor (private readonly itemRepository: ItemRepository){}
    execute (): Promise<Item[]>{
        return this.itemRepository.findAll();
    }
}