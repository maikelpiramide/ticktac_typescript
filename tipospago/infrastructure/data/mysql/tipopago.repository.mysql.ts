import TipoPago from "../../../domain/TipoPago";
import TipoPagoRepository from "../../../domain/tipopago.repository";
import { getMySqlConnection } from "../../../../context/MysqlConnector";

export default class TipoPagoRepositoryMysql implements TipoPagoRepository {

    async getById(id: number): Promise<TipoPago | null> {
        const connection = getMySqlConnection();
        const [result]: any = await connection.query("SELECT * FROM tipo_pago WHERE id = ?", [id]);
        if (result.length === 0) return null;
        return {
            id: result[0].id,
            nombre: result[0].nombre
        };
    }

    async getAll(): Promise<TipoPago[]> {
        const connection = getMySqlConnection();
        const [result]: any = await connection.query("SELECT * FROM tipo_pago");
        return result.map((row: any) => ({
            id: row.id,
            nombre: row.nombre
        }));
    }
}