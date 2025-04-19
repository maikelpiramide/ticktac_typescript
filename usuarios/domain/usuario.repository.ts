import Admin from "./Admin";
import Cliente from "./Cliente";
import Usuario from "./Usuario";

export default interface UsuarioRepository {
    getByEmail(user: Usuario | Admin | Cliente): Promise<Usuario | Admin | Cliente | null>;
    registrarAdmin(admin: Admin): Promise<Admin>;
    crearUsuario(usuario: Usuario,admin:Admin): Promise<Usuario>;
    syncCliente(cliente: Cliente,usuario:Admin | Usuario): Promise<Usuario>;
    getUsuarios(admin:Admin): Promise<Usuario[]>;
}