import Admin from "../../../domain/Admin";
import UsuarioRepository from "../../../domain/usuario.repository";
import { getMySqlConnection } from "../../../../context/MysqlConnector";
import { ResultSetHeader } from "mysql2";
import Usuario from "../../../domain/Usuario";
import Cliente from "../../../domain/Cliente";
export default class UsuarioRepositoryMyslq implements UsuarioRepository {
    
    async registrarAdmin(admin: Admin): Promise<Admin> {
        const connection = getMySqlConnection();
        const [result]:any = await connection.query("INSERT INTO admin (email,password) VALUES (?,?)",[admin.email,admin.password])

        console.warn(result)
        return admin;
    }

    async getByEmail(user: Usuario | Admin | Cliente): Promise<Usuario | Admin | Cliente | null> {
        const connection = getMySqlConnection();
        if(user instanceof Admin){
            const [result]:any = await connection.query("SELECT * FROM admin WHERE email = ? ",[user.email])
            if(result.length === 0) return null
            const admin:Admin = {
                id:result[0].id,
                email:result[0].email,
                rol:result[0].rol,
                password:result[0].password
            }
            return admin;
        }
        if(user instanceof Cliente){
            const [result]:any = await connection.query("SELECT * FROM cliente WHERE email =? ",[user.email])
            if(result.length === 0) return null
            const cliente:Cliente = {
                id:result[0].id,
                email:result[0].email,
                password:result[0].password,
                rol:result[0].rol,
                nombre:result[0].nombre
            }
            return cliente;
        }
        if(user instanceof Usuario){
            const [result]:any = await connection.query("SELECT * FROM usuario WHERE email =? ",[user.email])
            if(result.length === 0) return null
            const usuario:Usuario = {
                id:result[0].id,
                email:result[0].email,
                password:result[0].password,
                rol:result[0].rol
            } 
            return usuario;
        }
        return null;

    }

}