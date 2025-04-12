import { getMySqlConnection } from "../../../../context/MysqlConnector";
import { Plan } from "../../../domain/Plan";
import { PlanRepository } from "../../../domain/plan.repository";

export class PlanRepositoryMysql implements PlanRepository {
    async getAll(): Promise<Plan[]> {
        const connection = getMySqlConnection();
        const [rows]: any = await connection.query("select * from plan");
        console.log("en el rows planes",rows)
        return rows as Plan[];
    }
}