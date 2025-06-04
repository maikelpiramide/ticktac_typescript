import Mensaje from "../domain/Mensaje";
import MensajeRepository from "../domain/mensaje.repository";
import Ticket from "../../ticket/domain/Ticket";
import Usuario from "../../usuarios/domain/Usuario";
import Admin from "../../usuarios/domain/Admin";
import Cliente from "../../usuarios/domain/Cliente";
import Rol from "../../roles/domain/Rol";

export class MensajeUseCases {
    constructor(private mensajeRepository: MensajeRepository) {
    }

    async getByTicket(ticket: Ticket,usuario:Usuario | Admin | Cliente): Promise<Mensaje[]> {
        switch(usuario.rol){
            case Rol.ADMIN:
                if(ticket.admin && usuario.id !== ticket.admin.id) throw new Error('No tienes permisos para ver este ticket');
                break;
            case Rol.CLIENT:
                if(ticket.cliente && usuario.id!== ticket.cliente.id) throw new Error('No tienes permisos para ver este ticket');
                break;
            case Rol.USER:
                if(ticket.usuario && usuario.id!== ticket.usuario.id) throw new Error('No tienes permisos para ver este ticket');
                break;
            default:
                throw new Error('No tienes permisos para ver este ticket');
        }

        return await this.mensajeRepository.getByTicket(ticket);
    }

    async crearMensaje(mensaje: Mensaje): Promise<any> {
        return await this.mensajeRepository.crearMensaje(mensaje);
    }
}