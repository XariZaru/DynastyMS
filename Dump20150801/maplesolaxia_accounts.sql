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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(13) NOT NULL DEFAULT '',
  `password` varchar(128) NOT NULL DEFAULT '',
  `salt` varchar(128) DEFAULT NULL,
  `pin` varchar(10) DEFAULT NULL,
  `pic` varchar(26) DEFAULT NULL,
  `loggedin` tinyint(4) NOT NULL DEFAULT '0',
  `lastlogin` timestamp NULL DEFAULT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `birthday` date NOT NULL DEFAULT '0000-00-00',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `banreason` text,
  `gm` tinyint(1) NOT NULL DEFAULT '0',
  `macs` tinytext,
  `nxCredit` int(11) DEFAULT NULL,
  `maplePoint` int(11) DEFAULT NULL,
  `nxPrepaid` int(11) DEFAULT NULL,
  `characterslots` tinyint(2) NOT NULL DEFAULT '5',
  `gender` tinyint(2) NOT NULL DEFAULT '10',
  `tempban` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `greason` tinyint(4) NOT NULL DEFAULT '0',
  `tos` tinyint(1) NOT NULL DEFAULT '0',
  `sitelogged` text,
  `webadmin` int(1) DEFAULT '0',
  `nick` varchar(20) DEFAULT NULL,
  `mute` int(1) DEFAULT '0',
  `email` varchar(45) DEFAULT NULL,
  `ip` text,
  `rewardpoints` int(11) NOT NULL DEFAULT '0',
  `hwid` varchar(12) NOT NULL DEFAULT '',
  `votepoints` int(11) NOT NULL,
  `donorpoints` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `ranking1` (`id`,`banned`,`gm`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Xari','matkimj',NULL,NULL,NULL,2,'2015-07-28 20:03:02','2015-07-13 05:28:11','0000-00-00',0,NULL,1,'40-16-7E-64-B4-8E',10145300,0,0,5,0,'0000-00-00 00:00:00',0,1,'1437426791',1,NULL,0,NULL,NULL,0,'',0,0),(2,'EliTest','EliTest',NULL,NULL,NULL,0,'2015-07-20 04:52:56','2015-07-13 15:55:07','0000-00-00',0,NULL,0,'74-DE-2B-E5-5C-4D, 7A-79-19-8A-8E-FE',4300,0,0,5,0,'0000-00-00 00:00:00',0,1,NULL,0,NULL,0,NULL,NULL,0,'',0,0),(3,'Winsane','Winsane',NULL,NULL,NULL,0,'2015-07-27 14:52:37','2015-07-14 16:38:06','0000-00-00',0,NULL,1,'D4-3D-7E-4B-BA-09',229991,0,0,5,0,'0000-00-00 00:00:00',0,1,NULL,0,NULL,0,NULL,NULL,0,'',0,0),(4,'jamie','jamie',NULL,NULL,NULL,0,'2015-07-17 01:33:49','2015-07-17 01:11:24','0000-00-00',0,NULL,0,'D0-50-99-0F-28-E7',0,0,0,5,0,'0000-00-00 00:00:00',0,1,NULL,0,NULL,0,NULL,NULL,0,'',0,0),(5,'david','david',NULL,NULL,NULL,0,'2015-07-18 00:11:32','2015-07-17 01:28:33','0000-00-00',0,NULL,0,'BC-5F-F4-E6-1D-B1',116844,0,0,5,0,'0000-00-00 00:00:00',0,1,NULL,0,NULL,0,NULL,NULL,0,'',0,0),(6,'betatest','betatest',NULL,NULL,NULL,0,'2015-07-17 22:22:07','2015-07-17 21:26:05','0000-00-00',0,NULL,0,'00-15-E9-2B-52-F2',0,0,0,5,0,'0000-00-00 00:00:00',0,1,NULL,0,NULL,0,NULL,NULL,0,'',0,0),(7,'betatest1','betatest1',NULL,NULL,NULL,0,NULL,'2015-07-17 21:27:09','0000-00-00',0,NULL,0,NULL,NULL,NULL,NULL,5,10,'0000-00-00 00:00:00',0,0,NULL,0,NULL,0,NULL,NULL,0,'',0,0),(8,'betatest2','betatest2',NULL,NULL,NULL,0,'2015-07-24 02:42:04','2015-07-24 01:21:37','0000-00-00',0,NULL,0,'02-19-F9-2E-01-1E',0,0,0,5,0,'0000-00-00 00:00:00',0,1,NULL,0,NULL,0,NULL,NULL,0,'',0,0),(9,'LegendXV','james',NULL,NULL,NULL,0,NULL,'2015-07-25 03:16:44','1990-01-01',0,NULL,0,NULL,NULL,NULL,NULL,5,10,'0000-00-00 00:00:00',0,0,NULL,0,NULL,0,'iconicimages22@yahoo.com','174.77.59.78',0,'',0,0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-01 12:58:29
