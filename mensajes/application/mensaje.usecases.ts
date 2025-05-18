import Mensaje from "../domain/Mensaje";
import MensajeRepository from "../domain/mensaje.repository";
import Ticket from "../../ticket/domain/Ticket";

export class MensajeUseCases {
    constructor(private mensajeRepository: MensajeRepository) {
    }

    async getAllByTicket(ticket: Ticket): Promise<Mensaje[]> {
        return await this.mensajeRepository.getAllByTicket(ticket);
    }

    async crearMensaje(mensaje: Mensaje): Promise<any> {
        return await this.mensajeRepository.crearMensaje(mensaje);
    }
}