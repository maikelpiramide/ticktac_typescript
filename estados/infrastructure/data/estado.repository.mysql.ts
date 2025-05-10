import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Estado from "../../domain/Estado";
import EstadoRepository from "../../domain/estado.repository";
import { getMySqlConnection } from "../../../context/MysqlConnector";

export class EstadoRepositoryMysql implements EstadoRepository {

    async getAll(): Promise<Estado[]> {
        const connection = getMySqlConnection();
        let estados:Estado[] = new Array();
        const [rows]:any = await connection.query('SELECT * FROM estado');
        if(rows.length > 0){
            rows.forEach((row:any) => {
                const estado:Estado = {
                    id: row.id,
                    nombre: row.nombre
                };
                estados.push(estado);
            });
        }
        return estados;
        
    }
}