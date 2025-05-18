import Admin from "./Admin";

export default class Cliente{
    id?:number;
    nombre?:string;
    password?:string;
    email?:string;
    rol?:string;
    administradores?:Admin[];
}