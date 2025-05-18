import { Connection } from "mysql2/promise";
import { getMySqlConnection } from "../../../../context/MysqlConnector";
import Mensaje from "../../../domain/Mensaje";
import MensajeRepository from "../../../domain/mensaje.repository";
import Ticket from "../../../../ticket/domain/Ticket";
import Usuario from "../../../../usuarios/domain/Usuario";

export default class MensajeMySQLRepository implements MensajeRepository {

    constructor() {

    }
    /*SELECT m.*, 
  CASE m.tipo_autor 
    WHEN 'ADMIN' THEN (SELECT nombre FROM admin WHERE id = m.id_autor)
    WHEN 'USER' THEN (SELECT nombre FROM usuario WHERE id = m.id_autor)
    WHEN 'CLIENT' THEN (SELECT nombre FROM cliente WHERE id = m.id_autor)
  END as nombre_autor
FROM mensaje m
WHERE m.id_ticket = ?*/
    async getAllByTicket(ticket: Ticket): Promise<Mensaje[]> {
        const connection = getMySqlConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT m.*, u.id as autor_id, u.nombre as autor_nombre FROM mensajes m INNER JOIN usuarios u ON m.autor_id = u.id WHERE m.ticket_id = ?',
                [ticket.id]
            );

            return (rows as any[]).map(row => {
                const mensaje = new Mensaje();
                mensaje.id = row.id;
                mensaje.texto = row.texto;
                mensaje.ts = row.ts;
                mensaje.ticket = ticket;
                
                const autor = new Usuario();
                autor.id = row.autor_id;
                autor.nombre = row.autor_nombre;
                mensaje.autor = autor;

                return mensaje;
            });
        } catch (error) {
            throw new Error('Error al obtener los mensajes del ticket');
        }
    }

    async crearMensaje(mensaje: Mensaje): Promise<any> {
        const connection = getMySqlConnection();
        try {
            const [result] = await connection.execute(
                'INSERT INTO mensajes (texto, autor, id_ticket,id_autor, ts) VALUES (?, ?, ?, ?,NOW())',
                [mensaje.texto, mensaje.autor, mensaje.ticket?.id,mensaje.autor?.id]
            );

            return result;
        } catch (error) {
            throw new Error('Error al crear el mensaje');
        }
    }
}