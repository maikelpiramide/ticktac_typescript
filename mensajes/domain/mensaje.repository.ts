import Mensaje from "./Mensaje";
import Ticket from "../../ticket/domain/Ticket";
import Usuario from "../../usuarios/domain/Usuario";
import Admin from "../../usuarios/domain/Admin";
import Cliente from "../../usuarios/domain/Cliente";

export default interface MensajeRepository {
    getByTicket(ticket: Ticket,usuario:Usuario | Admin | Cliente): Promise<Mensaje[]>;
    crearMensaje(mensaje: Mensaje): Promise<any>;
}