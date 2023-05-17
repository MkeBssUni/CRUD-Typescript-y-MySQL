import {UseCase} from "../../../kernel/contracts"
import {ReponseApi} from "../../../kernel/types"
import {Item} from "../entities/items"
import {ItemRepository} from "../use-cases/ports/item.repository"


export class GetItemInteractor implements UseCase<number, Item>{
    constructor (private readonly itemRepository: ItemRepository){}

    execute (payload: number): Promise<Item>{
        return this.itemRepository.findItem(payload);
    }
}