import express,{Request,Response} from "express"
import { createTokenUser,createTokenClient } from "../../../context/security/auth"
import UsuarioRepositoryMyslq from "../data/mysql/usuario.repository.mysql"
import UsuarioUseCases from "../../application/usuario.usecases"
import Admin from "../../domain/Admin"

const usuarioUseCases:UsuarioUseCases = new UsuarioUseCases(new UsuarioRepositoryMyslq()) 

const router = express.Router()

router.post("/admin/registro",async(req:Request,res:Response)=>{
    const admin:Admin = req.body
    try {
        
        const adminRegistrado = await usuarioUseCases.registrarAdmnin(admin)
        
        res.status(201).json({error:false,message:"Admin registrado",data:adminRegistrado})
    } catch (error) {
        res.status(500).json({error:true,message:error})
    }

})

router.post("/admin/registro/isExist",async(req:Request,res:Response)=>{
    const admin:Admin = req.body
    try {
        const existe = await usuarioUseCases.getByEmail(admin)
        if(existe) res.status(500).json({error:true,message:"Admin existe"})
        else res.status(200).json({error:false,message:"Admin no existe"})
    }catch(error){
        res.status(500).json({error:true,message:error})
    }
})

export {router}