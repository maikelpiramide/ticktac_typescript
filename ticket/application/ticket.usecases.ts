import Admin from "../../usuarios/domain/Admin";
import Ticket from "../domain/Ticket";
import TicketRepository from "../domain/ticket.repository";

export class TicketUseCases {

    constructor(private ticketRepository: TicketRepository) {}

    async getByAdmin(admin: Admin): Promise<Ticket[]> {
        return await this.ticketRepository.getByAdmin(admin);
    }

    async crearTicket(ticket: Ticket): Promise<any> {
        return await this.ticketRepository.crearTicket(ticket);
    }
}