import Admin from "./Admin";

export default interface Usuario {
    id?: number;
    nombre?: string;
    email?: string;
    password?:string;
    rol?: string;
    administrador?: Admin;
}