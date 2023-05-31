import * as dotenv from 'dotenv'
import express, {Application, Request, Response} from "express";
import cors from "cors";
import itemsRouter from '../src/modules/item/adapters/items.controller'
import userRouter from '../src/modules/user/adapters/user.controller'
import authRouter from '../src/modules/auth/adapters/auth.controller'


dotenv.config(); //Permite importar variables del archivo .env

if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use(itemsRouter);
app.use(userRouter);
app.use(authRouter);

app.get("/menu", (req, res) => {
    res.send("Welcome to the Menu API");
});


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})