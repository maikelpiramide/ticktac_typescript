import Rol from "../../../../roles/domain/Rol"
import Admin from "../../../../usuarios/domain/Admin"
import Usuario from "../../../../usuarios/domain/Usuario"
import Ticket from "../../../domain/Ticket"
import TicketRepository from "../../../domain/ticket.repository"
import { getMySqlConnection } from "../../../../context/MysqlConnector"
import Estado from "../../../../estados/domain/Estado"
import Cliente from "../../../../usuarios/domain/Cliente"
export default class TicketRepositoryMysql implements TicketRepository{
    
    async getById(id: Number): Promise<Ticket> {
        const connection = getMySqlConnection();
        console.warn("id nuevo ticket",id)
        let query = `
            SELECT t.id,t.asunto, t.ts,state.id AS id_estado,state.nombre AS nombre_estado,c.email AS email_cliente,a.email as email_admin, u.email as email_usuario FROM ticket AS t
            JOIN estado AS state
            ON state.id = t.id_estado
            JOIN cliente AS c
            ON c.id = t.id_cliente
            JOIN admin AS a
            ON a.id = t.id_admin
            LEFT JOIN usuario AS u
            ON u.id = t.id_usuario
            where t.id = ? and  t.activo = ?
        `
        const [result]:any = await connection.query(query,[id,true]);
        console.log(result)
        const estado:Estado = {
            id:result[0].id_estado,
            nombre: result[0].nombre_estado
        }
        const ticket:Ticket = {
            id:result[0].id,
            asunto: result[0].asunto,
            estado:estado,
            cliente:new Cliente().email = result[0].email_cliente,
            admin:new Admin().email = result[0].email_admin,
            usuario:new Usuario().email = result[0].email_usuario,
            ts:result[0].ts
        }
        return ticket;
    }

    async getByUser(usuario: Admin | Usuario | Cliente): Promise<Ticket[]> {
        const connection = getMySqlConnection();
        let tickets:Ticket[] = new Array();
        let query = `
            SELECT t.id,t.asunto, t.ts,state.id AS id_estado,state.nombre AS nombre_estado,c.email AS email_cliente,a.email as email_admin, u.email as email_usuario FROM ticket AS t
            JOIN estado AS state
            ON state.id = t.id_estado
            JOIN cliente AS c
            ON c.id = t.id_cliente
            JOIN admin AS a
            ON a.id = t.id_admin
            LEFT JOIN usuario AS u
            ON u.id = t.id_usuario
            where t.activo = ?
        `
        
        if(usuario.rol == Rol.ADMIN)
            query += 'and t.id_admin = ?'
        if(usuario.rol == Rol.USER)
            query += 'and t.id_usuario =?'
        if(usuario.rol == Rol.CLIENT)
            query += 'and t.id_cliente =?'
        
        const [result]:any = await connection.query(query, [true,usuario.id]);
        if(result.length > 0){
            result.forEach((t:any) => {
                const estado:Estado = {
                    id:t.id_estado,
                    nombre: t.nombre_estado
                }
                const ticket:Ticket = {
                    id:t.id,
                    asunto: t.asunto,
                    estado:estado,
                    cliente:new Cliente().email = t.email_cliente,
                    admin:new Admin().email = t.email_admin,
                    usuario:new Usuario().email = t.email_usuario,
                    ts:t.ts
                }
                tickets.push(ticket);
            });
        }

        return tickets;

    }
    async crearTicket(ticket: Ticket) {
        const connection = getMySqlConnection();
        const [result]:any = await connection.query('INSERT INTO ticket (asunto,id_usuario,id_cliente,id_admin,id_estado) values (?,?,?,?,?)',[ticket.asunto,ticket.usuario?.id,ticket.cliente?.id,ticket.admin?.id,ticket.estado?.id]);
        const id = result.insertId;
        //ticket.id = result.insertId;
        //ticket.ts = new Date();
        const newTicket = await this.getById(id);
        console.warn("tocket nuevo",newTicket)
        return this.getById(id);
    }
}