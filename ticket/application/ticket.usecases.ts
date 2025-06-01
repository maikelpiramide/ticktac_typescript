import Admin from "../../usuarios/domain/Admin";
import Cliente from "../../usuarios/domain/Cliente";
import Usuario from "../../usuarios/domain/Usuario";
import Ticket from "../domain/Ticket";
import TicketRepository from "../domain/ticket.repository";
import { MensajeUseCases } from "../../mensajes/application/mensaje.usecases";
import Mensaje from "../../mensajes/domain/Mensaje";

export class TicketUseCases {

    constructor(private ticketRepository: TicketRepository,private mensajeUseCases:MensajeUseCases) {}

    async getByUser(usuario: Admin | Usuario | Cliente): Promise<Ticket[]> {
        return await this.ticketRepository.getByUser(usuario);
    }

    async crearTicket(ticket: Ticket,mensaje:Mensaje): Promise<any> {
       
        const ticketDb:Ticket = await this.ticketRepository.crearTicket(ticket);
        try {
            mensaje.ticket = ticketDb;
            await this.mensajeUseCases.crearMensaje(mensaje);
        }catch(e){
            console.log(e);
        }
       
        return ticketDb;
    }
    async getById(ticket: Ticket): Promise<Ticket> {
        return await this.ticketRepository.getById(ticket);
    }

    async editTicket(ticket: Ticket): Promise<Ticket> {
        return await this.ticketRepository.editTicket(ticket);
    }
}