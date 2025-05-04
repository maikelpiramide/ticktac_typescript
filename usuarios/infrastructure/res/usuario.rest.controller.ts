import express,{Request,Response} from "express"
import { createTokenUser,createTokenClient, isAuth, isAdmin,isUser } from "../../../context/security/auth"
import UsuarioRepositoryMyslq from "../data/mysql/usuario.repository.mysql"
import UsuarioUseCases from "../../application/usuario.usecases"
import Admin from "../../domain/Admin"
import { Plan } from "../../../planes/domain/Plan"
import Usuario from "../../domain/Usuario"
import Cliente from "../../domain/Cliente"
import Rol from "../../../roles/domain/Rol"

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
            res.status(200).json({error:false,message:"Usuario logeado correctamente",token:token})  
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

router.post("/admin/usuario",isAuth,isAdmin,async(req:Request,res:Response)=>{
    const data = req.body
    const auth = req.body.auth
    const admin:Admin = {
       id:auth.id,
       email:auth.email 
    }
    const usuario:Usuario = {
       nombre:data.nombre,
       email:data.email,
       password:data.password, 
    }
    try {
        const usuarioRegistrado = await usuarioUseCases.crearUsuario(usuario,admin)
        const {id,email,nombre}=usuarioRegistrado
        res.status(201).json({error:false,message:"Usuario registrado correctamente",data:{id,email,nombre}})
    } catch (error) {
        console.log(error)
        const errorMessage = error instanceof Error ? error.message : 'Error al registrar el usuario';
        res.status(500).json({error:true,message:errorMessage})
    }
})

router.get("/admin/usuarios",isAuth,isAdmin,async(req:Request,res:Response)=>{
    const admin:Admin = req.body.auth
    try {
        const usuarios = await usuarioUseCases.getUsuarios(admin)
        res.status(200).json({error:false,message:"Usuarios obtenidos correctamente",data:usuarios})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:true,message:error}) 
    }
})
router.delete("/admin/usuario",isAuth,isAdmin,async(req:Request,res:Response)=>{
    const data = req.body
    const usuario:Usuario = {
        id:data.id,
    }
    try {
        await usuarioUseCases.removeUsuario(usuario)
        res.status(200).json({error:false,message:"Usuario eliminado correctamente"})
    }catch(error){
        console.log(error)
        const errorMessage = error instanceof Error? error.message : 'Error al eliminar el usuario, intentelo de nuevo más tarde';
        res.status(500).json({error:true,message:errorMessage})
    }
})
router.put("/admin/usuario",isAuth,isAdmin,async(req:Request,res:Response)=>{
    const data = req.body
    const usuario:Usuario = {
        id:data.id,
        nombre:data.nombre,
        email:data.email,
        password:data.password ?? null,
    }
    // res.json(usuario)
    try {
         const userdb:Usuario = await usuarioUseCases.updateUsuario(usuario)
         const {id,email,nombre}=userdb
        res.status(200).json({error:false,message:"Usuario actualizado correctamente",data:{id,email,nombre}})
    }catch(error){
        console.log(error)
        const errorMessage = error instanceof Error? error.message : 'Error al actualizar el usuario, intentelo de nuevo más tarde';
        res.status(500).json({error:true,message:errorMessage})
    }
})

router.get("/admin/clientes",isAuth,isAdmin,async(req:Request,res:Response)=>{
      const auth = req.body.auth
      const admin:Admin = {
         id:auth.id,
         email:auth.email
      }
      try {
          const clientes = await usuarioUseCases.getClientes(admin)
          res.status(200).json({error:false,message:"Clientes obtenidos correctamente",data:clientes})
      }catch(error){
          console.log(error)
          const errorMessage = error instanceof Error? error.message : 'No se ha podido obtener los clientes, intentelo de nuevo más tarde';
          res.status(500).json({error:true,message:error})
      }
})

router.post("/admin/cliente",isAuth,isAdmin,async(req:Request,res:Response)=>{
    const data = req.body
    const auth = req.body.auth
    const admin:Admin = {
       id:auth.id,
       email:auth.email 
    }
    const cliente:Cliente = {
       nombre:data.nombre,
       email:data.email,
       password:data.password,
    }
    try {
        const clienteRegistrado = await usuarioUseCases.crearCliente(cliente,admin)
        const {id,email,nombre}=clienteRegistrado
        res.status(201).json({error:false,message:"Cliente registrado correctamente",data:{id,email,nombre}})
    }catch(error){
        console.log(error)
        const errorMessage = error instanceof Error? error.message : 'Error al registrar el cliente, intentelo de nuevo más tarde';
        res.status(500).json({error:true,message:errorMessage})
    }
})

router.delete("/admin/cliente",isAuth,isAdmin,async(req:Request,res:Response)=>{
    const data = req.body
    const cliente:Cliente = {
        id:data.id,
    }
    const auth = req.body.auth
    const admin:Admin = {
       id:auth.id,
       email:auth.email
    }
    
    try {
        await usuarioUseCases.removeCliente(cliente,admin)
        res.status(200).json({error:false,message:"Cliente eliminado correctamente"})
    }catch(error){
        console.log(error)
        const errorMessage = error instanceof Error? error.message : 'Error al eliminar el cliente, intentelo de nuevo más tarde';
        res.status(500).json({error:true,message:errorMessage})
    }

})
router.put("/admin/cliente",isAuth,isAdmin,async(req:Request,res:Response)=>{
    const data = req.body
    const cliente:Cliente = {
        id:data.id,
        nombre:data.nombre,
        email:data.email,
        password:data.password?? null,
    }
    const auth = req.body.auth
    const admin:Admin = {
       id:auth.id,
       email:auth.email
    }
    try {
        const clientedb:Cliente = await usuarioUseCases.updateCliente(cliente,admin)
        const {id,email,nombre}=clientedb
        res.status(200).json({error:false,message:"Cliente actualizado correctamente",data:{id,email,nombre}})
    }catch(error){
        console.log(error)
        const errorMessage = error instanceof Error? error.message : 'Error al actualizar el cliente, intentelo de nuevo más tarde';
        res.status(500).json({error:true,message:errorMessage})
    }
})
router.put("/profile",isAuth,async(req:Request,res:Response)=>{
    const data = req.body
    
    const usuario:Usuario | Admin | Cliente = {
        id:data.auth.id,
        nombre:data.nombre,
        email:data.email,
        password:data.password?? null,
    }
    try {
        let userdb:Usuario | Admin | Cliente;
        let token = null;
        if(req.body.auth.rol === Rol.ADMIN){
            userdb = await usuarioUseCases.updatePerfil(usuario as Admin)
            token = createTokenUser(userdb as Admin)
        }
        if(req.body.auth.rol === Rol.CLIENT){
            userdb = await usuarioUseCases.updatePerfil(usuario as Cliente)
            token = createTokenClient(userdb as Cliente)
        }
        if(req.body.auth.rol === Rol.USER){
            userdb = await usuarioUseCases.updatePerfil(usuario as Usuario)
            token = createTokenUser(userdb as Usuario)
        }
        
        res.status(200).json({error:false,message:"Usuario actualizado correctamente",token})
    }catch(error){
        console.log(error)
        const errorMessage = error instanceof Error? error.message : 'Error al actualizar el usuario, intentelo de nuevo más tarde';
        res.status(500).json({error:true,message:errorMessage})
    }
})
export {router}