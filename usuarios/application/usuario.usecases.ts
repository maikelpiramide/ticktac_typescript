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
        if(!isPasswordValid) throw new Error("La contraseña es incorrecta")
        
        return usuario;
    }

}