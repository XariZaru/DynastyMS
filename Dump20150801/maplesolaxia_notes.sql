-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: maplesolaxia
-- ------------------------------------------------------
-- Server version	5.6.17

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
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to` varchar(40) NOT NULL DEFAULT '',
  `from` varchar(40) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `timestamp` bigint(20) unsigned NOT NULL,
  `fame` int(11) NOT NULL DEFAULT '0',
  `deleted` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (1,'Wincake','DAVID','\nee',1437177443411,1,1),(2,'DAVID','Wincake','ty',1437177682839,1,0),(3,'Wincake','Xari','ily friend',1437521617156,1,1),(4,'Xari','Wincake','',1437521691466,1,1),(5,'Xari','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437903818606,1,1),(6,'Xari','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437903818653,1,1),(7,'Xari','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437903818653,1,1),(8,'Xari','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437903818668,1,1),(9,'Xari','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437903818684,1,1),(10,'Wincake','Xari','hi',1437903875172,0,1),(11,'Xari','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437904109439,1,1),(12,'Xari','Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437932735816,0,1),(13,'Xari','Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437932735847,0,1),(14,'Xari','Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437932735847,0,1),(15,'Xari','Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437932735863,0,1),(16,'Xari','Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437932764582,0,1),(17,'Xari','Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437933055774,0,1),(18,'Xari','Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437933055805,0,1),(19,'Xari','Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437933055852,0,1),(20,'Xari','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437933326374,0,1),(21,'Xari','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437933372394,0,1),(22,'Xari','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437933433375,0,1),(23,'Wincake','Imperial Pidgeon','You\'ve received more quests from various people around the world who require your help. If possible, you should take a look through @helper.',1437933938756,0,1),(24,'Wincake','Imperial-Pidgeon','You have a total of 1 new quests from various people around the world who require your help. You should talk to Yue Lao for more information about this.',1438006438516,0,1),(25,'Wincake','Imperial-Pidgeon','You have a total of 1 new quests from various people around the world who require your help. You should talk to Yue Lao for more information about this.',1438006999308,0,1),(26,'Wincake','Imperial-Pidgeon','You have a total of 1 new quests from various people around the world who require your help. You should talk to Yue Lao for more information about this.',1438007614749,0,1),(27,'Xari','Imperial-Pidgeon','You have a total of 1 new quests from various people around the world who require your help. You should talk to Yue Lao for more information about this.',1438015393507,0,1);
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-01 12:58:33
