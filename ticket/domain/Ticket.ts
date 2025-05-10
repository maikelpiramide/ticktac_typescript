import Estado from "../../estados/domain/Estado"
import Admin from "../../usuarios/domain/Admin"
import Cliente from "../../usuarios/domain/Cliente"
import Usuario from "../../usuarios/domain/Usuario"

export default class Ticket{
    id?:Number
    asunto?:String
    estado?:Estado
    cliente?:Cliente
    admin?:Admin
    usuario?:Usuario
    activo?:Boolean
    ts?:Date
}