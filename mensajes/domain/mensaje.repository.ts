import Mensaje from "./Mensaje";
import Ticket from "../../ticket/domain/Ticket";

export default interface MensajeRepository {
    getAllByTicket(ticket: Ticket): Promise<Mensaje[]>;
    crearMensaje(mensaje: Mensaje): Promise<any>;
}