import Admin from "../../../domain/Admin";
import UsuarioRepository from "../../../domain/usuario.repository";
import { getMySqlConnection } from "../../../../context/MysqlConnector";
import { ResultSetHeader } from "mysql2";
import Usuario from "../../../domain/Usuario";
import Cliente from "../../../domain/Cliente";
import Rol from "../../../../roles/domain/Rol";
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
        if(usuario.password !== null){
            const [result]:any = await connection.query("UPDATE usuario SET nombre =?, email =?, password =? WHERE id =?",[usuario.nombre, usuario.email, usuario.password,usuario.id]);
            if(!result.affectedRows) throw new Error("No se pudo actualizar el usuario");
            return usuario;
        }
        const [result]:any = await connection.query("UPDATE usuario SET nombre =?, email =? WHERE id =?",[usuario.nombre, usuario.email,usuario.id]);
        if(!result.affectedRows) throw new Error("No se pudo actualizar el usuario");
        return usuario;
        
    }

    async syncCliente(cliente: Cliente,admin:Admin): Promise<Cliente> {
        const connection = getMySqlConnection();

        const query = `
            SELECT c.email,ca.activo FROM cliente_admin AS ca
            JOIN cliente AS c
            ON c.id = ca.id_cliente
            WHERE ca.id_admin = ?
            and c.email = ?
            `

        const [comprueba]:any = await connection.query(query,[admin.id,cliente.email])
        console.log("COMPREBA",comprueba)
        if(comprueba.length > 0){
            if(comprueba[0].activo == 0){
                const [result]:any = await connection.query("update cliente_admin set activo =?, nombre_cliente = ? where id_admin =? and id_cliente =?", [true,cliente.nombre,admin.id,cliente.id]);
                if(!result.affectedRows) throw new Error("No se pudo actualizar el cliente");
                return cliente;
            }
        }

        const [result]:any = await connection.query("insert into cliente_admin (id_admin,id_cliente,nombre_cliente) values (?,?,?)",[admin.id,cliente.id,cliente.nombre]);
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
    
    async comprobarNumClientes(admin: Admin): Promise<boolean> {
        const planQuery = `
            SELECT p.clientes FROM admin a JOIN plan p ON a.id_plan = p.id WHERE a.id =?
        `;
        const [planResult]:any = await getMySqlConnection().query(planQuery, [admin.id]);
        if (planResult.length === 0) throw new Error("No se encontró el plan del administrador");
        const limiteClientes = planResult[0].clientes;

        const clientesQuery = `
            SELECT COUNT(*) as total FROM cliente_admin WHERE id_admin =? and activo =?
        `;
        const [clientesResult]:any = await getMySqlConnection().query(clientesQuery, [admin.id,true]);
        const clientesActuales = clientesResult[0].total;
        console.warn(clientesActuales,limiteClientes,clientesResult)
        return clientesActuales < limiteClientes;
    }

    async crearCliente(cliente: Cliente,admin:Admin): Promise<Cliente> {
        const connection = getMySqlConnection();
        const [result]:any = await connection.query("INSERT INTO cliente (nombre, email, password) VALUES (?,?,?)",[cliente.nombre, cliente.email, cliente.password]);
        if(!result.insertId) throw new Error("No se pudo crear el cliente");
        cliente.id = result.insertId;
        const [resultEnlace]:any = await connection.query("INSERT INTO cliente_admin (id_cliente,id_admin,nombre_cliente) VALUES (?,?,?)",[cliente.id, admin.id,cliente.nombre]);
        if(!resultEnlace.insertId) throw new Error("No se pudo crear el cliente");
        return cliente;
    }

    async getClientes(admin:Admin): Promise<Usuario[]> {
        const connection = getMySqlConnection();
        const query = `
            SELECT ca.id,cl.id as id_cliente, ca.nombre_cliente as nombre, cl.email FROM cliente_admin AS ca
            JOIN admin AS ad
            ON ad.id = ca.id_admin
            JOIN cliente AS cl
            ON cl.id = ca.id_cliente
            where ad.id = ?
            and ca.activo = 1
            
        `
        const [result]:any = await connection.query(query,admin.id);
        return result.map((usuario:any) => ({
            id:usuario.id,
            idCliente:usuario.id_cliente,
            nombre:usuario.nombre,
            email:usuario.email,
        }))
    }
    async removeCliente(cliente: Cliente,admin:Admin): Promise<void> {
        const connection = getMySqlConnection();
        const [result]:any = await connection.query("UPDATE cliente_admin SET activo =? WHERE id_cliente =? and id_admin = ?",[false,cliente.id,admin.id]);
        console.log(result)
        if(!result.affectedRows) throw new Error("No se pudo eliminar el cliente");
    }
    async updateCliente(cliente: Cliente,admin:Admin): Promise<Cliente> {
        const connection = getMySqlConnection();
        const c = await this.getByEmail(cliente)
        if(cliente.password !== null){
            const [result]:any = await connection.query("UPDATE cliente SET nombre =?, email =?, password =? WHERE id =?",[cliente.nombre, cliente.email,cliente.password,cliente.id]);
            if(!result.affectedRows) throw new Error("No se pudo actualizar el cliente");   
            const [resultEnlace]:any = await connection.query("UPDATE cliente_admin SET nombre_cliente =? WHERE id_cliente =? and id_admin =?",[cliente.nombre, cliente.id,admin.id]);
            if(!resultEnlace.affectedRows) throw new Error("No se pudo actualizar el cliente");
            return cliente;
        }
        if(c?.email !== cliente.email){
            const [result]:any = await connection.query("UPDATE cliente SET nombre =?, email =? WHERE id =?",[cliente.nombre, cliente.email,cliente.id]);
            if(!result.affectedRows) throw new Error("No se pudo actualizar el cliente");   
            const [resultEnlace]:any = await connection.query("UPDATE cliente_admin SET nombre_cliente =? WHERE id_cliente =? and id_admin =?",[cliente.nombre, cliente.id,admin.id]);
            if(!resultEnlace.affectedRows) throw new Error("No se pudo actualizar el cliente");
            return cliente;
        }
        const [result]:any = await connection.query("UPDATE cliente_admin SET nombre_cliente =? WHERE id_cliente =? and id_admin = ?",[cliente.nombre, cliente.id,admin.id]);
        console.warn(cliente)
        console.log(result)
        if(!result.affectedRows) throw new Error("No se pudo actualizar el cliente");
        return cliente;
    }
    async updatePerfil(usuario: Usuario | Admin | Cliente): Promise<Usuario | Admin | Cliente> {
        const connection = getMySqlConnection();
        console.warn( 'es admin: ', usuario.rol)
        if(usuario.rol == Rol.ADMIN){
            if(usuario.password !== null){
                const [result]:any = await connection.query("UPDATE admin SET nombre =?, email =?, password =? WHERE id =?",[usuario.nombre, usuario.email, usuario.password, usuario.id]);
                if(!result.affectedRows) throw new Error("No se pudo actualizar el admin");
                return usuario;
            }
            const [result]:any = await connection.query("UPDATE admin SET nombre =?, email =? WHERE id =?",[usuario.nombre, usuario.email, usuario.id]);
            if(!result.affectedRows) throw new Error("No se pudo actualizar el admin");
            return usuario;
        }
        if(usuario.rol == Rol.CLIENT){
            if(usuario.password !== null){
                const [result]:any = await connection.query("UPDATE cliente SET nombre =?, email =?, password =? WHERE id =?",[usuario.nombre, usuario.email, usuario.password, usuario.id]);
                if(!result.affectedRows) throw new Error("No se pudo actualizar el cliente");
                return usuario;
            }
            const [result]:any = await connection.query("UPDATE cliente SET nombre =?, email =? WHERE id =?",[usuario.nombre, usuario.email, usuario.id]);
            if(!result.affectedRows) throw new Error("No se pudo actualizar el cliente");
            return usuario;
        }
        
        if(usuario.password !== null){
            const [result]:any = await connection.query("UPDATE usuario SET nombre =?, email =?, password =? WHERE id =?",[usuario.nombre, usuario.email, usuario.password, usuario.id]);
            if(!result.affectedRows) throw new Error("No se pudo actualizar el usuario");
            return usuario;
        }
        const [result]:any = await connection.query("UPDATE usuario SET nombre =?, email =? WHERE id =?",[usuario.nombre, usuario.email, usuario.id]);
        if(!result.affectedRows) throw new Error("No se pudo actualizar el usuario");
        return usuario;
    }
    async getClientesByUser(usuario: Usuario): Promise<Cliente[]> {
        const connection = getMySqlConnection();
        const query = `
            SELECT ca.nombre_cliente,c.email,c.rol, c.id as id_cliente,ca.id FROM usuario AS u
            JOIN admin AS a 
            ON a.id = u.id_admin
            JOIN cliente_admin AS ca
            ON ca.id_admin = a.id
            JOIN cliente AS c
            ON c.id = ca.id_cliente
            WHERE ca.activo = ? AND u.id = ?
            GROUP BY ca.id
        `
        const [result]:any = await connection.query(query,[true,usuario.id]);
        return result.map((cliente:any) => ({
            id:cliente.id,
            idCliente:cliente.id_cliente,
            nombre:cliente.nombre_cliente,
            email:cliente.email,
            rol:cliente.rol,
        }))
    }
    async getAdminByUser(usuario: Usuario): Promise<Admin> {
        const connection = getMySqlConnection()
        const sql= `
            SELECT a.nombre,a.email,a.id FROM usuario AS u
            JOIN admin AS a 
            ON a.id = u.id_admin
            WHERE u.id = ?
        `
        const [result]:any = await connection.query(sql,[usuario.id])
        if(result.length == 0) throw new Error("no se ha poddido obtener el administrador del usuario");
        const admin:Admin = {
            id : result[0].id,
            nombre : result[0].nombre,
            email : result[0].email
        }

        return admin;
    }

}