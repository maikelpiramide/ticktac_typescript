import Evento from "../../evento/domain/Evento";

export default interface Calendario{
    id?:Number,
    nombre?:String,
    eventos?:Evento[]
}