import Admin from "./Admin";

export default interface Cliente{
    id?:number;
    nombre?:string;
    email?:string;
    rol?:string;
    administrador?:Admin;
}