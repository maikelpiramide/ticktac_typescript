import { Connection } from "mysql2/promise";
import { getMySqlConnection } from "../../../../context/MysqlConnector";
import Mensaje from "../../../domain/Mensaje";
import MensajeRepository from "../../../domain/mensaje.repository";
import Ticket from "../../../../ticket/domain/Ticket";
import Usuario from "../../../../usuarios/domain/Usuario";
import Admin from "../../../../usuarios/domain/Admin";
import Cliente from "../../../../usuarios/domain/Cliente";

export default class MensajeMySQLRepository implements MensajeRepository {

    async getByTicket(ticket: Ticket,usuario:Usuario | Admin | Cliente): Promise<Mensaje[]> {
        const connection = getMySqlConnection();
        try {

            const [rows] = await connection.execute(
                'SELECT * from mensaje where id_ticket = ?',
                [ticket.id]
            );

            return (rows as Mensaje[]).map(row => {
                const mensaje:Mensaje = {
                    id: row.id,
                    texto: row.texto,
                    autor: row.autor,
                    ticket: ticket,
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