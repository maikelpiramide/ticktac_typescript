import { Request, Response } from "express";
import { MensajeUseCases } from "../../application/mensaje.usecases";
import Mensaje from "../../domain/Mensaje";
import Ticket from "../../../ticket/domain/Ticket";
import MensajeMySQLRepository from "../data/mysql/mensaje.repository.mysql";

export default class MensajeController {
    private mensajeUseCases: MensajeUseCases = new MensajeUseCases(new MensajeMySQLRepository());

    async getAllByTicket(req: Request, res: Response) {
        try {
            const ticket = new Ticket();
            ticket.id = Number(req.params.idTicket);
            const mensajes = await this.mensajeUseCases.getAllByTicket(ticket);
            res.json(mensajes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los mensajes' });
        }
    }

    async crearMensaje(req: Request, res: Response) {

        try {
            const mensaje = req.body as Mensaje;
            const result = await this.mensajeUseCases.crearMensaje(mensaje);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el mensaje' });
        }
    }
}