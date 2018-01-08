CREATE DATABASE  IF NOT EXISTS `bdtruekup` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bdtruekup`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: bdtruekup
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `busquedaproductos`
--

DROP TABLE IF EXISTS `busquedaproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `busquedaproductos` (
  `idProducto` int(11) NOT NULL,
  `idPalabraClave` int(11) NOT NULL,
  PRIMARY KEY (`idProducto`,`idPalabraClave`),
  KEY `FK_palabraClave` (`idPalabraClave`),
  KEY `FK_producto` (`idProducto`),
  CONSTRAINT `FK_palabraClave` FOREIGN KEY (`idPalabraClave`) REFERENCES `palabrasclave` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_producto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `busquedaproductos`
--

LOCK TABLES `busquedaproductos` WRITE;
/*!40000 ALTER TABLE `busquedaproductos` DISABLE KEYS */;
INSERT INTO `busquedaproductos` VALUES (8,5),(8,6),(8,12);
/*!40000 ALTER TABLE `busquedaproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `icono` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Acuaticos','images/carousel/surf-1150x350.png','images/iconos/sea.png'),(2,'Extremos','images/carousel/bici-1150x350.png','images/iconos/bungee-jumping.png'),(3,'Invierno','images/carousel/esqui-1150x350.png','images/iconos/snowflake.png'),(4,'Montaña','images/carousel/senderista.png','images/iconos/goal.png'),(5,'Motor','images/carousel/motor.png','images/iconos/engine.png'),(6,'Pelota','images/carousel/entrenamiento_baloncesto.png','images/iconos/yoga-ball.png');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `palabrasclave`
--

DROP TABLE IF EXISTS `palabrasclave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `palabrasclave` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `palabra` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palabrasclave`
--

LOCK TABLES `palabrasclave` WRITE;
/*!40000 ALTER TABLE `palabrasclave` DISABLE KEYS */;
INSERT INTO `palabrasclave` VALUES (1,'Balones'),(2,'Balones de baloncesto'),(3,'Baloncesto'),(4,'Guantes'),(5,'Cascos'),(6,'Cascos de motorista'),(7,'Motos'),(8,'Chaquetas'),(9,'Chaquetas de motorista'),(10,'Guantes de motorista'),(11,'Pantalones'),(12,'Motorista'),(13,'Botas'),(14,'Gafas');
/*!40000 ALTER TABLE `palabrasclave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idSubcategoria` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `imagen` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categoria_idx` (`idSubcategoria`),
  CONSTRAINT `FK_categorias` FOREIGN KEY (`idSubcategoria`) REFERENCES `subcategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (7,1,'Balón de baloncesto tarmak 300 azul kipsta','Balón ideal para jugar en el exterior. Su revestimiento de caucho le proporciona una excelente resistencia y su diseño específico ofrece un agarre perfecto.','images/productos/pelota/baloncesto/balon.png'),(8,4,'Casco Hebo Stage Negro','Casco fabricado en material termoplástico ABS e interior en EPS de 2 densidades, diseñado para la práctica del Off-Road. Disponible en 2 tallas de calota, el Stage incorpora un interior en espuma y tejido hipo alérgico desmontable','images/productos/motor/motoCross/casco.png'),(10,4,'Chaqueta Alpinestars T-Jaws WP Negro','Una chaqueta textil de estilo agresivo que es ideal tanto para un uso deportivo como para su uso en ciudad','images/productos/motor/motoCross/chaqueta.png'),(11,4,'Guantes Dainese Mig C2  Blancos','Guantes cortos de look racing y agresivo, muy confortables. Confeccionados en piel vacuna de gran resistencia con la palma reforzada en piel sintética','images/productos/motor/motoCross/guantes.png'),(12,4,'Pantalón Apinestars Andes Drystar','Pantalón muy versátil, que se adapta a la perfección ante cualquier situación climática, gracias al exclusivo tejido Drystar® de Alpinestars (100% impermeable y transpirable), al forro térmico desmontable y a las entradas de aire. ','images/productos/motor/motoCross/pantalones.png'),(13,4,'Botas Fox Bomber Negras','Botas de caña más baja que las habituales de Fox, pero con la misma solidez y fiabilidad; ofrecen máxima comodidad y sujeción durante todo el día y son ideales para desplazamientos urbanos, ATV y pit bike.','images/productos/motor/motoCross/botas.png'),(14,4,'Gafas Fox AIRSPC Enduro','Han sido diseñadas para las condiciones climáticas más frías. La doble lente crea una barrera térmica entre la cara y los elementos externos, consiguiendo una visión libre de vaho.','images/productos/motor/motoCross/gafas.png'),(15,21,'Sea-Doo SPARK','Es la moto acuática más accesible del mercado y hace realidad el sueño de su familia de pasar días fantásticos en el agua. Es divertida, fácil de conducir y fácil de remolcar con un vehículo pequeño.','images/productos/acuaticos/motosdeagua/motodeagua.png'),(16,21,'Sea-Doo GTI SE','Disfrute del sistema inteligente de freno y marcha atrás (iBR) y de numerosas características que aportan comodidad, como el asiento de paseo, el escalón para reembarque y el sistema de trim variable (VTS).','images/productos/acuaticos/motosdeagua/motodeagua1.png'),(17,21,'Sea-Doo Wake 155','El modelo perfecto si lo que quiere es pasar los días surcando olas y aumentando sus niveles de adrenalina. Incluye un mástil de esquí acuático retráctil con un punto de arrastre alto que mantiene la cuerda fuera del agua, nuestro exclusivo modo de esquí acuático y un portatablas extraíble.','images/productos/acuaticos/motosdeagua/motodeagua2.png'),(18,22,'Aqualung-Hot Shot','Una aleta única. Cómoda, compacta, potente.SMALL: 34-38 REGULAR: 38.5-43 X-LARGE: 43.5-47','images/productos/acuaticos/snorkelybuceo/aletabuceo.png'),(19,22,'Cressi Air Black','Esta máscara tiene una estructura cónica particular derivada directamente de la patente de Nano-máscara muy popular.','images/productos/acuaticos/snorkelybuceo/gafasbuceo.png'),(20,22,'Seac Ego','Se ha decidido utilizar la Cordura 1000 para la realización de este chaleco buscando esencialmente maximizar la resistencia a la abrasión, en vista del uso intensivo que se hace de él en los centros de buceo.','images/productos/acuaticos/snorkelybuceo/chaleco.png'),(21,23,'Marlin Pro Red','Ofrece velocidad de navegación elevada sin renunciar a estabilidad ni confort. Con el MARLIN PRO 18 podrá acceder a cualquier zona que desee sin un gran esfuerzo físico debido a su diseño con ese propósito y que ha sido testado.','images/productos/acuaticos/piraguismo/piragua.png'),(22,23,'Kayak Marlin','Cuenta con un super equipamiento de serie para cubrir todas tus necesidades, como pala de aluminio, asiento con extra acolchado reforzado, cañeros, anillas en D distribuídas por el kayak para colgar accesorios.','images/productos/acuaticos/piraguismo/piragua1.png'),(23,23,'Kayak Marlin Katamaran','Kayak ideal para aventuras en familia ya que puede ir una persona extra no adulta en el asiento central. Los cañeros y accesorios de pesca son fácilmente extraíbles cuando se desee.','images/productos/acuaticos/piraguismo/piragua2.png'),(24,24,'Radar Alloy Senate','El Radar Alloy Senate, un ski acuático de slalom de alta gama hecho a mano en EEUU.','images/productos/acuaticos/skiacuatico/ski.png'),(25,24,'Radar Graphite Senate','Ski realizado para todo tipo de usuarios tanto de nivel bajo como alto.Ideal para velocidades de 29 a 34 MPH. ','images/productos/acuaticos/skiacuatico/ski2.png'),(26,24,'Botas Radar Prime','Las Prime son unas botas de ski acuático básicas pero que ofrecen un increible rendimiento.','images/productos/acuaticos/skiacuatico/botas.png'),(27,25,'Tabla Goya Bolt ','Tiene praticamente las prestaciones de una tabla de slalom en velocidad y aceleración.Menos técnica, mas fácil de llevar, y mas manejable.','images/productos/acuaticos/windsurf/tabla.png'),(28,25,'Vela Prolimit Powerkid','Mástil de dos piezas de fibra.Botavara de diametro fino, muy ligera y diseñada para los mas pequeños.','images/productos/acuaticos/windsurf/vela.png'),(29,25,'Arnes Dakine T7','Arnés de windsurf Dakine T7, para windsurfistas que quieran las máximas prestaciones en uno de los mejores arneses para para windsurf.  Con pre curva deformada, interior en espuma inteligente, con doble cinturón una de las mejores compras.','images/productos/acuaticos/windsurf/arnes.png');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategorias`
--

DROP TABLE IF EXISTS `subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `icono` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKCategoria` (`idCategoria`),
  CONSTRAINT `FKCategoria` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorias`
--

LOCK TABLES `subcategorias` WRITE;
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` VALUES (1,'Baloncesto',6,NULL,'images/iconos/012-basketball.png'),(2,'Futbol',6,NULL,'images/iconos/011-soccer-ball.png'),(3,'Tennis',6,NULL,'images/iconos/010-tennis.png'),(4,'Motocross',5,'verano/cross.jpg','images/iconos/motorcyclist.png'),(6,'Bádminton',6,NULL,'images/iconos/009-badminton.png'),(7,'Golf',6,NULL,'images/iconos/008-golfer.png'),(8,'Balonmano',6,NULL,'images/iconos/007-handball.png'),(9,'Beisbol',6,NULL,'images/iconos/006-baseball.png'),(10,'Waterpolo',1,NULL,'images/iconos/005-waterpolo-player-with-the-balls-in-the-water.png'),(11,'Bowling',6,NULL,'images/iconos/004-person-throwing-bowling-ball.png'),(12,'Boleibol',6,NULL,'images/iconos/volleyball.png'),(13,'Billar',6,NULL,'images/iconos/003-person-playing-billiard.png'),(14,'Hockey',6,NULL,'images/iconos/002-ice-hockey-player.png'),(15,'Sky',3,'invierno/sky.jpg','images/iconos/001-skiing-stickman.png'),(17,'Snowboard',3,'invierno/snow.jpg','images/iconos/snowboarding.png'),(18,'Alpinismo',2,'invierno/escalada.jpg','images/iconos/climbing-silhouette.png'),(20,'Running',4,'verano/running.jpg','images/iconos/runner.png'),(21,'Motos de Agua',1,'verano/motosdeagua.jpg','images/iconos/water-craft.png'),(22,'Snorkel y Buceo',1,NULL,'images/iconos/snorkel.png'),(23,'Piraguismo',1,NULL,'images/iconos/canoe.png'),(24,'Esqui Acuatico',1,NULL,'images/iconos/water-ski.png'),(25,'Windsurf',1,NULL,'images/iconos/windsurf.png'),(26,'Salto Base',2,NULL,'images/iconos/superman-flying.png'),(27,'Paracaidismo',2,NULL,'images/iconos/paratrooper-falling-silhouette.png'),(28,'Parapente',2,NULL,'images/iconos/paragliding.png'),(29,'Patinaje sobre hielo',3,NULL,'images/iconos/ice-skater.png'),(30,'Snowbike',3,NULL,'images/iconos/snowmobile.png'),(31,'Ciclismo de Montaña',4,NULL,'images/iconos/adventure.png'),(32,'Senderismo',4,NULL,'images/iconos/hiker.png'),(33,'Escalada',4,NULL,'images/iconos/climber.png'),(34,'Karting',5,NULL,'images/iconos/karting.png'),(35,'Motos de Nieve',5,NULL,'images/iconos/snowmobile1.png');
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `usuario` varchar(20) NOT NULL,
  `contraseña` varchar(20) NOT NULL,
  PRIMARY KEY (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bdtruekup'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-08 21:51:13
