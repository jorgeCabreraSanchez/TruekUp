-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.2.11-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para bdtruekup
CREATE DATABASE IF NOT EXISTS `bdtruekup` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bdtruekup`;

-- Volcando estructura para tabla bdtruekup.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.categorias: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` (`id`, `nombre`, `imagen`) VALUES
	(1, 'Acuaticos', 'images/carousel/surf-1150x350.png'),
	(2, 'Extremos', 'images/carousel/bici-1150x350.png'),
	(3, 'Invierno', 'images/carousel/esqui-1150x350.png'),
	(4, 'Montaña', 'images/carousel/senderista.png'),
	(5, 'Motor', 'images/carousel/motor.png'),
	(6, 'Pelota', 'images/carousel/entrenamiento_baloncesto.png'),
	(7, 'Otros', NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.subcategorias
CREATE TABLE IF NOT EXISTS `subcategorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idCategoria` int(11) NOT NULL,
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
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
