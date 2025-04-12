import Admin from "./Admin";

export default class Usuario {
    id?: number;
    nombre?: string;
    email?: string;
    password?:string;
    rol?: string;
    administrador?: Admin;
}