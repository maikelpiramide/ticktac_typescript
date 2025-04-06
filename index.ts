import express,{Request,Response} from "express";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const api = "/api"

const options: cors.CorsOptions = {
    origin:[
        "http://localhost:5173",
        "https://master.d2achkkcebk0hr.amplifyapp.com/"
    ]
}

app.get("/",(req:Request,res:Response)=>{
    res.json({message:"Servidor corriendo para app ticktac"})
})


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