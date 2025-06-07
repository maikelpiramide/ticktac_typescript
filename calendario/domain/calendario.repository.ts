import Admin from "../../usuarios/domain/Admin";
import Cliente from "../../usuarios/domain/Cliente";
import Usuario from "../../usuarios/domain/Usuario";
import Calendario from "./Calendario";

export default interface CalendarioRepository{
    getByUser(usuario:Usuario | Admin | Cliente):Promise<Calendario>;
}