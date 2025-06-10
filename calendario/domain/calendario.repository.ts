import Evento from "../../evento/domain/Evento";
import Admin from "../../usuarios/domain/Admin";
import Cliente from "../../usuarios/domain/Cliente";
import Usuario from "../../usuarios/domain/Usuario";
import Calendario from "./Calendario";

export default interface CalendarioRepository{
    getByUser(usuario:Usuario | Admin | Cliente):Promise<Calendario>;
    setEvento(usuario:Usuario | Admin,evento:Evento):Promise<Evento>;
    updateEvento(evento:Evento):Promise<Evento>;
    removeEvento(evento:Evento):Promise<String>
    crearCalendario(usuario:Usuario|Admin):Promise<Calendario>
}