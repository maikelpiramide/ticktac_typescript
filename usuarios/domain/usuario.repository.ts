import Admin from "./Admin";
import Cliente from "./Cliente";
import Usuario from "./Usuario";

export default interface UsuarioRepository {
    getByEmail(user: Usuario | Admin | Cliente): Promise<Usuario | Admin | Cliente | null>;
    registrarAdmin(admin: Admin): Promise<Admin>;
}