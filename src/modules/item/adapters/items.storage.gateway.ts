import { Item } from "../entities/items"
import { ItemRepository } from "../use-cases/ports/item.repository"
import { SaveItemDto } from "./dto/save-item"
import { UpdateItemDto } from "./dto/update-item"
import {pool} from "../../../utils/dbconfig"
import {sendEmailItemSaved} from "../use-cases/save-item-email"
import { sendEmail } from "../use-cases/send-test-email"
export class ItemStorageGateway implements ItemRepository{
    
    async findAll(): Promise<Item[]>{
        try {
            const response = await pool.query('Select * from items;');
            const items: Item[]= response.rows;
            const to: string = 'i20213tn095@utez.edu.mx';
            const subject: string = 'Rechazo de vacante'
            const name: string = 'Comisión Federal de Electricidad'
            const description: string = 'su vacante ha sido rechazada, a continuación se le muestra el motivo de rechazo';
            const motivoDeRechazo: string= '"No se detallan las actividades a realizar, así como los conocimientos y habilidades necesarias para el puesto"';
            sendEmail(to,subject,name,description,motivoDeRechazo)
            return items;
        } catch (error) {
            console.log("Error Get",error)
            throw new Error;
        }
    }

    async findItem(payload: number): Promise<Item> {
        try {
            const id: number= payload;
            const response = await pool.query('Select * from items where id=$1;',[id])
            return response.rows[0] as Item;
        } catch (error) {
            console.log("Error Get One",error)
            throw new Error;
        }
    }
    async saveItem(payload: SaveItemDto): Promise<Item> {
        try {
            const {name, price, description, image} = payload;
            const response = await pool.query('Insert into items (name, price, description, image) VALUES ($1,$2,$3,$4) returning *;',[name, price, description,image])
            const item: Item = response.rows[0] as Item;
            sendEmailItemSaved("i20213tn095@utez.edu.mx","Nuevo item registrado", name, price);
            return item;
        } catch (error) {
            console.log("Error Save",error)
            throw new Error;
        }
    }

    async updateItem(payload: UpdateItemDto): Promise<Item> {
        try {
            const {id, name, price, description, image} = payload;
            const exists: boolean= false;
            const item: Item = await this.findItem(id);
            if(item){
                const response= await pool.query('update items set name=$2, price=$3, description=$4, image=$5 where id=$1 returning *;', [id, name, price, description, image])
                const updatedItem= response.rows[0] as Item;
                return updatedItem;
            }else{
                throw new Error("Item not found");
            }
        } catch (error) {
            console.log("Error Update", error);
            throw new Error;
        }
    }

    async deleteItem(payload: number): Promise<Item> {
        try {
            const response= await pool.query('delete from items where id=$1 returning *;',[payload]);
            const deletedItem: Item = response.rows[0] as Item;
            return deletedItem;
        } catch (error) {
            console.log(error)
            throw new Error ("Error")
        }
    }
}
