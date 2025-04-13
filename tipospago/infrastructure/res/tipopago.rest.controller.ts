import express, { Request, Response } from "express";
import TipoPagoUseCases from "../../application/tipopago.usecases";
import TipoPagoRepositoryMysql from "../data/mysql/tipopago.repository.mysql";
const tipoPagoUseCases = new TipoPagoUseCases(new TipoPagoRepositoryMysql());
const router = express.Router();

router.get("/tipospago", async (req: Request, res: Response) => {
    try {
        const tiposPago = await tipoPagoUseCases.getAllTiposPago();
        res.status(200).json({ error: false, message: "Tipos de pago obtenidos", data: tiposPago });
    } catch (error) {
        res.status(500).json({ error: true, message: error });
    }
});

export { router };