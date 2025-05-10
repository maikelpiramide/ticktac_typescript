import express, { Request, Response } from "express";
import { isAuth, isAdmin } from "../../../context/security/auth";
import { TicketUseCases } from "../../application/ticket.usecases";
import Ticket from "../../domain/Ticket";
import Admin from "../../../usuarios/domain/Admin";
import TicketRepositoryMysql from "../data/mysql/ticket.repository.mysql";
import Rol from "../../../roles/domain/Rol";
import Usuario from "../../../usuarios/domain/Usuario";
import Cliente from "../../../usuarios/domain/Cliente";

const ticketUseCases:TicketUseCases = new TicketUseCases(new TicketRepositoryMysql());

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

export { router };