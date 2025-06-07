import express, { Request, Response } from "express";
import { isAuth } from "../../../context/security/auth";
import CalendarioUseCases from "../../application/calendario.usecases";
import CalendarioRepositoryMysql from "../data/mysql/calendario.repository.mysql";
import { isUint16Array } from "util/types";
import Rol from "../../../roles/domain/Rol";
import Admin from "../../../usuarios/domain/Admin";
import Usuario from "../../../usuarios/domain/Usuario";
import Cliente from "../../../usuarios/domain/Cliente";
import Calendario from "../../domain/Calendario";


const route = express.Router()

const calendarioUseCases:CalendarioUseCases = new CalendarioUseCases(new CalendarioRepositoryMysql())

route.get("/calendario",isAuth,async(req:Request,res:Response)=>{

    const auth = req.body.auth

    const user = {
        id:auth.id,
        rol:auth.rol
    }

    switch(user.rol){
        case Rol.ADMIN:
            user as Admin
            break;
        case Rol.USER:
            user as Usuario
            break;
        case Rol.CLIENT:
            user as Cliente;
            break;
        default:
            res.json({error:true,messaje:"El usuario no tiene un rol válido"})
    }

    try {

        const calendario:Calendario = await calendarioUseCases.getByUser(user);

        if(!calendario) throw new Error("No se ha podido obtener el calendario del usuario")
        
        const eventos = calendario.eventos?.map((evento)=>({
            id:evento.id,
            title:evento.nombre,
            start:evento.fechaIni,
            end:evento.fechaFin,
            color:evento.color
        }))

        res.json({error:false,data:eventos})

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al obtener el calendario del usuario';
        res.status(500).json({ error: true, message: errorMessage });
    }


})

export {route}