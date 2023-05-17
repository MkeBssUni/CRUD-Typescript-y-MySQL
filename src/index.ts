import * as dotenv from 'dotenv'
import express, {Application, Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";



dotenv.config(); //Permite importar variables del archivo .env

if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
//app.use("/api/menu/items", itemsRouter);


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})