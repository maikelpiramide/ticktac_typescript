import express,{Request,Response} from "express";
import cors from "cors"
import dotenv from "dotenv"
import { initializeConnection } from "./context/MysqlConnector";
import {router as routerUser} from "./usuarios/infrastructure/res/usuario.rest.controller";
import { router as routerPlanes } from "./planes/infrastructure/res/plan.rest.controller";
import { router as routerTiposPago } from "./tipospago/infrastructure/res/tipopago.rest.controller";
import { router as routerTicket } from "./ticket/infrastructure/res/ticket.rest.controller";
import { router as routeEstado } from "./estados/infrastructure/res/estado.rest.controller";
import { initSocket } from "./context/utilities/Shoket";
import http from "http";
dotenv.config()

const app = express()
const api = "/api"
const server = http.createServer(app);

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

app.use(api,routerUser);
app.use(api,routerPlanes);
app.use(api,routerTiposPago);
app.use(api,routerTicket);
app.use(api,routeEstado);

(async () => {
    try {
      await initializeConnection();
    } catch (error) {
      console.error('Error al inicializar la conexión a la base de datos:', error);
    }
})();

const io = initSocket(server);
server.listen(process.env.SERVER_PORT,()=>{
    console.log(`servidor escuchando por el 8080`)
})