import { hash,compare } from "../../context/security/encripted"
import Admin from "../domain/Admin"
import Usuario from "../domain/Usuario"
import UsuarioRepository from "../domain/usuario.repository"
export default class UsuarioUseCases{

    private usuarioRepository:UsuarioRepository

    constructor(usuarioRepository:UsuarioRepository){
        this.usuarioRepository = usuarioRepository 
    }
    
    async registrarAdmnin(admin:Admin):Promise<Admin>{

        if(!admin.email) throw new Error("El usuario no tiene email")
        if(!admin.password) throw new Error("El usuario no tiene contraseña")

        const encriptedPassword = hash(admin.password)
        admin.password = encriptedPassword
        const usuarioRegistrado = await this.usuarioRepository.registrarAdmin(admin)
        return usuarioRegistrado
    }

}