import Rol from "../../../../roles/domain/Rol"
import Admin from "../../../../usuarios/domain/Admin"
import Usuario from "../../../../usuarios/domain/Usuario"
import Ticket from "../../../domain/Ticket"
import TicketRepository from "../../../domain/ticket.repository"
import { getMySqlConnection } from "../../../../context/MysqlConnector"
import Estado from "../../../../estados/domain/Estado"
import Cliente from "../../../../usuarios/domain/Cliente"
export default class TicketRepositoryMysql implements TicketRepository{
    
    async getById(t:Ticket): Promise<Ticket> {
        const connection = getMySqlConnection();
        //console.warn("id nuevo ticket",id)
        let query = `
            SELECT t.id,t.asunto, t.ts,state.id AS id_estado,state.nombre AS nombre_estado,c.email AS email_cliente, c.id as id_cliente,a.email as email_admin,a.id as id_admin, u.email as email_usuario, u.id as id_usuario FROM ticket AS t
            JOIN estado AS state
            ON state.id = t.id_estado
            left JOIN cliente AS c
            ON c.id = t.id_cliente
            left JOIN admin AS a
            ON a.id = t.id_admin
            LEFT JOIN usuario AS u
            ON u.id = t.id_usuario
            where t.id = ? and  t.activo = ?
        `
        const [result]:any = await connection.query(query,[t.id,true]);
        //console.log(result)
        const estado:Estado = {
            id:result[0].id_estado,
            nombre: result[0].nombre_estado
        }
        const usuario:Usuario = {
            id:result[0].id_usuario,
            email:result[0].email_usuario
        }
        const admin:Admin = {
            id:result[0].id_admin,
            email:result[0].email_admin
        }
        const cliente:Cliente = {
            id:result[0].id_cliente,
            email:result[0].email_cliente
        }
        const ticket:Ticket = {
            id:result[0].id,
            asunto: result[0].asunto,
            estado:estado,
            cliente: cliente,
            admin:admin,
            usuario:usuario,
            ts:result[0].ts
        }
        return ticket;
    }

    async getByUser(usuario: Admin | Usuario | Cliente): Promise<Ticket[]> {
        const connection = getMySqlConnection();
        let tickets:Ticket[] = new Array();
        let query = `
            SELECT t.id,t.asunto, t.ts,state.id AS id_estado,state.nombre AS nombre_estado,c.email AS email_cliente,c.id as id_cliente,a.email as email_admin, a.id as id_admin, u.email as email_usuario, u.id as id_usuario FROM ticket AS t
            JOIN estado AS state
            ON state.id = t.id_estado
            left JOIN cliente AS c
            ON c.id = t.id_cliente
            left JOIN admin AS a
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
                const usuario:Usuario = {
                    id:t.id_usuario,
                    email:t.email_usuario
                }
                const admin:Admin = {
                    id:t.id_admin,
                    email:t.email_admin
                }
                const cliente:Cliente = {
                    id:t.id_cliente,
                    email:t.email_cliente
                }
                const ticket:Ticket = {
                    id:t.id,
                    asunto: t.asunto,
                    estado:estado,
                    cliente:cliente,
                    admin:admin,
                    usuario:usuario,
                    ts:t.ts
                }
                tickets.push(ticket);
            });
        }

        return tickets;

    }
    async crearTicket(ticket: Ticket) {
        //console.warn("ticken en rapo",ticket)
        const connection = getMySqlConnection();
        const [result]:any = await connection.query('INSERT INTO ticket (asunto,id_usuario,id_cliente,id_admin,id_estado) values (?,?,?,?,?)',[ticket.asunto,ticket.usuario ? ticket.usuario.id:null,ticket.cliente ? ticket.cliente.id : null,ticket.admin ? ticket.admin.id : null,ticket.estado?.id]);
        if(!result.insertId) throw new Error('No se pudo crear el ticket');
        ticket.id = result.insertId;
        return this.getById(ticket);
    }

    async editTicket(ticket: Ticket): Promise<Ticket> {
        const connection = getMySqlConnection();
        //console.warn("ticket edit",ticket)
        await connection.query('UPDATE ticket SET asunto = ?, id_estado = ?, id_admin = ?, id_cliente = ?, id_usuario = ? WHERE id = ?',[ticket.asunto,ticket.estado?.id,ticket.admin?ticket.admin.id:null,ticket.cliente? ticket.cliente.id : null,ticket.usuario? ticket.usuario.id:null,ticket.id]);
        return this.getById(ticket);
    }
}