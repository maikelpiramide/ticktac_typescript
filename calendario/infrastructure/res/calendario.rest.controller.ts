import express, { Request, Response } from "express";
import { isAdmin, isAuth, isUser,isAdminOrUser } from "../../../context/security/auth";
import CalendarioUseCases from "../../application/calendario.usecases";
import CalendarioRepositoryMysql from "../data/mysql/calendario.repository.mysql";
import Rol from "../../../roles/domain/Rol";
import Admin from "../../../usuarios/domain/Admin";
import Usuario from "../../../usuarios/domain/Usuario";
import Cliente from "../../../usuarios/domain/Cliente";
import Calendario from "../../domain/Calendario";
import Evento from "../../../evento/domain/Evento";
import { DateTime } from "luxon";

const route = express.Router()

const calendarioUseCases:CalendarioUseCases = new CalendarioUseCases(new CalendarioRepositoryMysql())


const setDiferentHora = (hora:String)=>{
    const [h, m] = hora.split(":").map(Number);

    const date = new Date();
    date.setHours(h);
    date.setMinutes(m + 1); // Sumar un minuto

    // Formatear a "HH:mm"
    const hh = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");

    return `${hh}:${mm}`;
}

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

        res.json({error:false,eventos:eventos})

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al obtener el calendario del usuario';
        res.status(500).json({ error: true, message: errorMessage });
    }

})
route.post("/calendario/evento",isAuth,isAdminOrUser,async(req:Request,res:Response)=>{

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
        
        const fechaIniSet = DateTime.fromFormat(`${data.fechaIni} ${data.horaIni}`,"yyyy-MM-dd HH:mm",{zone:"Europe/Madrid"})

        const fechaFinSet = DateTime.fromFormat(`${data.fechaFin} ${data.horaFin == data.horaIni ? setDiferentHora(data.horaFin) : data.horaFin}`, 'yyyy-MM-dd HH:mm', { zone: 'Europe/Madrid' })

        const evento:Evento ={
            nombre:data.nombre,
            fechaIni:fechaIniSet.toJSDate(),
            fechaFin:fechaFinSet.toJSDate(),
            color:data.color
        }
        
        const eventoDb = await calendarioUseCases.setEvento(user,evento);
        //eventoDb.fechaFin = fechaFinSet;
        const eventoFormat={
            id:eventoDb.id,
            title:eventoDb.nombre,
            start:eventoDb.fechaIni,
            end:eventoDb.fechaFin,
            color:eventoDb.color
        }
        res.json({error:false,message:"Evento creado correctamente",data:eventoFormat})
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Error al crear el evento';
        res.status(500).json({ error: true, message: errorMessage });
    }
})

route.put("/calendario/evento",isAuth,isAdminOrUser,async(req:Request,res:Response)=>{


    const data = req.body

    const fechaIniSet = DateTime.fromFormat(`${data.fechaIni} ${data.horaIni}`,"yyyy-MM-dd HH:mm",{zone:"Europe/Madrid"})

    const fechaFinSet = DateTime.fromFormat(`${data.fechaFin} ${data.horaFin}`, 'yyyy-MM-dd HH:mm', { zone: 'Europe/Madrid' })
    const event:Evento= {
        id:data.id,
        fechaIni:fechaIniSet.toJSDate(),
        fechaFin:fechaFinSet.toJSDate(),
        nombre:data.nombre,
        color:data.color
    }

    try {
        
        const eventDb = await calendarioUseCases.updateEvento(event);
        const eventFormat = {
            id:eventDb.id,
            start:eventDb.fechaIni,
            end:eventDb.fechaFin,
            title:eventDb.nombre,
            color:eventDb.color
        }

        res.json({error:false,message:"Evento actualizado con éxito",data:eventFormat})
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al crear el evento';
        res.status(500).json({ error: true, message: errorMessage });
    }

})

route.delete("/calendario/evento",isAuth,isAdminOrUser,async(req:Request,res:Response)=>{

    const data = req.body

    const evento:Evento={
        id : data.id
    }

    try {

        const message = await calendarioUseCases.removeEvento(evento)
        res.json({error:false,message})
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error al crear el evento';
        res.status(500).json({ error: true, message: errorMessage });
    }

})
export {route}