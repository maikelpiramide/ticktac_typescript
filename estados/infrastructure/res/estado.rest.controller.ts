import express, { Request, Response } from "express";
import { isAuth, isAdmin } from "../../../context/security/auth";
import EstadoUseCases from "../../application/estado.usecases";
import { EstadoRepositoryMysql } from "../data/estado.repository.mysql";

const estadoUseCases:EstadoUseCases = new EstadoUseCases(new EstadoRepositoryMysql());

const router = express.Router();

router.get("/estados", isAuth, async (req: Request, res: Response) => {
    try {
       
        const estados = await estadoUseCases.getAll();
        res.status(200).json({ error: false, message: "Estados obtenidos correctamente", data: estados });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al obtener los estados';
        res.status(500).json({ error: true, message: errorMessage });
    }
});

export { router };