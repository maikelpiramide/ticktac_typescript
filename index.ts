import express,{Request,Response} from "express";
import cors from "cors"
import dotenv from "dotenv"
import { initializeConnection } from "./context/MysqlConnector";
dotenv.config()

const app = express()
const api = "/api"

const options: cors.CorsOptions = {
    origin:[
        "http://localhost:5173"
    ]
}
app.use(cors(options));
app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
    res.send("App ticktac corriendo");
});

(async () => {
    try {
      await initializeConnection();
    } catch (error) {
      console.error('Error al inicializar la conexión a la base de datos:', error);
    }
})();



app.listen(process.env.SERVER_PORT,()=>{
    console.log(`servidor escuchando por el 8080`)
})