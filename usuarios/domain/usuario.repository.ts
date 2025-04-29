import Admin from "./Admin";
import Cliente from "./Cliente";
import Usuario from "./Usuario";

export default interface UsuarioRepository {
    getByEmail(user: Usuario | Admin | Cliente): Promise<Usuario | Admin | Cliente | null>;
    registrarAdmin(admin: Admin): Promise<Admin>;
    crearUsuario(usuario: Usuario,admin:Admin): Promise<Usuario>;
    removeUsuario(usuario: Usuario): Promise<void>;
    getUsuarios(admin:Admin): Promise<Usuario[]>;
    updateUsuario(usuario: Usuario): Promise<Usuario>;
    syncCliente(cliente: Cliente,admin:Admin): Promise<Cliente>;
    comprobarNumClientes(admin:Admin): Promise<boolean>;
    crearCliente(cliente: Cliente,admin:Admin): Promise<Cliente>;
    removeCliente(cliente: Cliente,admin:Admin): Promise<void>;
    getClientes(admin:Admin): Promise<Cliente[]>;
    updateCliente(cliente: Cliente,admin:Admin): Promise<Cliente>;
    updatePerfil(usuario: Usuario | Admin | Cliente): Promise<Usuario | Admin | Cliente>;
}