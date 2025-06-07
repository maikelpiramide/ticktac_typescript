import Admin from "../../usuarios/domain/Admin";
import Cliente from "../../usuarios/domain/Cliente";
import Usuario from "../../usuarios/domain/Usuario";
import Calendario from "../domain/Calendario";
import CalendarioRepository from "../domain/calendario.repository";

export default class CalendarioUseCases{


    constructor(private calendarioRepository:CalendarioRepository){

    }

    async getByUser(usuario:Usuario | Admin | Cliente):Promise<Calendario>{
        return await this.calendarioRepository.getByUser(usuario);
    }


}