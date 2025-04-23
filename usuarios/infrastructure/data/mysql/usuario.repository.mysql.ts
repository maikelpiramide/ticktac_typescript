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

    async crearUsuario(usuario: Usuario,admin:Admin): Promise<Usuario> {
        const connection = getMySqlConnection();

        // Obtener el plan actual del admin y el número de usuarios
        
        const [planResult]:any = await connection.query("SELECT p.usuarios FROM admin a JOIN plan p ON a.id_plan = p.id WHERE a.id = ?", [admin.id]);
        const [usuariosCount]:any = await connection.query("SELECT COUNT(*) as total FROM usuario WHERE id_admin = ? and activo = ?", [admin.id,true]);
        console.log(planResult,usuariosCount)
        if (planResult.length === 0) throw new Error("No se encontró el plan del administrador");
        
        const limiteUsuarios = planResult[0].usuarios;
        const usuariosActuales = usuariosCount[0].total;

        if (usuariosActuales >= limiteUsuarios) {
            throw new Error(`No puede crear más usuarios. Su plan actual tiene un límite de ${limiteUsuarios} usuarios`);
        }

        const user = await this.getByEmail(usuario)
        if(user){
            const [userResult]:any = await connection.query("update usuario set activo = ? where email = ?", [true,user.email]);
            if(!userResult.affectedRows) throw new Error("No se pudo actualizar el usuario");
            return user;
        };

        const [result]:any = await connection.query("INSERT INTO usuario (nombre, email, password,id_admin) VALUES (?,?,?,?)",[usuario.nombre, usuario.email, usuario.password,admin.id]);
        if(!result.insertId) throw new Error("No se pudo crear el usuario");
        usuario.id = result.insertId;
        return usuario;
    }
    async updateUsuario(usuario: Usuario): Promise<Usuario> {
        const connection = getMySqlConnection();
        const [result]:any = await connection.query("UPDATE usuario SET nombre =?, email =?, password =? WHERE id =?",[usuario.nombre, usuario.email, usuario.password,usuario.id]);
        if(!result.affectedRows) throw new Error("No se pudo actualizar el usuario");
        return usuario;
    }

    async syncCliente(cliente: Cliente,admin:Admin): Promise<Cliente> {
        const connection = getMySqlConnection();

        const [result]:any = await connection.query("insert into cliente_admin (id_admin,id_cliente) values (?,?)",[admin.id,cliente.id]);
        if(!result.insertId) throw new Error("No se pudo crear el cliente");    
        return cliente;
    }

    async getByEmail(user: Usuario | Admin | Cliente): Promise<Usuario | Admin | Cliente | null> {
        const connection = getMySqlConnection();
    
            const [resultAdmin]:any = await connection.query("SELECT * FROM admin WHERE email = ? ",[user.email])
            if(resultAdmin.length > 0){
                const admin:Admin = {
                    id:resultAdmin[0].id,
                    email:resultAdmin[0].email,
                    nombre:resultAdmin[0].nombre,
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
                    nombre:resultUser[0].nombre,
                    email:resultUser[0].email,
                    password:resultUser[0].password,
                    rol:resultUser[0].rol
                }
                return usuario;
            }
        return null;

    }
    
    async getUsuarios(admin:Admin): Promise<Usuario[]> {
        const connection = getMySqlConnection();
        const [result]:any = await connection.query("SELECT * FROM usuario where id_admin =? and activo = ?",[admin.id,true]);
        return result.map((usuario:any) => ({
            id:usuario.id,
            nombre:usuario.nombre,
            email:usuario.email,  
        }))
    }

    async removeUsuario(usuario: Usuario): Promise<void> {
        const connection = getMySqlConnection();
        const [result]:any = await connection.query("UPDATE usuario SET activo =? WHERE id =?",[false,usuario.id]);
        if(!result.affectedRows) throw new Error("No se pudo eliminar el usuario");
    }
    
    async crearCliente(cliente: Cliente,admin:Admin): Promise<Cliente> {
        const connection = getMySqlConnection();
        const [result]:any = await connection.query("INSERT INTO cliente (nombre, email, password) VALUES (?,?,?)",[cliente.nombre, cliente.email, cliente.password]);
        if(!result.insertId) throw new Error("No se pudo crear el cliente");
        cliente.id = result.insertId;
        const [resultEnlace]:any = await connection.query("INSERT INTO cliente_admin (id_cliente,id_admin) VALUES (?,?)",[cliente.id, admin.id]);
        if(!resultEnlace.insertId) throw new Error("No se pudo crear el cliente");
        return cliente;
    }

    async getClientes(admin:Admin): Promise<Usuario[]> {
        const connection = getMySqlConnection();
        const [result]:any = await connection.query("SELECT * FROM admin_clieinte where id_admin =?",admin.id);
        return result.map((usuario:any) => ({
            id:usuario.id,
            nombre:usuario.nombre,
            email:usuario.email,  
        }))
    }
}