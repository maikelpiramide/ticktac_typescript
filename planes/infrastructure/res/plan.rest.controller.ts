import express, { Request, Response } from "express";
import { PlanRepositoryMysql } from "../data/mysql/plan.repository.mysql";
import { PlanUseCases } from "../../application/plan.usecases";

const planUseCases = new PlanUseCases(new PlanRepositoryMysql());
const router = express.Router();

router.get("/planes", async (req: Request, res: Response) => {
    try {
        const planes = await planUseCases.getAll();
        res.status(200).json({ error: false, message: "Planes obtenidos", data: planes });
    } catch (error) {
        res.status(500).json({ error: true, message: error });
    }
});

export { router };