
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let connection: mysql.Connection;

export const initializeConnection = async (): Promise<void> => {
  if (!connection) {
    connection = await mysql.createConnection({
      //host: process.env.MYSQL_HOST,
      //user: process.env.MYSQL_USER,
      //password: process.env.MYSQL_PASSWORD,
      //database: process.env.MYSQL_DATABASE,
      host: "database-tfg.cfe62rndwl8t.us-east-1.rds.amazonaws.com",
      user: "admin",
      password: "Develop0crew$$",
      database: "ticktac",
    });
    console.log('Conexión a la base de datos MySql establecida');
  }
};

export const getMySqlConnection = (): mysql.Connection => {
  if (!connection) {
    throw new Error('La conexión a la base de datos no ha sido inicializada');
  }
  return connection;
};
