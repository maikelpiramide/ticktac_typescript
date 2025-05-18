import express, { Request, Response } from "express";
import { isAuth, isAdmin } from "../../../context/security/auth";
import { TicketUseCases } from "../../application/ticket.usecases";
import Ticket from "../../domain/Ticket";
import Admin from "../../../usuarios/domain/Admin";
import TicketRepositoryMysql from "../data/mysql/ticket.repository.mysql";
import Rol from "../../../roles/domain/Rol";
import Usuario from "../../../usuarios/domain/Usuario";
import Cliente from "../../../usuarios/domain/Cliente";
import { MensajeUseCases } from "../../../mensajes/application/mensaje.usecases";
import MensajeMySQLRepository from "../../../mensajes/infrastructure/data/mysql/mensaje.repository.mysql";
import Estado from "../../../estados/domain/Estado";
import Mensaje from "../../../mensajes/domain/Mensaje";

const mensajeUseCases:MensajeUseCases = new MensajeUseCases(new MensajeMySQLRepository());
const ticketUseCases:TicketUseCases = new TicketUseCases(new TicketRepositoryMysql(),mensajeUseCases);

const router = express.Router();

router.get("/tickets", isAuth, async (req: Request, res: Response) => {
    try {
        let user: Admin | Usuario | Cliente;
        switch (req.body.auth.rol) {
            case Rol.ADMIN:
                user = {
                    id: req.body.auth.id,
                    rol: Rol.ADMIN
                } as Admin;
                break;
            case Rol.USER:
                user = {
                    id: req.body.auth.id,
                    rol: Rol.USER
                } as Usuario;
                break;
            case Rol.CLIENT:
                user = {
                    id: req.body.auth.id,
                    rol: Rol.CLIENT
                } as Cliente;
                break;
            default:
                throw new Error('Rol no válido');
        }
        const tickets = await ticketUseCases.getByUser(user);
        res.status(200).json({ error: false, message: "Tickets obtenidos correctamente", data: tickets });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al obtener los tickets';
        res.status(500).json({ error: true, message: errorMessage });
    }
});

router.post("/ticket", isAuth, async (req: Request, res: Response) => {
    const data = req.body;
    const auth = req.body.auth;
    try{
        let user: Admin | Usuario | Cliente;
        const e:Estado = {
            id:data.estado
        }
        let ticket:Ticket = {
            asunto:data.asunto,
            estado:e
        }
        switch (auth.rol) {
            case Rol.ADMIN:
                user = {
                    id: auth.id,
                    rol: Rol.ADMIN
                } as Admin;
                ticket.admin = user;
                if(data.usuario){
                    let u:Usuario = {
                        id: data.usuario
                    }
                    ticket.usuario = u
                }
                const c:Cliente = {
                    id:data.cliente
                }
                ticket.cliente = c
                break;
            /*case Rol.USER:
                user = {
                    id: auth.id,
                    rol: Rol.USER
                } as Usuario;
                ticket.usuario = user;
                ticket.cliente = new Cliente().id = data.cliente
                break;
            case Rol.CLIENT:
                user = {
                    id: auth.id,
                    rol: Rol.CLIENT
                } as Cliente;
                ticket.cliente = user;
                break;*/
            default:
                throw new Error('Rol no válido');
        }
        let mensaje:Mensaje = {
            texto:data.mensaje,
            autor:user
        }
        let ticketdb = await ticketUseCases.crearTicket(ticket,mensaje);
        
        res.json({error:false,data:ticketdb,message:"Ticket creado correctamente"});

    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'No se puedo crear el ticket';
        res.status(500).json({ error: true, message: errorMessage });
    }
})

export { router };