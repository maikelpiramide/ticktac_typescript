import { Connection } from "mysql2/promise";
import { getMySqlConnection } from "../../../../context/MysqlConnector";
import Mensaje from "../../../domain/Mensaje";
import MensajeRepository from "../../../domain/mensaje.repository";
import Ticket from "../../../../ticket/domain/Ticket";
import Usuario from "../../../../usuarios/domain/Usuario";
import Admin from "../../../../usuarios/domain/Admin";
import Cliente from "../../../../usuarios/domain/Cliente";

export default class MensajeMySQLRepository implements MensajeRepository {

    async getByTicket(ticket: Ticket): Promise<Mensaje[]> {
        const connection = getMySqlConnection();
        try {
            const query = `
                SELECT m.id,m.autor,m.texto,m.id_autor,m.ts,
                case
                    when m.autor = "ADMIN" then a.email
                    when m.autor = "USER" then u.email
                    when m.autor = "CLIENT" then c.email
                ELSE null
                END AS email_autor
                FROM mensaje AS m
                left JOIN usuario AS u
                ON u.id = m.id_autor
                left JOIN admin AS a 
                ON a.id = m.id_autor
                left JOIN cliente AS c
                ON c.id = m.id_autor
                WHERE m.id_ticket = ?
            `
            const [rows]:any = await connection.query(query,[ticket.id]);  

            rows.forEach((row:any) => {
                switch (row.autor) {
                    case 'ADMIN':
                        const admin: Admin = {
                            id: row.id_autor,
                            email: row.email_autor
                        };
                        row.autor = admin;
                        break;
                    case 'CLIENT':
                        const cliente: Cliente = {
                            id: row.id_autor,
                            email: row.email_autor
                        };
                        row.autor = cliente;
                        break;
                    case 'USER':
                        const usuario: Usuario = {
                            id: row.id_autor,
                            email: row.email_autor
                        };
                        row.autor = usuario;
                        break;
                }
            })

            return (rows as Mensaje[]).map(row => {
                
                const mensaje:Mensaje = {
                    id: row.id,
                    texto: row.texto,
                    autor: row.autor,
                    ts: row.ts
                };

                return mensaje;
            });
        } catch (error) {
            throw new Error('Error al obtener los mensajes del ticket');
        }
    }

    async crearMensaje(mensaje: Mensaje): Promise<any> {
        const connection = getMySqlConnection();
        try {
            //console.log("en el menaje repository: ", mensaje)
            const [result] = await connection.execute(
                'INSERT INTO mensaje (texto, autor, id_ticket,id_autor, ts) VALUES (?, ?, ?, ?,NOW())',
                [mensaje.texto, mensaje.autor?.rol, mensaje.ticket?.id,mensaje.autor?.id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al crear el mensaje');
        }
    }
}