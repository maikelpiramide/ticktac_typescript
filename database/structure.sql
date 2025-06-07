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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla que almacena el superusuario que sería el primer usuario de la empresa (gestiona usuarios trabajadores y clientes)';

-- Dumping data for table ticktac.admin: ~2 rows (approximately)
DELETE FROM `admin`;
INSERT INTO `admin` (`id`, `nombre`, `email`, `password`, `rol`, `id_plan`, `id_tipo_pago`, `inicio_plan`, `activo`) VALUES
	(2, 'admin', 'admin@gmail.com', '$2b$10$zW1Vzcq.5wvLFscNyneW3.x3aa430guTr4Fn5VEcfJiMhX5W7x9Ae', 'ADMIN', 2, 2, '2025-04-13 19:24:45', 1),
	(3, 'admin', 'adminpruebas@gmail.com', '$2b$10$zW1Vzcq.5wvLFscNyneW3.x3aa430guTr4Fn5VEcfJiMhX5W7x9Ae', 'ADMIN', 3, 1, '2025-04-14 18:05:43', 1),
	(4, 'pruebas', 'pruebas@gmail.com', '$2b$10$FIGsza2VkOTD.afKCAtFVOyg1z4F3aSe13gkAbERTxt9FtcCGV1Nm', 'ADMIN', 2, 2, '2025-05-16 21:15:38', 1);

-- Dumping structure for table ticktac.cliente
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL DEFAULT 'CLIENT',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla que almacenan los clietnes de los usuarios (empresas)';

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
	(10, 'pruebatinas2', 'pruebatinas2@gmail.com', '$2b$10$z2gz5VDTAr/ygwe2hdl2ZuPpDEnnfX3/NjC.HjAewWjW8wgXOr3FS', 'CLIENT'),
	(11, 'prueba cliente', 'clienteprueba@gmail.com', '$2b$10$H5a.sVPwJghneVoXpcFQPODKS4yiui6WRYW2HkzamWuCh4l94AfPC', 'CLIENT');

-- Dumping structure for table ticktac.cliente_admin
DROP TABLE IF EXISTS `cliente_admin`;
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='relaciona los clientes con los administradores (empresas)';

-- Dumping data for table ticktac.cliente_admin: ~8 rows (approximately)
DELETE FROM `cliente_admin`;
INSERT INTO `cliente_admin` (`id`, `id_admin`, `id_cliente`, `activo`, `nombre_cliente`) VALUES
	(6, 2, 1, 1, 'Cliente1'),
	(7, 2, 4, 1, 'client4'),
	(10, 2, 5, 1, 'pruebaCliente'),
	(12, 2, 2, 0, 'cliente2cambio'),
	(13, 2, 6, 0, 'cliente5'),
	(14, 2, 7, 0, 'cliente6'),
	(15, 2, 8, 0, 'cliente7'),
	(16, 2, 9, 0, 'pruebatinas'),
	(17, 2, 10, 0, 'pruebatinas2'),
	(18, 2, 11, 1, 'prueba cliente'),
	(19, 3, 1, 1, 'cliente1');

-- Dumping structure for table ticktac.estado
DROP TABLE IF EXISTS `estado`;
CREATE TABLE IF NOT EXISTS `estado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='almacena el estado de los tickets';

-- Dumping data for table ticktac.estado: ~2 rows (approximately)
DELETE FROM `estado`;
INSERT INTO `estado` (`id`, `nombre`) VALUES
	(1, 'Nuevo'),
	(2, 'Pendinte'),
	(3, 'Cerrado');

-- Dumping structure for table ticktac.mensaje
DROP TABLE IF EXISTS `mensaje`;
CREATE TABLE IF NOT EXISTS `mensaje` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `autor` varchar(50) NOT NULL,
  `id_ticket` int NOT NULL,
  `ts` datetime DEFAULT (now()),
  `id_autor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_mensaje_ticket` (`id_ticket`),
  CONSTRAINT `FK_mensaje_ticket` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='almacena los mensajes de los tickets';

-- Dumping data for table ticktac.mensaje: ~132 rows (approximately)
DELETE FROM `mensaje`;
INSERT INTO `mensaje` (`id`, `texto`, `autor`, `id_ticket`, `ts`, `id_autor`) VALUES
	(1, 'pruebas mensaje ticket con problema de crear usuario en la app', 'ADMIN', 30, '2025-05-25 18:34:28', 2),
	(2, 'Mirar y revisar pruebas', 'ADMIN', 31, '2025-05-27 18:21:30', 2),
	(3, 'pruebas', 'ADMIN', 32, '2025-05-29 19:02:06', 2),
	(4, 'comprobar el estado de los sistemas', 'ADMIN', 33, '2025-05-29 19:04:19', 2),
	(5, 'pruebas', 'ADMIN', 34, '2025-05-29 19:07:33', 2),
	(6, 'p para furiosa soket', 'ADMIN', 35, '2025-05-29 19:08:54', 2),
	(7, 'asdfasdfasdf', 'ADMIN', 36, '2025-05-29 19:14:29', 2),
	(8, 'asdfja;ksldf', 'ADMIN', 37, '2025-05-29 19:20:27', 2),
	(9, 'asdf;asjkd;fklj', 'ADMIN', 38, '2025-05-29 19:24:05', 2),
	(10, 'asd;fkljas;df', 'ADMIN', 39, '2025-05-29 19:28:07', 2),
	(11, 'revisar configuracion correos cliente', 'ADMIN', 40, '2025-05-29 19:28:41', 2),
	(12, 'asdfasdf', 'ADMIN', 41, '2025-05-29 19:44:20', 2),
	(13, 'asdfasdf', 'ADMIN', 42, '2025-05-29 19:49:00', 2),
	(14, 'safdklf;jas;dklf', 'ADMIN', 43, '2025-05-29 19:49:13', 2),
	(15, 'ticket nuevo', 'ADMIN', 44, '2025-05-29 19:49:32', 2),
	(16, 'fds', 'ADMIN', 45, '2025-05-29 19:50:55', 2),
	(17, 'pruebas', 'ADMIN', 46, '2025-05-29 19:51:14', 2),
	(18, 'asfdasdf', 'ADMIN', 47, '2025-05-29 19:52:10', 2),
	(19, 'asdfasdf', 'ADMIN', 48, '2025-05-29 19:56:41', 2),
	(20, 'asdfasdf', 'ADMIN', 49, '2025-05-29 19:57:14', 2),
	(21, 'asdfafsd', 'ADMIN', 50, '2025-05-29 19:58:00', 2),
	(22, 'asdfjas;ldf', 'ADMIN', 51, '2025-05-29 20:10:33', 2),
	(23, 'asfdasd', 'ADMIN', 52, '2025-05-29 20:12:36', 2),
	(24, 'pruebas', 'ADMIN', 53, '2025-05-29 20:13:48', 2),
	(25, 'nuevo furiosa', 'ADMIN', 54, '2025-05-29 20:24:30', 2),
	(26, 'sfdaasdfasd', 'ADMIN', 55, '2025-05-31 11:30:43', 2),
	(27, 'a ver si cuela', 'USER', 56, '2025-05-31 11:50:57', 4),
	(28, 'para furiosa', 'ADMIN', 57, '2025-05-31 12:48:36', 2),
	(29, 'hay que revisar el estado de los datos', 'USER', 58, '2025-05-31 12:48:59', 4),
	(30, 'prueba de ticket', 'USER', 59, '2025-05-31 12:53:26', 4),
	(31, 'd;lkjd;kfl', 'ADMIN', 60, '2025-05-31 12:54:02', 2),
	(32, 'lkjfsa;kld', 'ADMIN', 61, '2025-05-31 12:54:25', 2),
	(33, 'pruebas', 'CLIENT', 62, '2025-05-31 14:29:37', 1),
	(34, 'asdfasfadsf', 'CLIENT', 63, '2025-05-31 14:33:12', 1),
	(35, 'prueba socket', 'CLIENT', 64, '2025-05-31 14:39:18', 1),
	(36, 'prueba de socket', 'CLIENT', 65, '2025-05-31 14:46:52', 1),
	(37, 'mensaje nuevo para admin socket', 'CLIENT', 66, '2025-06-01 11:22:54', 1),
	(38, 'revisar las cuentas de correo y configurar redirección', 'ADMIN', 67, '2025-06-01 11:27:24', 2),
	(39, 'asdfasdfasfd', 'ADMIN', 68, '2025-06-02 18:04:37', 2),
	(40, 'otro mensaje', 'USER', 68, '2025-06-04 17:55:35', 4),
	(41, 'Mensaje de cliente', 'CLIENT', 68, '2025-06-04 17:56:22', 1),
	(42, 'prueba', 'ADMIN', 68, '2025-06-04 19:25:12', 2),
	(43, 'nuevo ticket guardado', 'ADMIN', 68, '2025-06-04 19:25:49', 2),
	(44, 'asdfasdfasdfas', 'ADMIN', 68, '2025-06-04 19:30:16', 2),
	(45, 'sdfasdfasdfasdfasdfasdf', 'ADMIN', 68, '2025-06-04 19:38:30', 2),
	(46, 'pruebas nuevas', 'ADMIN', 68, '2025-06-04 19:39:14', 2),
	(47, 'ahora si que llega ticket', 'ADMIN', 68, '2025-06-04 19:39:22', 2),
	(48, 'mando ticket desde furiosa', 'USER', 68, '2025-06-04 19:40:19', 4),
	(49, 'mando nuevo desde furiosa', 'USER', 68, '2025-06-04 19:51:19', 4),
	(50, 'admin contesta', 'ADMIN', 68, '2025-06-04 19:51:28', 2),
	(51, 'asdfasdfas', 'USER', 68, '2025-06-04 19:55:34', 4),
	(52, 'asdfasdf', 'USER', 68, '2025-06-04 19:55:39', 4),
	(53, 'asdfasdf', 'USER', 68, '2025-06-04 19:56:02', 4),
	(54, 'pruebas para cliente', 'USER', 69, '2025-06-05 18:17:57', 4),
	(55, 'asdf', 'USER', 70, '2025-06-05 18:18:45', 4),
	(56, 'pruebas', 'CLIENT', 71, '2025-06-05 18:20:47', 1),
	(57, 'pruebas admin', 'USER', 72, '2025-06-05 18:21:02', 4),
	(58, 'tengo un problema con el estado de mi erp, cuando intento obtener el listado de usuarios no muestra nada', 'CLIENT', 73, '2025-06-05 18:23:19', 1),
	(59, 'Me encargo ahora mismo', 'USER', 73, '2025-06-05 18:23:49', 4),
	(60, '', 'USER', 73, '2025-06-05 18:23:53', 4),
	(61, '', 'USER', 73, '2025-06-05 18:23:53', 4),
	(62, 'ergd', 'CLIENT', 73, '2025-06-05 18:24:29', 1),
	(63, 'asdf', 'USER', 73, '2025-06-05 18:24:34', 4),
	(64, 'asdf', 'ADMIN', 73, '2025-06-05 18:24:40', 2),
	(65, 'sadfsd', 'ADMIN', 73, '2025-06-05 18:28:04', 2),
	(66, 'sdfasdfa', 'USER', 74, '2025-06-05 18:36:10', 4),
	(67, 'pruebas socket', 'USER', 75, '2025-06-05 18:37:19', 4),
	(68, 'pruebas', 'CLIENT', 76, '2025-06-05 18:41:10', 1),
	(69, 'Furiosa ponte en contacto con el cliente', 'ADMIN', 76, '2025-06-05 18:41:44', 2),
	(70, 'nuevo prueba', 'ADMIN', 76, '2025-06-05 18:44:51', 2),
	(71, 'test cliente', 'CLIENT', 76, '2025-06-05 18:45:00', 1),
	(72, 'no se por que mandaba 3', 'USER', 76, '2025-06-05 18:45:08', 4),
	(73, 'pruebas', 'ADMIN', 76, '2025-06-05 18:45:18', 2),
	(74, '', 'ADMIN', 76, '2025-06-05 18:45:27', 2),
	(75, 'asdfasdf', 'ADMIN', 76, '2025-06-05 18:46:14', 2),
	(76, 'asdfasdfasdf', 'ADMIN', 76, '2025-06-05 18:46:40', 2),
	(77, '', 'USER', 76, '2025-06-05 18:46:55', 4),
	(78, 'no se por que mandaba 3asdf', 'USER', 76, '2025-06-05 18:46:59', 4),
	(79, 'asdfasdfasdf', 'ADMIN', 76, '2025-06-05 18:47:12', 2),
	(80, 'prueba nueva', 'ADMIN', 76, '2025-06-05 18:47:20', 2),
	(81, 'de admin', 'ADMIN', 76, '2025-06-05 18:48:59', 2),
	(82, 'purbeas', 'ADMIN', 76, '2025-06-05 18:51:30', 2),
	(83, 'dfasdfasdfasd', 'ADMIN', 76, '2025-06-05 18:51:58', 2),
	(84, 'pruebas nuevas', 'ADMIN', 76, '2025-06-05 18:52:09', 2),
	(85, 'asdfasdfas', 'CLIENT', 77, '2025-06-05 18:53:44', 1),
	(86, 'siguen sin contestar', 'CLIENT', 77, '2025-06-05 18:54:11', 1),
	(87, 'asdfasfdsaf', 'USER', 78, '2025-06-05 18:55:41', 4),
	(88, 'asdfasdfas', 'CLIENT', 79, '2025-06-05 19:00:22', 1),
	(89, 'pruebas', 'CLIENT', 80, '2025-06-05 19:02:28', 1),
	(90, 'prueabs', 'CLIENT', 81, '2025-06-05 19:03:08', 1),
	(91, 'asdf', 'CLIENT', 82, '2025-06-05 19:03:55', 1),
	(92, 'asdfasdfasdf', 'CLIENT', 83, '2025-06-05 19:05:13', 1),
	(93, 'pendiente de pagar las horas de desarrollo', 'ADMIN', 84, '2025-06-05 19:35:09', 2),
	(94, 'prubeas', 'CLIENT', 84, '2025-06-05 19:35:43', 1),
	(95, 'asdfasdfasdfasdfadsfasf', 'ADMIN', 84, '2025-06-05 19:47:57', 2),
	(96, '', 'ADMIN', 84, '2025-06-05 19:48:12', 2),
	(97, '', 'ADMIN', 84, '2025-06-05 19:48:13', 2),
	(98, '', 'ADMIN', 84, '2025-06-05 19:48:14', 2),
	(99, '', 'ADMIN', 84, '2025-06-05 19:48:14', 2),
	(100, '', 'ADMIN', 84, '2025-06-05 19:48:15', 2),
	(101, '', 'ADMIN', 84, '2025-06-05 19:48:15', 2),
	(102, '', 'ADMIN', 84, '2025-06-05 19:48:15', 2),
	(103, '', 'ADMIN', 84, '2025-06-05 19:48:15', 2),
	(104, '', 'ADMIN', 84, '2025-06-05 19:48:15', 2),
	(105, '', 'ADMIN', 84, '2025-06-05 19:48:16', 2),
	(106, '', 'ADMIN', 84, '2025-06-05 19:48:16', 2),
	(107, '', 'ADMIN', 84, '2025-06-05 19:48:16', 2),
	(108, '', 'ADMIN', 84, '2025-06-05 19:48:16', 2),
	(109, '', 'ADMIN', 84, '2025-06-05 19:48:16', 2),
	(110, '', 'ADMIN', 84, '2025-06-05 19:48:20', 2),
	(111, '', 'ADMIN', 84, '2025-06-05 19:48:21', 2),
	(112, '', 'ADMIN', 84, '2025-06-05 19:48:24', 2),
	(113, '', 'ADMIN', 84, '2025-06-05 19:49:16', 2),
	(114, '', 'ADMIN', 84, '2025-06-05 19:49:16', 2),
	(115, 'fasdfasdf', 'ADMIN', 84, '2025-06-05 19:49:26', 2),
	(116, 'asdf', 'ADMIN', 84, '2025-06-05 19:50:08', 2),
	(117, 'flipada de datos', 'ADMIN', 84, '2025-06-05 19:52:53', 2),
	(118, 'prueba scroll', 'ADMIN', 84, '2025-06-05 20:00:00', 2),
	(119, 'prueba scrol', 'ADMIN', 84, '2025-06-05 20:00:14', 2),
	(120, 'asdfasdf', 'ADMIN', 84, '2025-06-05 20:00:31', 2),
	(121, 'asdfasdf', 'ADMIN', 84, '2025-06-05 20:00:41', 2),
	(122, 'afsdfasd', 'ADMIN', 84, '2025-06-05 20:01:05', 2),
	(123, 'nuevo mensaje a ver si hace scroll', 'ADMIN', 84, '2025-06-05 20:07:48', 2),
	(124, 'no debo nada', 'CLIENT', 84, '2025-06-05 20:08:23', 1),
	(125, 'prueba otra vez', 'CLIENT', 84, '2025-06-05 20:08:35', 1),
	(126, 'mensaje de prueba', 'CLIENT', 84, '2025-06-05 20:09:15', 1),
	(127, 'pruebas', 'CLIENT', 85, '2025-06-05 20:09:40', 1),
	(128, 'otras pruebas', 'ADMIN', 85, '2025-06-05 20:09:52', 2),
	(129, 'pruebas para ti', 'CLIENT', 85, '2025-06-05 20:09:59', 1),
	(130, 'nuevo mensaje de socket', 'ADMIN', 85, '2025-06-05 20:35:54', 2),
	(131, 'asfdasdf', 'ADMIN', 85, '2025-06-06 20:31:52', 2),
	(132, 'pruebas', 'ADMIN', 85, '2025-06-06 20:43:00', 2);

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
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='tabla que almacena los tickets';

-- Dumping data for table ticktac.ticket: ~63 rows (approximately)
DELETE FROM `ticket`;
INSERT INTO `ticket` (`id`, `asunto`, `id_estado`, `id_cliente`, `id_usuario`, `id_admin`, `activo`, `ts`) VALUES
	(21, 'asdf', 1, 1, 1, 2, 1, '2025-05-22 18:58:30'),
	(22, 'asdf', 2, 1, 2, 2, 1, '2025-05-22 19:00:06'),
	(23, 'asdfasdfasdf', 1, 5, 2, 2, 1, '2025-05-22 19:01:00'),
	(24, 'ticket con id 24', 2, 1, 3, 2, 1, '2025-05-22 19:01:29'),
	(25, 'prueba nueva', 1, 1, NULL, 2, 1, '2025-05-24 19:25:18'),
	(26, 'prueba ticket', 1, 1, NULL, 2, 1, '2025-05-25 18:24:15'),
	(27, 'asdf', 1, 1, 4, 2, 1, '2025-05-25 18:27:11'),
	(28, 'pruebas', 1, 1, NULL, 2, 1, '2025-05-25 18:29:40'),
	(29, 'pruebas', 1, 4, NULL, 2, 1, '2025-05-25 18:32:47'),
	(30, 'pruebas neuvas', 1, 1, 2, 2, 1, '2025-05-25 18:34:28'),
	(31, 'pruebas para furiosa', 2, 1, 4, 2, 1, '2025-05-27 18:21:30'),
	(32, 'prueba socket', 1, 1, 4, 2, 1, '2025-05-29 19:02:06'),
	(33, 'prueabs doket', 1, 1, 4, 2, 1, '2025-05-29 19:04:19'),
	(34, 'pruebas', 1, 1, 1, 2, 1, '2025-05-29 19:07:33'),
	(35, 'p furiosa', 1, 1, 4, 2, 1, '2025-05-29 19:08:54'),
	(36, 'pruebas', 1, 1, 4, 2, 1, '2025-05-29 19:14:29'),
	(37, 'pruebas nuevas', 1, 1, 1, 2, 1, '2025-05-29 19:20:27'),
	(38, 'pruebas', 1, 1, 4, 2, 1, '2025-05-29 19:24:05'),
	(39, 'pruebas', 1, 4, 4, 2, 1, '2025-05-29 19:28:07'),
	(40, 'pruebas soket nuevas', 2, 1, 1, 2, 1, '2025-05-29 19:28:41'),
	(41, ';lasdfkj;alsdkf', 1, 11, 4, 2, 1, '2025-05-29 19:44:20'),
	(42, 'pruebas', 1, 1, 1, 2, 1, '2025-05-29 19:49:00'),
	(43, 'asdfkljas;dfkljas', 1, 5, 4, 2, 1, '2025-05-29 19:49:13'),
	(44, 'para furiosa', 1, 4, 4, 2, 1, '2025-05-29 19:49:32'),
	(45, 'para f', 1, 1, 1, 2, 1, '2025-05-29 19:50:55'),
	(46, 'para furiosa nuevo ticket', 1, 1, 4, 2, 1, '2025-05-29 19:51:14'),
	(47, 'asdfasdf', 1, 1, 4, 2, 1, '2025-05-29 19:52:10'),
	(48, 'pruebas', 1, 5, 4, 2, 1, '2025-05-29 19:56:41'),
	(49, 'asdf;ljkas;dfklj', 1, 1, 4, 2, 1, '2025-05-29 19:57:14'),
	(50, 'asdfasd', 3, 1, 4, 2, 1, '2025-05-29 19:58:00'),
	(51, 'para furiosa', 1, 5, 4, 2, 1, '2025-05-29 20:10:33'),
	(52, 'pruebas', 3, 1, 4, 2, 1, '2025-05-29 20:12:36'),
	(53, 'pruebas', 3, 11, 4, 2, 1, '2025-05-29 20:13:48'),
	(54, 'furiosa', 1, 11, 4, 2, 1, '2025-05-29 20:24:30'),
	(55, 'asdf;kasdf', 1, 1, 1, 2, 1, '2025-05-31 11:30:43'),
	(56, 'prueabs maikel', 1, 1, 4, 2, 1, '2025-05-31 11:50:57'),
	(57, 'admin crea ticket para furiosa', 1, 1, 4, 2, 1, '2025-05-31 12:48:36'),
	(58, 'ticket nuevo de furiosa', 2, 1, 4, 2, 1, '2025-05-31 12:48:59'),
	(59, 'furiosa crea ticket', 1, 1, 4, 2, 1, '2025-05-31 12:53:26'),
	(60, 'admin crea ticket', 1, 1, 4, 2, 1, '2025-05-31 12:54:02'),
	(61, 'ticket solo para cliente', 1, 1, NULL, 2, 1, '2025-05-31 12:54:25'),
	(62, 'cliente crea ticket', 1, 1, NULL, 2, 1, '2025-05-31 14:29:36'),
	(63, 'asdfasdfasdfa', 1, 1, NULL, 3, 1, '2025-05-31 14:33:12'),
	(64, 'para admin', 1, 1, NULL, 2, 1, '2025-05-31 14:39:18'),
	(65, 'lo que sea', 1, 1, NULL, 2, 1, '2025-05-31 14:46:52'),
	(66, 'ticket para admin', 1, 1, NULL, 2, 1, '2025-06-01 11:22:54'),
	(67, 'para cliente 1 y furiosa ', 2, 5, NULL, 2, 1, '2025-06-01 11:27:24'),
	(68, 'pruebas', 1, 1, 4, 2, 1, '2025-06-02 18:04:37'),
	(69, 'para pruebas', 1, 1, 4, 2, 1, '2025-06-05 18:17:56'),
	(70, 'sdf', 1, 1, 4, 2, 1, '2025-06-05 18:18:45'),
	(71, 'prueba apra admin', 1, 1, NULL, 2, 1, '2025-06-05 18:20:47'),
	(72, 'pruebas', 1, 1, 4, 2, 1, '2025-06-05 18:21:02'),
	(73, 'desde clkiente 1', 1, 1, 4, 2, 1, '2025-06-05 18:23:19'),
	(74, 'safdasdfas', 1, 1, 4, 2, 1, '2025-06-05 18:36:10'),
	(75, 'sdfasdfasdfasfasdfasdfasdf', 1, 4, 1, 2, 1, '2025-06-05 18:37:19'),
	(76, 'para admin y asignar a furiosa', 1, 1, 4, 2, 1, '2025-06-05 18:41:10'),
	(77, 'pruebas nuevas', 1, 1, 4, 2, 1, '2025-06-05 18:53:44'),
	(78, 'otro mas', 1, 1, 4, 2, 1, '2025-06-05 18:55:41'),
	(79, 'pruebatinas', 1, 1, NULL, 2, 1, '2025-06-05 19:00:22'),
	(80, 'nuevo ticket', 1, 1, NULL, 2, 1, '2025-06-05 19:02:28'),
	(81, 'otro mas', 2, 1, NULL, 2, 1, '2025-06-05 19:03:08'),
	(82, 'asdfasfdasdf', 1, 1, NULL, 2, 1, '2025-06-05 19:03:55'),
	(83, 'otro ticket nuevo', 3, 1, NULL, 2, 1, '2025-06-05 19:05:13'),
	(84, 'paga lo que debes', 1, 1, 4, 2, 1, '2025-06-05 19:35:09'),
	(85, 'nuevo ticket de pruebas', 1, 1, NULL, 2, 1, '2025-06-05 20:09:40');

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
