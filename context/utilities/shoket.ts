// socket.ts
import { Server } from "socket.io";
import http from "http";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Asegúrate de ajustar esto para producción
    },
  });

  io.on("connection", (socket) => {
    console.log("Usuario conectado", socket.id);

    // Se une a salas de tickets que le pertenecen
    socket.on("joinUserRooms", (ticketIds: string[]) => {
      ticketIds.forEach((ticketId) => socket.join(`ticket-${ticketId}`));
    });

    // Se une a la sala de chat de un ticket específico
    socket.on("joinTicketChat", (ticketId: string) => {
      socket.join(`chat-${ticketId}`);
    });

    // Mensaje nuevo en un ticket
    socket.on("newMessage", ({ ticketId, message }) => {
      io.to(`chat-${ticketId}`).emit("message", message);
    });

    // Ticket actualizado o creado
    socket.on("ticketUpdated", (ticket) => {
      io.to(`ticket-${ticket.id}`).emit("ticketUpdate", ticket);
    });
  });

  return io;
};
