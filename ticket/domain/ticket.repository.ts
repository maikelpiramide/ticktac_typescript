import Admin from "../../usuarios/domain/Admin";
import Cliente from "../../usuarios/domain/Cliente";
import Usuario from "../../usuarios/domain/Usuario";
import Ticket from "./Ticket";

export default interface TicketRepository{

    getByUser(usuario:Admin | Usuario| Cliente):Promise<Ticket[]>;
    getById(ticket:Ticket):Promise<Ticket>;
    crearTicket(ticket:Ticket):any;
    editTicket(ticket:Ticket):Promise<Ticket>;

}