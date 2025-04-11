import Admin from "./Admin";
import Usuario from "./Usuario";

export default interface UsuarioRepository {
    
    registrarAdmin(admin: Admin): Promise<Admin>;
}