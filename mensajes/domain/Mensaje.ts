import Usuario from "../../usuarios/domain/Usuario"
import Ticket from "../../ticket/domain/Ticket"
import Admin from "../../usuarios/domain/Admin"
import Cliente from "../../usuarios/domain/Cliente"

export default class Mensaje {
    id?: Number
    texto?: String
    autor?: Usuario | Admin | Cliente
    ticket?: Ticket
    ts?: Date
}