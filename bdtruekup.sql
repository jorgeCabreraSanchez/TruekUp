-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.2.11-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para bdtruekup
CREATE DATABASE IF NOT EXISTS `bdtruekup` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bdtruekup`;

-- Volcando estructura para tabla bdtruekup.busquedaproductos
CREATE TABLE IF NOT EXISTS `busquedaproductos` (
  `idProducto` int(11) NOT NULL,
  `idPalabraClave` int(11) NOT NULL,
  PRIMARY KEY (`idProducto`,`idPalabraClave`),
  KEY `FK_palabraClave` (`idPalabraClave`),
  KEY `FK_producto` (`idProducto`),
  CONSTRAINT `FK_palabraClave` FOREIGN KEY (`idPalabraClave`) REFERENCES `palabrasclave` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_producto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.busquedaproductos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `busquedaproductos` DISABLE KEYS */;
INSERT INTO `busquedaproductos` (`idProducto`, `idPalabraClave`) VALUES
	(8, 5),
	(8, 6),
	(8, 12);
/*!40000 ALTER TABLE `busquedaproductos` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

<<<<<<< HEAD
-- Volcando datos para la tabla bdtruekup.categorias: ~6 rows (aproximadamente)
=======
<<<<<<< HEAD
-- Volcando datos para la tabla bdtruekup.categorias: ~7 rows (aproximadamente)
=======
-- Volcando datos para la tabla bdtruekup.categorias: ~6 rows (aproximadamente)
>>>>>>> jorge
>>>>>>> 5e0bf0047292e4e5010362d0de18256dab3108d6
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` (`id`, `nombre`, `imagen`) VALUES
	(1, 'Acuaticos', 'images/carousel/surf-1150x350.png'),
	(2, 'Extremos', 'images/carousel/bici-1150x350.png'),
	(3, 'Invierno', 'images/carousel/esqui-1150x350.png'),
	(4, 'Montaña', 'images/carousel/senderista.png'),
	(5, 'Motor', 'images/carousel/motor.png'),
<<<<<<< HEAD
	(6, 'Pelota', 'images/carousel/entrenamiento_baloncesto.png');
=======
<<<<<<< HEAD
	(6, 'Pelota', 'images/carousel/entrenamiento_baloncesto.png'),
	(7, 'Otros', NULL);
=======
	(6, 'Pelota', 'images/carousel/entrenamiento_baloncesto.png');
>>>>>>> jorge
>>>>>>> 5e0bf0047292e4e5010362d0de18256dab3108d6
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.palabrasclave
CREATE TABLE IF NOT EXISTS `palabrasclave` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `palabra` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.palabrasclave: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `palabrasclave` DISABLE KEYS */;
INSERT INTO `palabrasclave` (`id`, `palabra`) VALUES
	(1, 'Balones'),
	(2, 'Balones de baloncesto'),
	(3, 'Baloncesto'),
	(4, 'Guantes'),
	(5, 'Cascos'),
	(6, 'Cascos de motorista'),
	(7, 'Motos'),
	(8, 'Chaquetas'),
	(9, 'Chaquetas de motorista'),
	(10, 'Guantes de motorista'),
	(11, 'Pantalones'),
	(12, 'Motorista'),
	(13, 'Botas'),
	(14, 'Gafas');
/*!40000 ALTER TABLE `palabrasclave` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
<<<<<<< HEAD
=======
<<<<<<< HEAD
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categoria_idx` (`idCategoria`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `subcategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.productos: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`id`, `idCategoria`, `nombre`, `descripcion`, `imagen`) VALUES
	(1, 5, 'Casco Hebo Stage Negro', 'Casco fabricado en material termoplástico ABS e interior en EPS de 2 densidades, diseñado para la práctica del Off-Road. Disponible en 2 tallas de calota, el Stage incorpora un interior en espuma y tejido hipo alérgico desmontable', 'imagesCategorias/motor/casco.png'),
	(2, 5, 'Chaqueta Alpinestars T-Jaws WP Negro', 'Una chaqueta textil de estilo agresivo que es ideal tanto para un uso deportivo como para su uso en ciudad', 'imagesCategorias/motor/chaqueta.png'),
	(3, 5, 'Guantes Dainese Mig C2  Blancos', 'Guantes cortos de look racing y agresivo, muy confortables. Confeccionados en piel vacuna de gran resistencia con la palma reforzada en piel sintética', 'imagesCategorias/motor/guantes.png'),
	(4, 5, 'Pantalón Apinestars Andes Drystar', 'Pantalón muy versátil, que se adapta a la perfección ante cualquier situación climática, gracias al exclusivo tejido Drystar® de Alpinestars (100% impermeable y transpirable), al forro térmico desmontable y a las entradas de aire. ', 'imagesCategorias/motor/pantalones.png'),
	(5, 5, 'Botas Fox Bomber Negras', ' Botas de caña más baja que las habituales de Fox, pero con la misma solidez y fiabilidad; ofrecen máxima comodidad y sujeción durante todo el día y son ideales para desplazamientos urbanos, ATV y pit bike.', 'imagesCategorias/motor/botas.png'),
	(6, 5, 'Gafas Fox AIRSPC Enduro', 'Han sido diseñadas para las condiciones climáticas más frías. La doble lente crea una barrera térmica entre la cara y los elementos externos, consiguiendo una visión libre de vaho.', 'imagesCategorias/motor/gafas.png');
=======
>>>>>>> 5e0bf0047292e4e5010362d0de18256dab3108d6
  `idSubcategoria` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `imagen` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categoria_idx` (`idSubcategoria`),
  CONSTRAINT `FK_categorias` FOREIGN KEY (`idSubcategoria`) REFERENCES `subcategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.productos: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
<<<<<<< HEAD
INSERT INTO `productos` (`id`, `idSubcategoria`, `nombre`, `descripcion`, `imagen`) VALUES
	(7, 1, 'Balón de baloncesto tarmak 300 azul kipsta', 'Balón ideal para jugar en el exterior. Su revestimiento de caucho le proporciona una excelente resistencia y su diseño específico ofrece un agarre perfecto.', 'images/productos/pelota/baloncesto/balon.png'),
	(8, 4, 'Casco Hebo Stage Negro', 'Casco fabricado en material termoplástico ABS e interior en EPS de 2 densidades, diseñado para la práctica del Off-Road. Disponible en 2 tallas de calota, el Stage incorpora un interior en espuma y tejido hipo alérgico desmontable', 'images/productos/motor/motoCross/casco.png'),
	(10, 4, 'Chaqueta Alpinestars T-Jaws WP Negro', 'Una chaqueta textil de estilo agresivo que es ideal tanto para un uso deportivo como para su uso en ciudad', 'images/productos/motor/motoCross/chaqueta.png'),
	(11, 4, 'Guantes Dainese Mig C2  Blancos', 'Guantes cortos de look racing y agresivo, muy confortables. Confeccionados en piel vacuna de gran resistencia con la palma reforzada en piel sintética', 'images/productos/motor/motoCross/guantes.png'),
	(12, 4, 'Pantalón Apinestars Andes Drystar', 'Pantalón muy versátil, que se adapta a la perfección ante cualquier situación climática, gracias al exclusivo tejido Drystar® de Alpinestars (100% impermeable y transpirable), al forro térmico desmontable y a las entradas de aire. ', 'images/productos/motor/motoCross/pantalones.png'),
	(13, 4, 'Botas Fox Bomber Negras', 'Botas de caña más baja que las habituales de Fox, pero con la misma solidez y fiabilidad; ofrecen máxima comodidad y sujeción durante todo el día y son ideales para desplazamientos urbanos, ATV y pit bike.', 'images/productos/motor/motoCross/botas.png'),
	(14, 4, 'Gafas Fox AIRSPC Enduro', 'Han sido diseñadas para las condiciones climáticas más frías. La doble lente crea una barrera térmica entre la cara y los elementos externos, consiguiendo una visión libre de vaho.', 'images/productos/motor/motoCross/gafas.png');
=======
INSERT INTO `productos` (`id`, `idSubcategoria`, `nombre`, `descripcion`, `imagen`, `palabrasClave`) VALUES
	(7, 1, 'Balón de baloncesto tarmak 300 azul kipsta', 'Balón ideal para jugar en el exterior. Su revestimiento de caucho le proporciona una excelente resistencia y su diseño específico ofrece un agarre perfecto.', 'images/productos/pelota/baloncesto/balon.png', 'Balones,Balon de baloncesto, Baloncesto,balón, Balón de baloncesto,Balones de baloncesto'),
	(8, 4, 'Casco Hebo Stage Negro', 'Casco fabricado en material termoplástico ABS e interior en EPS de 2 densidades, diseñado para la práctica del Off-Road. Disponible en 2 tallas de calota, el Stage incorpora un interior en espuma y tejido hipo alérgico desmontable', 'images/productos/motor/motoCross/casco.png', 'Cascos,Casco de motorista,Motos'),
	(10, 4, 'Chaqueta Alpinestars T-Jaws WP Negro', 'Una chaqueta textil de estilo agresivo que es ideal tanto para un uso deportivo como para su uso en ciudad', 'images/productos/motor/motoCross/chaqueta.png', 'Chaquetas,Chaqueta de motorista,Motos,Chaquetas de motorista'),
	(11, 4, 'Guantes Dainese Mig C2  Blancos', 'Guantes cortos de look racing y agresivo, muy confortables. Confeccionados en piel vacuna de gran resistencia con la palma reforzada en piel sintética', 'images/productos/motor/motoCross/guantes.png', 'Guantes,Motos, Guantes de motorista'),
	(12, 4, 'Pantalón Apinestars Andes Drystar', 'Pantalón muy versátil, que se adapta a la perfección ante cualquier situación climática, gracias al exclusivo tejido Drystar® de Alpinestars (100% impermeable y transpirable), al forro térmico desmontable y a las entradas de aire. ', 'images/productos/motor/motoCross/pantalones.png', 'Pantalones,Pantalón,Motos,Motorista'),
	(13, 4, 'Botas Fox Bomber Negras', 'Botas de caña más baja que las habituales de Fox, pero con la misma solidez y fiabilidad; ofrecen máxima comodidad y sujeción durante todo el día y son ideales para desplazamientos urbanos, ATV y pit bike.', 'images/productos/motor/motoCross/botas.png', 'Botas, Motos,Motorista'),
	(14, 4, 'Gafas Fox AIRSPC Enduro', 'Han sido diseñadas para las condiciones climáticas más frías. La doble lente crea una barrera térmica entre la cara y los elementos externos, consiguiendo una visión libre de vaho.', 'images/productos/motor/motoCross/gafas.png', 'Gafas, Motos,Motorista');
>>>>>>> jorge
>>>>>>> 5e0bf0047292e4e5010362d0de18256dab3108d6
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.subcategorias
CREATE TABLE IF NOT EXISTS `subcategorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idCategoria` int(11) NOT NULL,
<<<<<<< HEAD
=======
<<<<<<< HEAD
  PRIMARY KEY (`id`),
  KEY `FKCategoria` (`idCategoria`),
  CONSTRAINT `FKCategoria` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.subcategorias: ~14 rows (aproximadamente)
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` (`id`, `nombre`, `idCategoria`) VALUES
	(1, 'Baloncesto', 6),
	(2, 'Futbol', 6),
	(3, 'Tennis', 6),
	(4, 'Moto crosh', 2),
	(5, 'Fronton', 6),
	(6, 'Balminton', 6),
	(7, 'Golf', 6),
	(8, 'Balonmano', 6),
	(9, 'Beisbol', 6),
	(10, 'Waterpolo', 1),
	(11, 'Bowling', 6),
	(12, 'Boleibol', 6),
	(13, 'Billar', 6),
	(14, 'Hockey', 6);
=======
>>>>>>> 5e0bf0047292e4e5010362d0de18256dab3108d6
  `imagen` varchar(100) DEFAULT NULL,
  `icono` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKCategoria` (`idCategoria`),
  CONSTRAINT `FKCategoria` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.subcategorias: ~19 rows (aproximadamente)
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` (`id`, `nombre`, `idCategoria`, `imagen`, `icono`) VALUES
	(1, 'Baloncesto', 6, NULL, 'images/iconos/012-basketball.png'),
	(2, 'Futbol', 6, NULL, 'images/iconos/011-soccer-ball.png'),
	(3, 'Tennis', 6, NULL, 'images/iconos/010-tennis.png'),
	(4, 'Motocross', 5, 'verano/cross.jpg', ''),
	(6, 'Bádminton', 6, NULL, 'images/iconos/009-badminton.png'),
	(7, 'Golf', 6, NULL, 'images/iconos/008-golfer.png'),
	(8, 'Balonmano', 6, NULL, 'images/iconos/007-handball.png'),
	(9, 'Beisbol', 6, NULL, 'images/iconos/006-baseball.png'),
	(10, 'Waterpolo', 1, NULL, 'images/iconos/005-waterpolo-player-with-the-balls-in-the-water.png'),
	(11, 'Bowling', 6, NULL, 'images/iconos/004-person-throwing-bowling-ball.png'),
	(12, 'Boleibol', 6, NULL, 'images/iconos/volleyball.png'),
	(13, 'Billar', 6, NULL, 'images/iconos/003-person-playing-billiard.png'),
	(14, 'Hockey', 6, NULL, 'images/iconos/002-ice-hockey-player.png'),
	(15, 'Sky', 3, 'invierno/sky.jpg', 'images/iconos/001-skiing-stickman.png'),
	(17, 'Snowboard', 3, 'invierno/snow.jpg', ''),
	(18, 'Escalada', 2, 'invierno/escalada.jpg', ''),
	(20, 'Running', 4, 'verano/running.jpg', ''),
	(21, 'Motos de Agua', 1, 'verano/motosdeagua.jpg', '');
<<<<<<< HEAD
=======
>>>>>>> jorge
>>>>>>> 5e0bf0047292e4e5010362d0de18256dab3108d6
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contraseña` varchar(1000) NOT NULL,
  `imagen` varchar(50) NOT NULL DEFAULT '0.jpg',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.usuarios: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `contraseña`, `imagen`) VALUES
	(1, 'jorge', 'cabrera sánchez', 'jorge@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0.jpg');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
