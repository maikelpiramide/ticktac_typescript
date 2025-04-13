import { Plan } from "../../planes/domain/Plan";
import TipoPago from "../../tipospago/domain/TipoPago";

export default class Admin {
    id?: number;
    nombre?: string;
    email?: string;
    password?:string;
    rol?: string;
    plan?:Plan;
    tipoPago?:TipoPago;
    inicioPlan?:Date;
}