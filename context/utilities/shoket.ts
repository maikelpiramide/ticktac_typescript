import { Server } from "socket.io";
import http from "http";
import Rol from "../../roles/domain/Rol";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // En producción, especifica los orígenes permitidos
      //methods: ["GET", "POST"]
    },
   
  });

  io.on("connection", (socket) => {
    console.log("Usuario conectado", socket.id);

    socket.on("join-user-room", (user: any) => {
      if(user.rol == Rol.ADMIN)
      {
        socket.join(`admin-${user.id}`);
        console.log(`Socket ${socket.id} joined room admin-${user.id}`);
      }

      if(user.rol == Rol.USER)
      {
        socket.join(`user-${user.id}`);
        console.log(`Socket ${socket.id} joined room user-${user.id}`);
      }

      if(user.rol == Rol.CLIENT)
      {
        socket.join(`client-${user.id}`);
        console.log(`Socket ${socket.id} joined room client-${user.id}`);
      }
      
    });

    // Manejar desconexiones
    socket.on("disconnect", () => {
      console.log("Usuario desconectado", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.IO no inicializado.");
  }
  return io;
};