import Mensaje from "../domain/Mensaje";
import MensajeRepository from "../domain/mensaje.repository";
import Ticket from "../../ticket/domain/Ticket";
import Usuario from "../../usuarios/domain/Usuario";
import Admin from "../../usuarios/domain/Admin";
import Cliente from "../../usuarios/domain/Cliente";

export class MensajeUseCases {
    constructor(private mensajeRepository: MensajeRepository) {
    }

    async getByTicket(ticket: Ticket,usuario:Usuario | Admin | Cliente): Promise<Mensaje[]> {
        return await this.mensajeRepository.getByTicket(ticket,usuario);
    }

    async crearMensaje(mensaje: Mensaje): Promise<any> {
        return await this.mensajeRepository.crearMensaje(mensaje);
    }
}