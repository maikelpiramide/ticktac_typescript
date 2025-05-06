import Admin from "../../usuarios/domain/Admin";
import Ticket from "./Ticket";

export default interface TicketRepository{

    getByAdmin(admin:Admin):Promise<Ticket[]>;
    crearTicket(ticket:Ticket):any;

}