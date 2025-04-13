import Admin from "../../../domain/Admin";
import UsuarioRepository from "../../../domain/usuario.repository";
import { getMySqlConnection } from "../../../../context/MysqlConnector";
import { ResultSetHeader } from "mysql2";
import Usuario from "../../../domain/Usuario";
import Cliente from "../../../domain/Cliente";
export default class UsuarioRepositoryMyslq implements UsuarioRepository {
    
    async registrarAdmin(admin: Admin): Promise<Admin> {
        const connection = getMySqlConnection();

        const [result]:any = await connection.query("INSERT INTO admin (nombre,email,password,id_plan,id_tipo_pago,inicio_plan) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP())",[admin.nombre,admin.email,admin.password,admin.plan?.id,admin.tipoPago?.id])

        console.warn(result)
        return admin;
    }

    async getByEmail(user: Usuario | Admin | Cliente): Promise<Usuario | Admin | Cliente | null> {
        const connection = getMySqlConnection();
    
            const [resultAdmin]:any = await connection.query("SELECT * FROM admin WHERE email = ? ",[user.email])
            if(resultAdmin.length > 0){
                const admin:Admin = {
                    id:resultAdmin[0].id,
                    email:resultAdmin[0].email,
                    rol:resultAdmin[0].rol,
                    password:resultAdmin[0].password
                }
                return admin;
            }
            
            const [resultCliente]:any = await connection.query("SELECT * FROM cliente WHERE email =? ",[user.email])
            if(resultCliente.length > 0){
                const cliente:Cliente = {
                    id:resultCliente[0].id,
                    email:resultCliente[0].email,
                    password:resultCliente[0].password,
                    rol:resultCliente[0].rol,
                    nombre:resultCliente[0].nombre
                }
                return cliente;
            }
            const [resultUser]:any = await connection.query("SELECT * FROM usuario WHERE email =? ",[user.email])
            if(resultUser.length > 0){
                const usuario:Usuario = {
                    id:resultUser[0].id,
                    email:resultUser[0].email,
                    password:resultUser[0].password,
                    rol:resultUser[0].rol
                } 
                return usuario;
            }
        return null;

    }
    
}