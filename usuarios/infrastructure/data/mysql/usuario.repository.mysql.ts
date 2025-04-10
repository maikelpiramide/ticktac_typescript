import UsuarioRepository from "../../../domain/usuario.repository";

export default class UsuarioRepositoryMyslq implements UsuarioRepository {
    async registrar(usuario: any): Promise<any> {
        return usuario;
    }
}