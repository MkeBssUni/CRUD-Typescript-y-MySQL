import {UseCase} from "../../../kernel/contracts"
import {ResponseApi} from "../../../kernel/types"
import {Item} from "../entities/items"
import {ItemRepository} from "../use-cases/ports/item.repository"

export class DeleteItemInteractor implements UseCase<number, Item>{
    constructor(private readonly itemRepository: ItemRepository){}

    execute (payload: number): Promise<Item>{
        return this.itemRepository.deleteItem(payload);
    }
} 