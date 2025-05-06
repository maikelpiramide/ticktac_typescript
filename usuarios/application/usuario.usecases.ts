import { allowedNodeEnvironmentFlags } from "process"
import { hash,compare } from "../../context/security/encripted"
import Admin from "../domain/Admin"
import Usuario from "../domain/Usuario"
import UsuarioRepository from "../domain/usuario.repository"
import Cliente from "../domain/Cliente"
export default class UsuarioUseCases{

    constructor(private usuarioRepository:UsuarioRepository){}
    
    async registrarAdmnin(admin:Admin):Promise<Admin>{

        if(!admin.email) throw new Error("El usuario no tiene email")
        if(!admin.password) throw new Error("El usuario no tiene contraseña")

        const encriptedPassword = hash(admin.password)
        admin.password = encriptedPassword
        const usuarioRegistrado = await this.usuarioRepository.registrarAdmin(admin)
        return usuarioRegistrado
    }

    async getByEmail(user:Usuario | Admin | Cliente):Promise<Usuario | Admin | Cliente | null>{
        return await this.usuarioRepository.getByEmail(user);
    }

    async login(user:Usuario | Admin | Cliente):Promise<Usuario | Admin | Cliente | null>{

        if(!user.email) throw new Error("El usuario no tiene email")
        if(!user.password) throw new Error("El usuario no tiene contraseña")

        const usuario = await this.usuarioRepository.getByEmail(user)
        if(!usuario) throw new Error("El usuario no existe")
        
        const isPasswordValid = compare(user.password,String(usuario.password))
        if(!isPasswordValid) throw new Error("Usuario y/o contraseña incorrectos")
        
        return usuario;
    }

    async crearUsuario(usuario: Usuario,admin:Admin): Promise<Usuario> {
        if(!usuario.email) throw new Error("El usuario no tiene email")
        if(!usuario.password) throw new Error("El usuario no tiene contraseña")
        if(!usuario.nombre) throw new Error("El usuario no tiene nombre")

        const encriptedPassword = hash(usuario.password)
        usuario.password = encriptedPassword
        
        return await this.usuarioRepository.crearUsuario(usuario,admin)
    }
    async updateUsuario(usuario: Usuario): Promise<Usuario> {
        return await this.usuarioRepository.updateUsuario(usuario);
    }

    async getUsuarios(admin:Admin):Promise<Usuario[]>{
        return await this.usuarioRepository.getUsuarios(admin)
    }
    async removeUsuario(usuario:Usuario):Promise<void>{
        await this.usuarioRepository.removeUsuario(usuario)
    }

    async syncCliente(cliente:Cliente,usuario:Admin):Promise<Usuario>{
        return await this.usuarioRepository.syncCliente(cliente,usuario)
    }

    async comprobarNumClientes(admin:Admin):Promise<boolean>{
        return await this.usuarioRepository.comprobarNumClientes(admin)
    }

    async crearCliente(cliente:Cliente,usuario:Admin):Promise<Cliente>{
        if(!cliente.email) throw new Error("El cliente no tiene email")
        if(!cliente.password) throw new Error("El cliente no tiene contraseña")
        if(!cliente.nombre) throw new Error("El cliente no tiene nombre")

        const canCrate = await this.comprobarNumClientes(usuario)
        console.warn(canCrate)
        if(!canCrate) throw new Error("No se puede crear más clientes con el plan actual")

        const clienteExistente = await this.usuarioRepository.getByEmail(cliente)
        if(clienteExistente){
            clienteExistente.nombre = cliente.nombre
            return await this.syncCliente(clienteExistente as Cliente,usuario);
        }
        const encriptedPassword = hash(cliente.password)
        cliente.password = encriptedPassword
        return await this.usuarioRepository.crearCliente(cliente,usuario)
    }

    async getClientes(admin:Admin):Promise<Cliente[]>{
        return await this.usuarioRepository.getClientes(admin)
    }

    async removeCliente(cliente:Cliente,admin:Admin):Promise<void>{
        await this.usuarioRepository.removeCliente(cliente,admin);
    }
    
    async updateCliente(cliente:Cliente,admin:Admin):Promise<Cliente>{
        return await this.usuarioRepository.updateCliente(cliente,admin);
    }
    async updatePerfil(usuario: Usuario | Admin | Cliente): Promise<Usuario | Admin | Cliente> {
        if(usuario.password != null) usuario.password = hash(usuario.password)
        return await this.usuarioRepository.updatePerfil(usuario);
    }
}