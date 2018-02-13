-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.6.26-log - MySQL Community Server (GPL)
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

-- Volcando datos para la tabla bdtruekup.busquedaproductos: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `busquedaproductos` DISABLE KEYS */;
INSERT INTO `busquedaproductos` (`idProducto`, `idPalabraClave`) VALUES
	(8, 5),
	(8, 6),
	(8, 12),
	(10, 12),
	(11, 12),
	(12, 12),
	(13, 12),
	(14, 12);
/*!40000 ALTER TABLE `busquedaproductos` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `icono` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.categorias: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` (`id`, `nombre`, `imagen`, `icono`) VALUES
	(1, 'Acuaticos', 'images/carousel/surf-1150x350.png', 'images/iconos/sea.png'),
	(2, 'Extremos', 'images/carousel/bici-1150x350.png', 'images/iconos/bungee-jumping.png'),
	(3, 'Invierno', 'images/carousel/esqui-1150x350.png', 'images/iconos/snowflake.png'),
	(4, 'Montaña', 'images/carousel/senderista.png', 'images/iconos/goal.png'),
	(5, 'Motor', 'images/carousel/motor.png', 'images/iconos/engine.png'),
	(6, 'Pelota', 'images/carousel/entrenamiento_baloncesto.png', 'images/iconos/yoga-ball.png');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.chats
CREATE TABLE IF NOT EXISTS `chats` (
  `idUsuario1` int(11) NOT NULL,
  `idUsuario2` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario2`,`idUsuario1`),
  KEY `FK_idUsuario1Chat` (`idUsuario1`),
  CONSTRAINT `FK_idUsuario1Chat` FOREIGN KEY (`idUsuario1`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_idUsuario2Chat` FOREIGN KEY (`idUsuario2`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.chats: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` (`idUsuario1`, `idUsuario2`) VALUES
	(3, 5),
	(7, 3);
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.deseados
CREATE TABLE IF NOT EXISTS `deseados` (
  `idUsuario` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`idProducto`),
  KEY `FK_Productos` (`idProducto`),
  CONSTRAINT `FK_Productos` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.deseados: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `deseados` DISABLE KEYS */;
INSERT INTO `deseados` (`idUsuario`, `idProducto`) VALUES
	(3, 7),	
	(3, 30),
	(3, 31),
	(3, 32),
	(3, 34),
	(3, 35),
	(7, 12),
	(11, 15),
	(11, 16);
/*!40000 ALTER TABLE `deseados` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.historialtruekes
CREATE TABLE IF NOT EXISTS `historialtruekes` (
  `idHistorial` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario1` int(11) NOT NULL DEFAULT '0',
  `idUsuario2` int(11) NOT NULL DEFAULT '0',
  `idProducto1` int(11) NOT NULL DEFAULT '0',
  `idProducto2` int(11) NOT NULL DEFAULT '0',
  `fecha_inicio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_fin` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idHistorial`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.historialtruekes: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `historialtruekes` DISABLE KEYS */;
INSERT INTO `historialtruekes` (`idHistorial`, `idUsuario1`, `idUsuario2`, `idProducto1`, `idProducto2`, `fecha_inicio`, `fecha_fin`) VALUES
	(1, 3, 5, 7, 8, '2018-01-25 19:52:27', '2018-01-25 19:52:28'),
	(2, 5, 7, 32, 13, '2018-01-25 23:07:23', '2018-01-25 23:07:23'),
	(3, 5, 3, 7, 32, '2018-01-25 23:25:58', '2018-01-25 23:25:58');
/*!40000 ALTER TABLE `historialtruekes` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.palabrasclave
CREATE TABLE IF NOT EXISTS `palabrasclave` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `palabra` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.palabrasclave: ~14 rows (aproximadamente)
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
  `idSubcategoria` int(11) NOT NULL,
  `idPropietario` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `imagen` varchar(100) NOT NULL,
  `imagenes` text,
  `caracteristicas` text,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_categoria_idx` (`idSubcategoria`),
  CONSTRAINT `FK_categorias` FOREIGN KEY (`idSubcategoria`) REFERENCES `subcategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.productos: ~31 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`id`, `idSubcategoria`, `idPropietario`, `nombre`, `descripcion`, `imagen`, `imagenes`, `caracteristicas`, `visible`) VALUES
	(7, 1, 3, 'Balón de baloncesto tarmak 300 azul kipsta', 'Balón ideal para jugar en el exterior. Su revestimiento de caucho le proporciona una excelente resistencia y su diseño específico ofrece un agarre perfecto.', 'images/productos/pelota/baloncesto/balon.jpg', 'images/productos/pelota/baloncesto/balon.jpg images/productos/pelota/baloncesto/balon1.jpg images/productos/pelota/baloncesto/balon2.jpg images/productos/pelota/baloncesto/balon3.jpg', NULL, 0),
	(8, 4, 5, 'Casco Hebo Stage Negro', 'Casco fabricado en material termoplástico ABS e interior en EPS de 2 densidades, diseñado para la práctica del Off-Road. Disponible en 2 tallas de calota, el Stage incorpora un interior en espuma y tejido hipo alérgico desmontable', 'images/productos/motor/motoCross/casco.png', 'images/productos/motor/motoCross/casco.png', NULL, 0),
	(10, 4, 3, 'Chaqueta Alpinestars T-Jaws WP Negro', 'Una chaqueta textil de estilo agresivo que es ideal tanto para un uso deportivo como para su uso en ciudad', 'images/productos/motor/motoCross/chaqueta.png', 'images/productos/motor/motoCross/chaqueta.png', NULL, 0),
	(11, 4, 3, 'Guantes Dainese Mig C2  Blancos', 'Guantes cortos de look racing y agresivo, muy confortables. Confeccionados en piel vacuna de gran resistencia con la palma reforzada en piel sintética', 'images/productos/motor/motoCross/guantes.png', 'images/productos/motor/motoCross/guantes.png', NULL, 0),
	(12, 4, 3, 'Pantalón Apinestars Andes Drystar', 'Pantalón muy versátil, que se adapta a la perfección ante cualquier situación climática, gracias al exclusivo tejido Drystar® de Alpinestars (100% impermeable y transpirable), al forro térmico desmontable y a las entradas de aire. ', 'images/productos/motor/motoCross/pantalones.png', 'images/productos/motor/motoCross/pantalones.png', NULL, 0),
	(13, 4, 3, 'Botas Fox Bomber Negras', 'Botas de caña más baja que las habituales de Fox, pero con la misma solidez y fiabilidad; ofrecen máxima comodidad y sujeción durante todo el día y son ideales para desplazamientos urbanos, ATV y pit bike.', 'images/productos/motor/motoCross/botas.png', 'images/productos/motor/motoCross/botas.png', NULL, 0),
	(14, 4, 3, 'Gafas Fox AIRSPC Enduro', 'Han sido diseñadas para las condiciones climáticas más frías. La doble lente crea una barrera térmica entre la cara y los elementos externos, consiguiendo una visión libre de vaho.', 'images/productos/motor/motoCross/gafas.png', 'images/productos/motor/motoCross/gafas.png', NULL, 1),
	(15, 21, 5, 'Sea-Doo SPARK', 'Es la moto acuática más accesible del mercado y hace realidad el sueño de su familia de pasar días fantásticos en el agua. Es divertida, fácil de conducir y fácil de remolcar con un vehículo pequeño.', 'images/productos/acuaticos/motosdeagua/motodeagua.png', 'images/productos/acuaticos/motosdeagua/motodeagua.png', NULL, 0),
	(16, 21, 5, 'Sea-Doo GTI SE', 'Disfrute del sistema inteligente de freno y marcha atrás (iBR) y de numerosas características que aportan comodidad, como el asiento de paseo, el escalón para reembarque y el sistema de trim variable (VTS).', 'images/productos/acuaticos/motosdeagua/motodeagua1.png', 'images/productos/acuaticos/motosdeagua/motodeagua1.png', NULL, 0),
	(17, 21, 3, 'Sea-Doo Wake 155', 'El modelo perfecto si lo que quiere es pasar los días surcando olas y aumentando sus niveles de adrenalina. Incluye un mástil de esquí acuático retráctil con un punto de arrastre alto que mantiene la cuerda fuera del agua, nuestro exclusivo modo de esquí acuático y un portatablas extraíble.', 'images/productos/acuaticos/motosdeagua/motodeagua2.png', 'images/productos/acuaticos/motosdeagua/motodeagua2.png', NULL, 0),
	(18, 22, 3, 'Aqualung-Hot Shot', 'Una aleta única. Cómoda, compacta, potente.SMALL: 34-38 REGULAR: 38.5-43 X-LARGE: 43.5-47', 'images/productos/acuaticos/snorkelybuceo/aletabuceo.png', 'images/productos/acuaticos/snorkelybuceo/aletabuceo.png', NULL, 0),
	(19, 22, 3, 'Cressi Air Black', 'Esta máscara tiene una estructura cónica particular derivada directamente de la patente de Nano-máscara muy popular.', 'images/productos/acuaticos/snorkelybuceo/gafasbuceo.png', 'images/productos/acuaticos/snorkelybuceo/gafasbuceo.png', NULL, 0),
	(20, 22, 3, 'Seac Ego', 'Se ha decidido utilizar la Cordura 1000 para la realización de este chaleco buscando esencialmente maximizar la resistencia a la abrasión, en vista del uso intensivo que se hace de él en los centros de buceo.', 'images/productos/acuaticos/snorkelybuceo/chaleco.png', 'images/productos/acuaticos/snorkelybuceo/chaleco.png', NULL, 0),
	(21, 23, 5, 'Marlin Pro Red', 'Ofrece velocidad de navegación elevada sin renunciar a estabilidad ni confort. Con el MARLIN PRO 18 podrá acceder a cualquier zona que desee sin un gran esfuerzo físico debido a su diseño con ese propósito y que ha sido testado.', 'images/productos/acuaticos/piraguismo/piragua.png', 'images/productos/acuaticos/piraguismo/piragua.png', NULL, 0),
	(22, 23, 6, 'Kayak Marlin', 'Cuenta con un super equipamiento de serie para cubrir todas tus necesidades, como pala de aluminio, asiento con extra acolchado reforzado, cañeros, anillas en D distribuídas por el kayak para colgar accesorios.', 'images/productos/acuaticos/piraguismo/piragua1.png', 'images/productos/acuaticos/piraguismo/piragua1.png', NULL, 0),
	(23, 23, 7, 'Kayak Marlin Katamaran', 'Kayak ideal para aventuras en familia ya que puede ir una persona extra no adulta en el asiento central. Los cañeros y accesorios de pesca son fácilmente extraíbles cuando se desee.', 'images/productos/acuaticos/piraguismo/piragua2.png', 'images/productos/acuaticos/piraguismo/piragua2.png', NULL, 0),
	(24, 24, 8, 'Radar Alloy Senate', 'El Radar Alloy Senate, un ski acuático de slalom de alta gama hecho a mano en EEUU.', 'images/productos/acuaticos/skiacuatico/ski.png', 'images/productos/acuaticos/skiacuatico/ski.png', NULL, 0),
	(25, 24, 9, 'Radar Graphite Senate', 'Ski realizado para todo tipo de usuarios tanto de nivel bajo como alto.Ideal para velocidades de 29 a 34 MPH. ', 'images/productos/acuaticos/skiacuatico/ski2.png', 'images/productos/acuaticos/skiacuatico/ski2.png', NULL, 0),
	(26, 24, 6, 'Botas Radar Prime', 'Las Prime son unas botas de ski acuático básicas pero que ofrecen un increible rendimiento.', 'images/productos/acuaticos/skiacuatico/botas.png', 'images/productos/acuaticos/skiacuatico/botas.png', NULL, 0),
	(27, 25, 7, 'Tabla Goya Bolt ', 'Tiene praticamente las prestaciones de una tabla de slalom en velocidad y aceleración.Menos técnica, mas fácil de llevar, y mas manejable.', 'images/productos/acuaticos/windsurf/tabla.png', 'images/productos/acuaticos/windsurf/tabla.png', NULL, 0),
	(28, 25, 8, 'Vela Prolimit Powerkid', 'Mástil de dos piezas de fibra.Botavara de diametro fino, muy ligera y diseñada para los mas pequeños.', 'images/productos/acuaticos/windsurf/vela.png', 'images/productos/acuaticos/windsurf/vela.png', NULL, 0),
	(29, 25, 9, 'Arnes Dakine T7', 'Arnés de windsurf Dakine T7, para windsurfistas que quieran las máximas prestaciones en uno de los mejores arneses para para windsurf.  Con pre curva deformada, interior en espuma inteligente, con doble cinturón una de las mejores compras.', 'images/productos/acuaticos/windsurf/arnes.png', NULL, NULL, 0),
	(30, 15, 6, 'Fischer Ranger 90 TI', 'Un rendimiento fiable en todos los terrenos: en polvo, pistas y terrenos difíciles - el Ranger 90 Ti le da estabilidad en todas las situaciones. Gracias al carbono y la pared lateral.', 'images/productos/invierno/sky/skiInvierno.png', NULL, NULL, 0),
	(31, 15, 7, 'Blizzard Brahma', 'Potente Rendimiento Todo Terreno En Todo Tipo De Condiciones De Nieve. Nuestra Más Reciente Construcción Powerdrive Free Desprende Una Potencia Suave Y Dinámica, Una Energía Juguetona, Y Un Agarre Revolucionario.', 'images/productos/invierno/sky/skyInvierno1.png', NULL, NULL, 0),
	(32, 15, 8, 'Atomic Hawx Prime 110', 'El botín de talla media más vendido del mundo.El aislamiento Thinsulate TM 3M ™ mantiene tus pies tan cálidos y cómodos como podrías desear. ', 'images/productos/invierno/sky/botasSky.png', NULL, NULL, 0),
	(33, 17, 9, 'K2 Raygun Snowboard', 'La construcción ICG Glass ™ infunde carbono en este núcleo de madera ya de amapola para una sensación aún más activa y poder direccional.', 'images/productos/invierno/snow/snow.png', NULL, NULL, 0),
	(34, 17, 6, 'Dc shoes Mora Boax', ' Botas de snowboard con sistema de cierre BOA para Mujer.Sistema de cierre Dual Boa con carrete H3 Coiler,suela de goma Contact Unilite.', 'images/productos/invierno/snow/botasSnow.png', NULL, NULL, 0),
	(35, 17, 7, 'Nitro Zero', 'El marco base Stealth Open AIR proporciona una flexión media e incorpora nuestro MINI DISC 2 × 4, para proporcionar la mejor sensación de tabla real y flexibilidad debajo del pie.', 'images/productos/invierno/snow/fijacion.png', NULL, NULL, 0),
	(36, 18, 8, 'Vasak Flexlock', 'El Vasak Flexlock es un crampón clásico de para uso general en montañismo. Diseñado como crampón de marcha y ascensiones clásicas sobre nieve y hielo alpino. ', 'images/productos/invierno/alpinismo/pielet.png', NULL, NULL, 0),
	(37, 18, 9, 'Viper Adze Black diamond', 'El Black Diamond Viper es un novedoso piolet con cabeza modular que permite sustituir la hoja, la pala o la maza. ', 'images/productos/invierno/alpinismo/piolet.png', NULL, NULL, 0),
	(38, 18, 7, 'SITTA', 'El Sitta es el nuevo arnés de Petzl, diseñado para expertos y profesionales de cualquier actividad en el mundo vertical como, escalada deportiva, clásica, en hielo o alpinismo ya sea técnico o clásico.', 'images/productos/invierno/alpinismo/arnes.png', NULL, NULL, 0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.subcategorias
CREATE TABLE IF NOT EXISTS `subcategorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `icono` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKCategoria` (`idCategoria`),
  CONSTRAINT `FKCategoria` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.subcategorias: ~32 rows (aproximadamente)
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` (`id`, `nombre`, `idCategoria`, `imagen`, `icono`) VALUES
	(1, 'Baloncesto', 6, NULL, 'images/iconos/012-basketball.png'),
	(2, 'Futbol', 6, NULL, 'images/iconos/011-soccer-ball.png'),
	(3, 'Tennis', 6, NULL, 'images/iconos/010-tennis.png'),
	(4, 'Motocross', 5, 'verano/cross.jpg', 'images/iconos/motorcyclist.png'),
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
	(17, 'Snowboard', 3, 'invierno/snow.jpg', 'images/iconos/snowboarding.png'),
	(18, 'Alpinismo', 2, 'invierno/escalada.jpg', 'images/iconos/climbing-silhouette.png'),
	(20, 'Running', 4, 'verano/running.jpg', 'images/iconos/runner.png'),
	(21, 'Motos de Agua', 1, 'verano/motosdeagua.jpg', 'images/iconos/water-craft.png'),
	(22, 'Snorkel y Buceo', 1, NULL, 'images/iconos/snorkel.png'),
	(23, 'Piraguismo', 1, NULL, 'images/iconos/canoe.png'),
	(24, 'Esqui Acuatico', 1, NULL, 'images/iconos/water-ski.png'),
	(25, 'Windsurf', 1, NULL, 'images/iconos/windsurf.png'),
	(26, 'Salto Base', 2, NULL, 'images/iconos/superman-flying.png'),
	(27, 'Paracaidismo', 2, NULL, 'images/iconos/paratrooper-falling-silhouette.png'),
	(28, 'Parapente', 2, NULL, 'images/iconos/paragliding.png'),
	(29, 'Patinaje sobre hielo', 3, NULL, 'images/iconos/ice-skater.png'),
	(30, 'Snowbike', 3, NULL, 'images/iconos/snowmobile.png'),
	(31, 'Ciclismo de Montaña', 4, NULL, 'images/iconos/adventure.png'),
	(32, 'Senderismo', 4, NULL, 'images/iconos/hiker.png'),
	(33, 'Escalada', 4, NULL, 'images/iconos/climber.png'),
	(34, 'Karting', 5, NULL, 'images/iconos/karting.png'),
	(35, 'Motos de Nieve', 5, NULL, 'images/iconos/snowmobile1.png');
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.trades
CREATE TABLE IF NOT EXISTS `trades` (
  `idTrade` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario1` int(11) NOT NULL DEFAULT '0',
  `idUsuario2` int(11) NOT NULL DEFAULT '0',
  `idProducto1` int(11) NOT NULL DEFAULT '0',
  `idProducto2` int(11) NOT NULL DEFAULT '0',
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('Pendiente','Finalizado') DEFAULT NULL,
  PRIMARY KEY (`idTrade`),
  KEY `FK_idUsuario1` (`idUsuario1`),
  KEY `FK_idUsuario2` (`idUsuario2`),
  KEY `FK_idProducto1` (`idProducto1`),
  KEY `FK_idProducto2` (`idProducto2`),
  CONSTRAINT `FK_idProducto1` FOREIGN KEY (`idProducto1`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_idProducto2` FOREIGN KEY (`idProducto2`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_idUsuario1` FOREIGN KEY (`idUsuario1`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_idUsuario2` FOREIGN KEY (`idUsuario2`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.trades: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `trades` DISABLE KEYS */;
INSERT INTO `trades` (`idTrade`, `idUsuario1`, `idUsuario2`, `idProducto1`, `idProducto2`, `fecha`, `estado`) VALUES
	(3, 3, 5, 7, 8, '2018-01-25 19:19:55', 'Pendiente'),
	(4, 5, 7, 32, 13, '2018-01-25 20:34:19', 'Finalizado'),
	(5, 3, 9, 32, 31, '2018-01-25 21:00:47', 'Pendiente'),
	(7, 7, 5, 32, 7, '2018-01-25 21:42:54', 'Finalizado');
/*!40000 ALTER TABLE `trades` ENABLE KEYS */;

-- Volcando estructura para tabla bdtruekup.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contraseña` varchar(1000) DEFAULT NULL,
  `imagen` varchar(50) NOT NULL DEFAULT '0.jpg',
  `fechaAlta` timestamp NOT NULL DEFAULT current_timestamp(),
  `direccion` varchar(50) DEFAULT 'Introducir nueva dirección',
  `provincia` varchar(50) DEFAULT 'Sin introducir',
  `fechaNacimiento` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bdtruekup.usuarios: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contraseña`, `imagen`, `fechaAlta`, `direccion`, `provincia`, `fechaNacimiento`) VALUES
	(3, 'Jorge Cabrera Sánchez', 'jorge@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0.jpg', '2018-01-10 20:29:25', NULL, 'Sin introducir', NULL),
	(5, 'borja orts', 'borja@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0.jpg', '2018-01-11 17:14:05', NULL, 'Sin introducir', NULL),
	(6, 'david poveda', 'david@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', '0.jpg', '2018-01-11 18:08:23', NULL, 'Sin introducir', NULL),
	(7, 'DAVID poveda', 'david2@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', '0.jpg', '2018-01-11 18:16:22', NULL, 'Sin introducir', NULL),
	(8, 'asdad asdas', 'david3@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', '0.jpg', '2018-01-11 18:17:03', NULL, 'Sin introducir', NULL),
	(9, 'jorge cabrera', 'j@gmail.com', '00787666ba1cc85ca3e571fcf6b92c3ea8b3eeb6', '0.jpg', '2018-01-11 19:23:27', NULL, 'Sin introducir', NULL),
	(10, 'aaaaa aaaaa', 'a@a.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', '0.jpg', '2018-01-23 16:54:56', NULL, 'Sin introducir', NULL),
	(11, 'David Poveda Bartolome', 'aa@a.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', '5.JPG', '2018-01-23 16:57:10', 'Santiago Rusiñol 33 a 2', 'Madrid', NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
