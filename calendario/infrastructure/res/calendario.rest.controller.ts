import express, { Request, Response } from "express";
import { isAdmin, isAuth, isUser } from "../../../context/security/auth";
import CalendarioUseCases from "../../application/calendario.usecases";
import CalendarioRepositoryMysql from "../data/mysql/calendario.repository.mysql";
import { isUint16Array } from "util/types";
import Rol from "../../../roles/domain/Rol";
import Admin from "../../../usuarios/domain/Admin";
import Usuario from "../../../usuarios/domain/Usuario";
import Cliente from "../../../usuarios/domain/Cliente";
import Calendario from "../../domain/Calendario";
import Evento from "../../../evento/domain/Evento";


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
        const {id,nombre} = calendario;

        res.json({error:false,calendario:{id,nombre},eventos:eventos})

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al obtener el calendario del usuario';
        res.status(500).json({ error: true, message: errorMessage });
    }

})
route.post("/calendario/evento",isAuth,isAdmin || isUser,async(req:Request,res:Response)=>{

    const auth = req.body.auth
    const data = req.body
    const user = {
        id:auth.id,
        rol:auth.rol
    }

    switch(auth.rol){
        case Rol.ADMIN:
            user as Admin
            break;
        case Rol.USER:
            user as Usuario
            break;
        default:
            res.json({error:true,message:"Rol no autorizado"});
    }
    try{
        const fechaIniSet = new Date(`${data.fechaIni} ${data.horaIni}:00`)
        const fechaFinSet = new Date(`${data.fechaFin} ${data.horaFin}:00`)
        res.json({error:false,fechaFinSet,fechaIniSet})
        const evento:Evento ={
            nombre:data.nombre,
            fechaIni:data.fechaIni,
            fechaFin:data.fechaFin,
            color:data.color
        }
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Error al crear el evento';
        res.status(500).json({ error: true, message: errorMessage });
    }
})

export {route}