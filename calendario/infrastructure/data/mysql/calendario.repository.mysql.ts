import CalendarioRepository from "../../../domain/calendario.repository";
import { getMySqlConnection } from "../../../../context/MysqlConnector";
import Admin from "../../../../usuarios/domain/Admin";
import Cliente from "../../../../usuarios/domain/Cliente";
import Usuario from "../../../../usuarios/domain/Usuario";
import Calendario from "../../../domain/Calendario";
import Rol from "../../../../roles/domain/Rol";
import Evento from "../../../../evento/domain/Evento";

export default class CalendarioRepositoryMysql implements CalendarioRepository{


    async getByUser(usuario: Usuario | Admin | Cliente): Promise<Calendario> {
        const connection = getMySqlConnection()
        let query = ``
        switch(usuario.rol){
            case Rol.ADMIN:
                   query =  `SELECT e.*,c.id as id_calendario,c.nombre as nombre_calendario FROM admin AS a
                    JOIN calendario AS c
                    ON c.id = a.id_calendario
                    JOIN evento AS e
                    ON e.id_calendario = c.id
                    where a.id = ?
                    `
                break;
            case Rol.USER:
                query =  `SELECT e.*,c.id as id_calendario,c.nombre as nombre_calendario FROM usuario AS u
                    JOIN calendario AS c
                    ON c.id = u.id_calendario
                    JOIN evento AS e
                    ON e.id_calendario = c.id
                    where u.id = ?
                `
                break;
            case Rol.USER:
                query =  `SELECT e.*,c.id as id_calendario,c.nombre as nombre_calendario FROM cliente AS cl
                    JOIN calendario AS c
                    ON c.id = cl.id_calendario
                    JOIN evento AS e
                    ON e.id_calendario = c.id
                    WHERE cl.id = ?
                `
                break;
            default:
                throw new Error("No se ha podido obtener la informacion del usuario")
        }
        const [rows]:any = await connection.query(query,[usuario.id]);

        let calendario:Calendario = {
            id:rows[0].id_calendario,
            nombre:rows[0].nombre_calendario,
        }

        let eventos:Evento[] = new Array()

        rows.forEach((r:any)=>{
            const e:Evento = {
                id:r.id,
                fechaIni:r.fecha_ini,
                fechaFin:r.fecha_fin,
                nombre:r.nombre,
                color:r.color
            }   
            eventos.push(e)
        })
        calendario.eventos = eventos
        //console.warn("datos calendario",rows,eventos,calendario)
        return calendario;
    }

}