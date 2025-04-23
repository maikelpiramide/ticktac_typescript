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
DROP DATABASE IF EXISTS `ticktac`;
CREATE DATABASE IF NOT EXISTS `ticktac` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ticktac`;

-- Dumping structure for table ticktac.admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rol` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'ADMIN',
  `id_plan` int NOT NULL,
  `id_tipo_pago` int DEFAULT NULL,
  `inicio_plan` datetime NOT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_admin_contrato` (`id_plan`) USING BTREE,
  KEY `FK_admin_tipo_pago` (`id_tipo_pago`),
  CONSTRAINT `FK_admin_contrato` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`),
  CONSTRAINT `FK_admin_tipo_pago` FOREIGN KEY (`id_tipo_pago`) REFERENCES `tipo_pago` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla que almacena el superusuario que sería el primer usuario de la empresa (gestiona usuarios trabajadores y clientes)';

-- Dumping data for table ticktac.admin: ~2 rows (approximately)
DELETE FROM `admin`;
INSERT INTO `admin` (`id`, `nombre`, `email`, `password`, `rol`, `id_plan`, `id_tipo_pago`, `inicio_plan`, `activo`) VALUES
	(2, 'admin', 'admin@gmail.com', '$2b$10$smuE08TX.u/H8Daq/bfMI.Zy8CO380r0DtJLX5wLHCDHIpL5HqWaG', 'ADMIN', 2, 2, '2025-04-13 19:24:45', 1),
	(3, 'admin', 'adminpruebas@gmail.com', '$2b$10$hLAllstz652NXnDPGi00bO3mHP90nh/t.U53yKyad5UT82S1xQMkG', 'ADMIN', 3, 1, '2025-04-14 18:05:43', 1);

-- Dumping structure for table ticktac.cliente
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL DEFAULT 'CLIENT',
  `activo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla que almacenan los clietnes de los usuarios (empresas)';

-- Dumping data for table ticktac.cliente: ~2 rows (approximately)
DELETE FROM `cliente`;
INSERT INTO `cliente` (`id`, `nombre`, `email`, `password`, `rol`, `activo`) VALUES
	(1, 'cliente1', 'cliente1@gmail.com', '$2b$10$VC5auABHXtzyEgfZW.WqcOAvHKau5de02wUF4qdwL.tb7hZb0Ngum', 'CLIENT', 1),
	(2, 'cliente2', 'cliente2@gmail.com', '$2b$10$Dgww2L1x65jLi9NAQWp0weSBisQr7gIkqo3PtaiPzz2zMb.R4p4oC', 'CLIENT', 1);

-- Dumping structure for table ticktac.cliente_admin
DROP TABLE IF EXISTS `cliente_admin`;
CREATE TABLE IF NOT EXISTS `cliente_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_admin` int NOT NULL DEFAULT '0',
  `id_cliente` int NOT NULL DEFAULT '0',
  `activo` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_cliente_admin_cliente` (`id_cliente`),
  KEY `fk_cliente_admin_admin` (`id_admin`),
  CONSTRAINT `fk_cliente_admin_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`),
  CONSTRAINT `FK_cliente_admin_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='relaciona los clientes con los administradores (empresas)';

-- Dumping data for table ticktac.cliente_admin: ~2 rows (approximately)
DELETE FROM `cliente_admin`;
INSERT INTO `cliente_admin` (`id`, `id_admin`, `id_cliente`, `activo`) VALUES
	(2, 2, 1, 0),
	(4, 2, 2, 0),
	(5, 2, 2, 0);

-- Dumping structure for table ticktac.estado
DROP TABLE IF EXISTS `estado`;
CREATE TABLE IF NOT EXISTS `estado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='almacena el estado de los tickets';

-- Dumping data for table ticktac.estado: ~0 rows (approximately)
DELETE FROM `estado`;

-- Dumping structure for table ticktac.plan
DROP TABLE IF EXISTS `plan`;
CREATE TABLE IF NOT EXISTS `plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL DEFAULT '',
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `usuarios` int NOT NULL COMMENT 'cantidad de usuarios máxima admintida',
  `clientes` int NOT NULL COMMENT 'cantidad de clientes máxima admintida',
  `mensual` decimal(20,2) NOT NULL DEFAULT '0.00',
  `anual` decimal(20,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla que almacena los precios con su tipo (mensual, anual)  y desripción';

-- Dumping data for table ticktac.plan: ~3 rows (approximately)
DELETE FROM `plan`;
INSERT INTO `plan` (`id`, `titulo`, `descripcion`, `usuarios`, `clientes`, `mensual`, `anual`) VALUES
	(2, 'Plan básico', 'Plan perfecto para gestionar incidencias en PIMES y autónomos con una cantidad de clientes reducida', 4, 5, 9.99, 99.99),
	(3, 'Plan premium', 'Plan perfecto para empresas de tamaño medio con una demanda de clientes media, además, incluye soporte técnico', 7, 10, 19.99, 219.99),
	(4, 'Plan platinum', 'Plan perfecto para empresas con un número iliminado de usuarios y clientes, además, incluye soporte técnico', 9999999, 9999999, 99.99, 1149.99);

-- Dumping structure for table ticktac.ticket
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asunto` varchar(50) NOT NULL DEFAULT '0',
  `id_estado` int NOT NULL DEFAULT (0),
  `id_cliente` int NOT NULL DEFAULT (0),
  `id_usuario` int NOT NULL DEFAULT (0),
  PRIMARY KEY (`id`),
  KEY `FK_tiket_estado` (`id_estado`),
  KEY `FK_tiket_cliente` (`id_cliente`),
  CONSTRAINT `FK_tiket_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `FK_tiket_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla que almacena los tickets';

-- Dumping data for table ticktac.ticket: ~0 rows (approximately)
DELETE FROM `ticket`;

-- Dumping structure for table ticktac.tipo_pago
DROP TABLE IF EXISTS `tipo_pago`;
CREATE TABLE IF NOT EXISTS `tipo_pago` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='almacena los tipos de pago, mensual o anual';

-- Dumping data for table ticktac.tipo_pago: ~2 rows (approximately)
DELETE FROM `tipo_pago`;
INSERT INTO `tipo_pago` (`id`, `nombre`) VALUES
	(1, 'anual'),
	(2, 'mensual');

-- Dumping structure for table ticktac.usuario
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'USER',
  `id_admin` int NOT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_usuario_administrador` (`id_admin`) USING BTREE,
  CONSTRAINT `FK_user_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla que almacena los usuarios de la app (empresas)';

-- Dumping data for table ticktac.usuario: ~4 rows (approximately)
DELETE FROM `usuario`;
INSERT INTO `usuario` (`id`, `nombre`, `email`, `password`, `rol`, `id_admin`, `activo`) VALUES
	(1, 'maikel', 'maikel@pruebas.com', '$2b$10$IOUuXAFSPpwrnZp38i6YfOxa4QYiQaLelznVk9mV/TsIMjimM2xTO', 'USER', 2, 1),
	(2, 'sara', 'sara@gmail.com', '$2b$10$Zzubr/.YEI7KhtkkT9.1Qe4gI0iWAncFZFRMQVng6HS0/TKzMjqWO', 'USER', 2, 1),
	(3, 'jota', 'jota@gmail.com', '$2b$10$GxmpX8qJEGT5EiSpHpt5KeiEGAUfR/lDTkUWLzEmTpvb9NsDYmAHa', 'USER', 2, 1),
	(4, 'furiosa', 'furiosa@gmail.com', '$2b$10$KWy1WJff8CXx/p5dF3TuGeA2YzaSwK0qXRR./9vhy/XN6n9kNRmmS', 'USER', 2, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
