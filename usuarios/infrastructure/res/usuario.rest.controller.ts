import express,{Request,Response} from "express"
import { createTokenUser,createTokenClient } from "../../../context/security/auth"
import UsuarioRepositoryMyslq from "../data/mysql/usuario.repository.mysql"
import UsuarioUseCases from "../../application/usuario.usecases"
import Admin from "../../domain/Admin"
import { Plan } from "../../../planes/domain/Plan"
import Usuario from "../../domain/Usuario"
import Cliente from "../../domain/Cliente"

const usuarioUseCases:UsuarioUseCases = new UsuarioUseCases(new UsuarioRepositoryMyslq()) 

const router = express.Router()

router.post("/admin/registro/isExist",async(req:Request,res:Response)=>{
    const admin:Admin = req.body
    try {
        const existe = await usuarioUseCases.getByEmail(admin)
        if(existe) res.status(500).json({error:true,message:"Ya hay un usuario registrado con ese email"})
        else res.status(200).json({error:false,message:"Admin no existe"})
    }catch(error){
        res.status(500).json({error:true,message:error})
    }
})

router.post("/login",async(req:Request,res:Response)=>{
    const user:Admin | Usuario | Cliente = req.body
    try {
        const userLogueado:Admin | Usuario | Cliente | null = await usuarioUseCases.login(user)
        if(!userLogueado) res.status(500).json({error:true,message:"Usuario no existe"});
        let token: string;
        if(userLogueado) {
            if ('rol' in userLogueado && userLogueado.rol === 'CLIENT') {
                token = createTokenClient(userLogueado as Cliente);
            } else {
                token = createTokenUser(userLogueado as Usuario | Admin);
            }
            const {email,nombre}=userLogueado
            res.status(200).json({error:false,message:"Usuario logeado correctamente",token:token,data:{email,nombre}})  
        }
    } catch (error) {
        console.log(error)
        const errorMessage = error instanceof Error ? error.message : 'Error en el inicio de sesión';
        res.status(500).json({error:true,message:errorMessage}) 
    }
})
router.post("/admin/registro",async(req:Request,res:Response)=>{
    const data = req.body
    const plan:Plan ={
        id:data.plan.id,
    }
    const tipoPago = {
        id:data.tipoPago.id
    }
    const admin:Admin = {
        email:data.user.email,
        password:data.user.password,
        nombre:data.user.nombre,
        plan:plan,
        tipoPago:tipoPago,
    }
    try {
        
        const adminRegistrado = await usuarioUseCases.registrarAdmnin(admin)
        
        res.status(201).json({error:false,message:"Su cuenta ha sido registrada correctamente",data:adminRegistrado})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:true,message:error})
    }

})



export {router}