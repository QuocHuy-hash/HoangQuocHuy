-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: 127.0.0.1    Database: test-task
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `keytokens`
--

DROP TABLE IF EXISTS `keytokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keytokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `publicKey` json NOT NULL,
  `privateKey` json NOT NULL,
  `refreshTokensUsed` json DEFAULT NULL,
  `refreshToken` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `keytokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keytokens`
--

LOCK TABLES `keytokens` WRITE;
/*!40000 ALTER TABLE `keytokens` DISABLE KEYS */;
INSERT INTO `keytokens` VALUES (2,4,'\"537f237ca45609b1a0f9da2083b1321fa1d5d768ed35b49b63ef17b3fd84e3245bd704514c25b21d95f0c71a32da070a3ef7e8db2ad7c039aff9e31866a98187\"','\"944d1dbecec7976ada55380ab0af1dadfb4475f3537eaa34ca3c488d6053810f7149c1a36b98bc4fd678bbc89452b8ace58028a1adf8e57c5c538d4b8b82fdbc\"',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiaGFpMTIzQGdtYWlsLmNvbSIsImlhdCI6MTcxMzc4MDkwNywiZXhwIjoxNzE0Mzg1NzA3fQ.amxFkw86sDO63u-5LydHGUNzQrnHlkw0r4NZ5BsY8yc','2024-04-22 09:33:18','2024-04-22 10:15:07'),(24,3,'\"3270962d9834809b3cccacff2deb3a97cfcffb9cb30c2fae0741307b1ad8ea5cb7e4deba1f212281eb7e15b533c8aae89dc08242196ac614d3cdfff66d953627\"','\"2d6865ecb8764a745baf7cd26af340101cf9d7b2ea10cfb9fb2df11d678454c748182f43b443ecc412ca2ed5061bd91e245a858e89b37b69c90e0f34ce07010e\"',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiaHV5MTIzQGdtYWlsLmNvbSIsImlhdCI6MTcxMzg1MjE4NiwiZXhwIjoxNzE0NDU2OTg2fQ.f1INK6S8RqObWoxOVVUzDQvWhn8X4xCMYpdoP9e099M','2024-04-23 06:03:06','2024-04-23 06:03:06');
/*!40000 ALTER TABLE `keytokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20240422051604-create-user.js'),('20240422051635-create-todo-list.js'),('key-to-ken.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taskName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'created',
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'lear EL111','lear on The Coach','finished',3,'2024-04-22 09:43:03','2024-04-22 09:57:05'),(2,'lear EL doing','lear on The Coach11','doing',3,'2024-04-22 10:07:54','2024-04-23 03:23:02'),(4,'Play Footbal 001','lear on The Coach','created',5,'2024-04-22 10:10:12','2024-04-22 10:10:12'),(10,'lear EL doing11','lear on The Coach22','created',3,'2024-04-23 03:23:15','2024-04-23 03:23:15');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (3,'Quoc','Huy','$2b$10$zqbClppGCDRURftSaApLfOLrkb3LSEdbp.NOIu.oM2dK4Hhh/cxEq','huy123@gmail.com','2024-04-22 06:51:55','2024-04-22 06:51:55'),(4,'Quoc','Huy','$2b$10$CzxXGO5sdAiqyf0qMbxi5OxZVdfXODD.d.4Vd.La97jI4.Wm3tDx.','hai123@gmail.com','2024-04-22 09:33:18','2024-04-22 09:33:18'),(5,'my','trinh','$2b$10$vXLSQUsTEnSCyiXchH2aIO.8j2YFX1p5rvaeakWAfnsQlWsRkCX..','trinh@gmail.com','2024-04-22 13:54:52','2024-04-22 13:54:52');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 13:11:30
