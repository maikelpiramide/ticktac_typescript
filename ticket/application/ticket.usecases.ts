import Admin from "../../usuarios/domain/Admin";
import Cliente from "../../usuarios/domain/Cliente";
import Usuario from "../../usuarios/domain/Usuario";
import Ticket from "../domain/Ticket";
import TicketRepository from "../domain/ticket.repository";

export class TicketUseCases {

    constructor(private ticketRepository: TicketRepository) {}

    async getByUser(usuario: Admin | Usuario | Cliente): Promise<Ticket[]> {
        return await this.ticketRepository.getByUser(usuario);
    }

    async crearTicket(ticket: Ticket): Promise<any> {
        return await this.ticketRepository.crearTicket(ticket);
    }
}