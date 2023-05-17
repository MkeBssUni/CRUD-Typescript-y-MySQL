import {UseCase} from "../../../kernel/contracts"
import {Item} from "../entities/items"
import { UpdateItemDto } from "../adapters/dto/update-item"
import {ItemRepository} from "../use-cases/ports/item.repository"

export class UpdateItemInteractor implements UseCase<UpdateItemDto, Item>{
    constructor(private readonly itemRepository: ItemRepository){}

    execute(payload: UpdateItemDto): Promise<Item>{
        return this.itemRepository.updateItem(payload);
    }
}