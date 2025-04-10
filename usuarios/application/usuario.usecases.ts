import { hash,compare } from "../../context/security/encripted"
import Usuario from "../domain/Usuario"
import UsuarioRepository from "../domain/usuario.repository"
export default class UsuarioUseCases{

    private usuarioRepository:UsuarioRepository
    constructor(usuarioRepository:UsuarioRepository){
        this.usuarioRepository = usuarioRepository 
    }
    async registrar(usuario:any):Promise<Usuario>{

        if(!usuario.email) throw new Error("El usuario no tiene email")
        if(!usuario.password) throw new Error("El usuario no tiene contraseña")
        const usuarioEncriptado = hash(usuario.password)
        usuario.password = usuarioEncriptado
        const usuarioRegistrado = await this.usuarioRepository.registrar(usuario)
        return usuarioRegistrado
    }

}