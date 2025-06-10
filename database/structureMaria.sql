-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.41 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ticktac
CREATE DATABASE IF NOT EXISTS `ticktac` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ticktac`;

-- Dumping structure for table ticktac.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
 NOT NULL,
  `rol` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
 NOT NULL DEFAULT 'ADMIN',
  `id_plan` int NOT NULL,
  `id_tipo_pago` int DEFAULT NULL,
  `inicio_plan` datetime NOT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `id_calendario` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_admin_contrato` (`id_plan`) USING BTREE,
  KEY `FK_admin_tipo_pago` (`id_tipo_pago`),
  KEY `FK_admin_calendario` (`id_calendario`),
  CONSTRAINT `FK_admin_calendario` FOREIGN KEY (`id_calendario`) REFERENCES `calendario` (`id`),
  CONSTRAINT `FK_admin_contrato` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`),
  CONSTRAINT `FK_admin_tipo_pago` FOREIGN KEY (`id_tipo_pago`) REFERENCES `tipo_pago` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 COMMENT='tabla que almacena el superusuario que sería el primer usuario de la empresa (gestiona usuarios trabajadores y clientes)';

-- Dumping data for table ticktac.admin: ~4 rows (approximately)
DELETE FROM `admin`;
INSERT INTO `admin` (`id`, `nombre`, `email`, `password`, `rol`, `id_plan`, `id_tipo_pago`, `inicio_plan`, `activo`, `id_calendario`) VALUES
	(2, 'admin', 'admin@gmail.com', '$2b$10$zW1Vzcq.5wvLFscNyneW3.x3aa430guTr4Fn5VEcfJiMhX5W7x9Ae', 'ADMIN', 2, 2, '2025-04-13 19:24:45', 1, 1),
	(3, 'admin', 'adminpruebas@gmail.com', '$2b$10$hLAllstz652NXnDPGi00bO3mHP90nh/t.U53yKyad5UT82S1xQMkG', 'ADMIN', 3, 1, '2025-04-14 18:05:43', 1, 4),
	(4, 'pruebas', 'pruebas@gmail.com', '$2b$10$FIGsza2VkOTD.afKCAtFVOyg1z4F3aSe13gkAbERTxt9FtcCGV1Nm', 'ADMIN', 2, 2, '2025-05-16 21:15:38', 1, 1),
	(5, 'otroadm', 'otroadm@gmail.com', '$2b$10$sew2UlPl1hAnSzrUDMUydORJJ6fieZ9zj5dnR5cGG4OpoaxG8kgJu', 'ADMIN', 2, 2, '2025-06-10 17:16:31', 1, 8);

-- Dumping structure for table ticktac.calendario
CREATE TABLE IF NOT EXISTS `calendario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL DEFAULT 'calendario',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;

-- Dumping data for table ticktac.calendario: ~8 rows (approximately)
DELETE FROM `calendario`;
INSERT INTO `calendario` (`id`, `nombre`) VALUES
	(1, 'calendario admin1'),
	(3, 'calendario furiosa'),
	(4, 'test'),
	(5, 'adm'),
	(6, 'adm'),
	(7, 'testadm'),
	(8, 'otroadm'),
	(9, 'otrouser');

-- Dumping structure for table ticktac.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL DEFAULT 'CLIENT',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 COMMENT='tabla que almacenan los clietnes de los usuarios (empresas)';

-- Dumping data for table ticktac.cliente: ~10 rows (approximately)
DELETE FROM `cliente`;
INSERT INTO `cliente` (`id`, `nombre`, `email`, `password`, `rol`) VALUES
	(1, 'cliente1mod', 'cliente1@gmail.com', '$2b$10$VC5auABHXtzyEgfZW.WqcOAvHKau5de02wUF4qdwL.tb7hZb0Ngum', 'CLIENT'),
	(2, 'cliente2', 'cliente2@gmail.com', '$2b$10$Dgww2L1x65jLi9NAQWp0weSBisQr7gIkqo3PtaiPzz2zMb.R4p4oC', 'CLIENT'),
	(3, 'user3', 'user3@gmail.com', '$2b$10$HGZU45TLMNlz.BK6Nx6IGOKDW52OO7CSXV8tIvIQ0am7V9inImSfK', 'CLIENT'),
	(4, 'cliente4', 'cliente4@gmail.com', '$2b$10$Dgww2L1x65jLi9NAQWp0weSBisQr7gIkqo3PtaiPzz2zMb.R4p4oC', 'CLIENT'),
	(5, 'pruebaCliente', 'clientetest@gmail.com', '$2b$10$NCGoEjcFfSyQWb72n4L2quwLUsInkDO/4u/sesei9rmmEoOUwZvVq', 'CLIENT'),
	(6, 'cliente5', 'cliente5@gmail.com', '$2b$10$8viTdXLBHeYnjvIQa4zro.B/o9KdD6uSAdxN0W24KzZCFZpJDqy6y', 'CLIENT'),
	(7, 'cliente6', 'cliente6@gmail.com', '$2b$10$ZzNmy9EgvsuTaYC4faZa/.z.DM/XSpRKHy/3oyV8X/meQ0et0fQCy', 'CLIENT'),
	(8, 'cliente7', 'cliente7@gmail.com', '$2b$10$S9rqumCGLvTrqdaKJKrxZutXanYXleP.5dJYkUnNG9QOvLZDfMHIa', 'CLIENT'),
	(9, 'pruebatinas', 'pruebatinas@gmail.com', '$2b$10$g.bMtNP5p.dvbkwfeF6E/OYFx8gZ/JGmCxEV5hgq6olgs0CBpom/G', 'CLIENT'),
	(10, 'pruebatinas2', 'pruebatinas2@gmail.com', '$2b$10$z2gz5VDTAr/ygwe2hdl2ZuPpDEnnfX3/NjC.HjAewWjW8wgXOr3FS', 'CLIENT');

-- Dumping structure for table ticktac.cliente_admin
CREATE TABLE IF NOT EXISTS `cliente_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_admin` int NOT NULL DEFAULT '0',
  `id_cliente` int NOT NULL DEFAULT '0',
  `activo` int NOT NULL DEFAULT '1',
  `nombre_cliente` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cliente_admin_cliente` (`id_cliente`),
  KEY `fk_cliente_admin_admin` (`id_admin`),
  CONSTRAINT `fk_cliente_admin_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`),
  CONSTRAINT `FK_cliente_admin_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 COMMENT='relaciona los clientes con los administradores (empresas)';

-- Dumping data for table ticktac.cliente_admin: ~9 rows (approximately)
DELETE FROM `cliente_admin`;
INSERT INTO `cliente_admin` (`id`, `id_admin`, `id_cliente`, `activo`, `nombre_cliente`) VALUES
	(6, 2, 1, 1, 'Cliente1'),
	(7, 2, 4, 1, 'client4'),
	(10, 2, 5, 1, 'pruebaCliente'),
	(12, 2, 2, 0, 'cliente2cambio'),
	(13, 2, 6, 0, 'cliente5'),
	(14, 2, 7, 1, 'cliente6'),
	(15, 2, 8, 0, 'cliente7'),
	(16, 2, 9, 0, 'pruebatinas'),
	(17, 2, 10, 0, 'pruebatinas2');

-- Dumping structure for table ticktac.estado
CREATE TABLE IF NOT EXISTS `estado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 COMMENT='almacena el estado de los tickets';

-- Dumping data for table ticktac.estado: ~3 rows (approximately)
DELETE FROM `estado`;
INSERT INTO `estado` (`id`, `nombre`) VALUES
	(1, 'Nuevo'),
	(2, 'Pendiente usuario'),
	(3, 'Cerrado'),
	(4, 'Pendiente cliente');

-- Dumping structure for table ticktac.evento
CREATE TABLE IF NOT EXISTS `evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha_ini` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `color` varchar(50) NOT NULL DEFAULT '',
  `id_calendario` int NOT NULL DEFAULT (0),
  `ts` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `FK_evento_calendario` (`id_calendario`),
  CONSTRAINT `FK_evento_calendario` FOREIGN KEY (`id_calendario`) REFERENCES `calendario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;

-- Dumping data for table ticktac.evento: ~9 rows (approximately)
DELETE FROM `evento`;
INSERT INTO `evento` (`id`, `nombre`, `fecha_ini`, `fecha_fin`, `color`, `id_calendario`, `ts`) VALUES
	(1, 'pruebas edit mod', '2025-06-11 18:25:00', '2025-06-11 23:59:00', '#a467d5', 1, '2025-06-08 13:52:15'),
	(4, 'Evento large', '2025-06-09 12:00:00', '2025-06-12 12:30:00', '#af2e0d', 1, '2025-06-09 17:20:52'),
	(13, 'pruebas mod', '2025-06-13 12:00:00', '2025-06-14 14:00:00', '#c0bfbf', 1, '2025-06-09 19:25:45'),
	(14, 'nueva pruebas edit', '2025-06-17 00:00:00', '2025-06-17 23:59:00', '#000000', 1, '2025-06-09 19:27:36'),
	(15, 'asdf editado', '2025-06-18 00:00:00', '2025-06-18 23:59:00', '#000000', 1, '2025-06-09 19:29:32'),
	(16, 'evento de prueba', '2025-06-26 08:00:00', '2025-06-27 14:00:00', '#ffffff', 1, '2025-06-09 19:51:59'),
	(17, 'para editar y eliminar', '2025-06-15 08:00:00', '2025-06-15 08:00:00', '#c8acac', 1, '2025-06-09 20:23:34'),
	(18, 'pruebas', '2025-06-05 08:00:00', '2025-06-05 08:00:00', '#ffffff', 1, '2025-06-09 20:26:55'),
	(19, 'pruebas', '2025-06-06 08:00:00', '2025-06-06 08:30:00', '#000000', 1, '2025-06-09 20:29:28'),
	(20, 'prueba nueva', '2025-06-11 08:00:00', '2025-06-11 08:01:00', '#c66262', 8, '2025-06-10 17:18:44');

-- Dumping structure for table ticktac.mensaje
CREATE TABLE IF NOT EXISTS `mensaje` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
,
  `autor` varchar(50) NOT NULL,
  `id_ticket` int NOT NULL,
  `ts` datetime NOT NULL DEFAULT (now()),
  `id_autor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_mensaje_ticket` (`id_ticket`),
  CONSTRAINT `FK_mensaje_ticket` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 COMMENT='almacena los mensajes de los tickets';

-- Dumping data for table ticktac.mensaje: ~8 rows (approximately)
DELETE FROM `mensaje`;
INSERT INTO `mensaje` (`id`, `texto`, `autor`, `id_ticket`, `ts`, `id_autor`) VALUES
	(1, 'asdfasdf', 'ADMIN', 8, '2025-06-08 13:37:20', 2),
	(2, 'sdfafd', 'ADMIN', 9, '2025-06-08 13:38:14', 2),
	(3, 'no entiendo nada', 'CLIENT', 9, '2025-06-08 13:38:24', 1),
	(4, 'eso es problema tuyo', 'ADMIN', 9, '2025-06-08 13:38:32', 2),
	(5, 'Pruebas internas', 'ADMIN', 10, '2025-06-09 20:40:52', 2),
	(6, 'pruebas', 'ADMIN', 11, '2025-06-09 20:41:57', 2),
	(7, 'furiosa solucioa el problema', 'ADMIN', 10, '2025-06-09 21:59:10', 2),
	(8, 'en nada lo hago', 'USER', 10, '2025-06-09 21:59:17', 4);

-- Dumping structure for table ticktac.plan
CREATE TABLE IF NOT EXISTS `plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL DEFAULT '',
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
 NOT NULL,
  `usuarios` int NOT NULL COMMENT 'cantidad de usuarios máxima admintida',
  `clientes` int NOT NULL COMMENT 'cantidad de clientes máxima admintida',
  `mensual` decimal(20,2) NOT NULL DEFAULT '0.00',
  `anual` decimal(20,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 COMMENT='tabla que almacena los precios con su tipo (mensual, anual)  y desripción';

-- Dumping data for table ticktac.plan: ~3 rows (approximately)
DELETE FROM `plan`;
INSERT INTO `plan` (`id`, `titulo`, `descripcion`, `usuarios`, `clientes`, `mensual`, `anual`) VALUES
	(2, 'Plan básico', 'Plan perfecto para gestionar incidencias en PIMES y autónomos con una cantidad de clientes reducida', 4, 5, 9.99, 99.99),
	(3, 'Plan premium', 'Plan perfecto para empresas de tamaño medio con una demanda de clientes media, además, incluye soporte técnico', 7, 10, 19.99, 219.99),
	(4, 'Plan platinum', 'Plan perfecto para empresas con un número iliminado de usuarios y clientes, además, incluye soporte técnico', 9999999, 9999999, 99.99, 1149.99);

-- Dumping structure for table ticktac.ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asunto` varchar(50) NOT NULL DEFAULT '0',
  `id_estado` int NOT NULL DEFAULT (0),
  `id_cliente` int NOT NULL DEFAULT (0),
  `id_usuario` int DEFAULT NULL,
  `id_admin` int NOT NULL DEFAULT '0',
  `activo` tinyint NOT NULL DEFAULT '1',
  `ts` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `FK_tiket_estado` (`id_estado`),
  KEY `FK_tiket_cliente` (`id_cliente`),
  KEY `FK_tiket_admin` (`id_admin`),
  KEY `FK_tiket_usuario` (`id_usuario`),
  CONSTRAINT `FK_tiket_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`),
  CONSTRAINT `FK_tiket_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `FK_tiket_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`),
  CONSTRAINT `FK_tiket_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 COMMENT='tabla que almacena los tickets';

-- Dumping data for table ticktac.ticket: ~9 rows (approximately)
DELETE FROM `ticket`;
INSERT INTO `ticket` (`id`, `asunto`, `id_estado`, `id_cliente`, `id_usuario`, `id_admin`, `activo`, `ts`) VALUES
	(3, 'pruebas admin', 1, 1, NULL, 2, 1, '2025-05-10 12:28:31'),
	(4, 'para cliente y furiosa', 1, 1, 4, 2, 1, '2025-06-08 13:21:03'),
	(5, 'pruebas', 3, 1, 4, 2, 1, '2025-06-08 13:23:00'),
	(6, 'asdfasdfasdf', 1, 1, 4, 2, 1, '2025-06-08 13:32:12'),
	(7, 'para admin', 1, 1, NULL, 2, 1, '2025-06-08 13:32:41'),
	(8, 'prueas', 1, 4, 2, 2, 1, '2025-06-08 13:37:20'),
	(9, 'mod', 1, 1, NULL, 2, 1, '2025-06-08 13:38:14'),
	(10, 'probando ticket', 1, 1, 4, 2, 1, '2025-06-09 20:40:52'),
	(11, 'asdfasdf', 2, 1, NULL, 2, 1, '2025-06-09 20:41:57');

-- Dumping structure for table ticktac.tipo_pago
CREATE TABLE IF NOT EXISTS `tipo_pago` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 COMMENT='almacena los tipos de pago, mensual o anual';

-- Dumping data for table ticktac.tipo_pago: ~2 rows (approximately)
DELETE FROM `tipo_pago`;
INSERT INTO `tipo_pago` (`id`, `nombre`) VALUES
	(1, 'anual'),
	(2, 'mensual');

-- Dumping structure for table ticktac.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
 NOT NULL DEFAULT 'USER',
  `id_admin` int NOT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  `id_calendario` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_usuario_administrador` (`id_admin`) USING BTREE,
  KEY `FK_user_calendario` (`id_calendario`),
  CONSTRAINT `FK_user_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`),
  CONSTRAINT `FK_user_calendario` FOREIGN KEY (`id_calendario`) REFERENCES `calendario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 COMMENT='tabla que almacena los usuarios de la app (empresas)';

-- Dumping data for table ticktac.usuario: ~5 rows (approximately)
DELETE FROM `usuario`;
INSERT INTO `usuario` (`id`, `nombre`, `email`, `password`, `rol`, `id_admin`, `activo`, `id_calendario`) VALUES
	(1, 'maikel', 'maikel@pruebas.com', '$2b$10$IOUuXAFSPpwrnZp38i6YfOxa4QYiQaLelznVk9mV/TsIMjimM2xTO', 'USER', 2, 1, 1),
	(2, 'sara', 'sara@gmail.com', '$2b$10$Zzubr/.YEI7KhtkkT9.1Qe4gI0iWAncFZFRMQVng6HS0/TKzMjqWO', 'USER', 2, 1, 1),
	(3, 'jota', 'jota@gmail.com', '$2b$10$GxmpX8qJEGT5EiSpHpt5KeiEGAUfR/lDTkUWLzEmTpvb9NsDYmAHa', 'USER', 2, 1, 1),
	(4, 'furiosa', 'furiosa@gmail.com', '$2b$10$KWy1WJff8CXx/p5dF3TuGeA2YzaSwK0qXRR./9vhy/XN6n9kNRmmS', 'USER', 2, 1, 4),
	(5, 'otrouser', 'otrouser@gmail.com', '$2b$10$OjybgGm6Zjw2A6Iz/nsPhejTAwbDqeZAO0or7/6Oqc1lOuOte5KMy', 'USER', 5, 1, 9);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
