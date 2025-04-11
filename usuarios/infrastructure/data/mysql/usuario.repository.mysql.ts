import Admin from "../../../domain/Admin";
import UsuarioRepository from "../../../domain/usuario.repository";

export default class UsuarioRepositoryMyslq implements UsuarioRepository {
    async registrarAdmin(admin: Admin): Promise<Admin> {
        return admin;
    }
}