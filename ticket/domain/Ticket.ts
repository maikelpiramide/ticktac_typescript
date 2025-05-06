import Admin from "../../usuarios/domain/Admin"
import Cliente from "../../usuarios/domain/Cliente"

export default class Ticket{
    id?:Number
    asunto?:String
    cliente?:Cliente
    admin?:Admin
    ts?:Date
}