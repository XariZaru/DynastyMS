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
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountid` int(11) NOT NULL DEFAULT '0',
  `world` int(11) NOT NULL DEFAULT '0',
  `name` varchar(13) NOT NULL DEFAULT '',
  `level` int(11) NOT NULL DEFAULT '1',
  `exp` int(11) NOT NULL DEFAULT '0',
  `gachaexp` int(11) NOT NULL DEFAULT '0',
  `str` int(11) NOT NULL DEFAULT '12',
  `dex` int(11) NOT NULL DEFAULT '5',
  `luk` int(11) NOT NULL DEFAULT '4',
  `int` int(11) NOT NULL DEFAULT '4',
  `hp` int(11) NOT NULL DEFAULT '50',
  `mp` int(11) NOT NULL DEFAULT '5',
  `maxhp` int(11) NOT NULL DEFAULT '50',
  `maxmp` int(11) NOT NULL DEFAULT '5',
  `meso` int(11) NOT NULL DEFAULT '0',
  `hpMpUsed` int(11) unsigned NOT NULL DEFAULT '0',
  `job` int(11) NOT NULL DEFAULT '0',
  `skincolor` int(11) NOT NULL DEFAULT '0',
  `gender` int(11) NOT NULL DEFAULT '0',
  `fame` int(11) NOT NULL DEFAULT '0',
  `hair` int(11) NOT NULL DEFAULT '0',
  `face` int(11) NOT NULL DEFAULT '0',
  `ap` int(11) NOT NULL DEFAULT '0',
  `sp` varchar(128) NOT NULL DEFAULT '0,0,0,0,0,0,0,0,0,0',
  `map` int(11) NOT NULL DEFAULT '0',
  `spawnpoint` int(11) NOT NULL DEFAULT '0',
  `gm` tinyint(1) NOT NULL DEFAULT '0',
  `party` int(11) NOT NULL DEFAULT '0',
  `buddyCapacity` int(11) NOT NULL DEFAULT '25',
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rank` int(10) unsigned NOT NULL DEFAULT '1',
  `rankMove` int(11) NOT NULL DEFAULT '0',
  `jobRank` int(10) unsigned NOT NULL DEFAULT '1',
  `jobRankMove` int(11) NOT NULL DEFAULT '0',
  `guildid` int(10) unsigned NOT NULL DEFAULT '0',
  `guildrank` int(10) unsigned NOT NULL DEFAULT '5',
  `messengerid` int(10) unsigned NOT NULL DEFAULT '0',
  `messengerposition` int(10) unsigned NOT NULL DEFAULT '4',
  `mountlevel` int(9) NOT NULL DEFAULT '1',
  `mountexp` int(9) NOT NULL DEFAULT '0',
  `mounttiredness` int(9) NOT NULL DEFAULT '0',
  `omokwins` int(11) NOT NULL DEFAULT '0',
  `omoklosses` int(11) NOT NULL DEFAULT '0',
  `omokties` int(11) NOT NULL DEFAULT '0',
  `matchcardwins` int(11) NOT NULL DEFAULT '0',
  `matchcardlosses` int(11) NOT NULL DEFAULT '0',
  `matchcardties` int(11) NOT NULL DEFAULT '0',
  `MerchantMesos` int(11) DEFAULT '0',
  `HasMerchant` tinyint(1) DEFAULT '0',
  `equipslots` int(11) NOT NULL DEFAULT '24',
  `useslots` int(11) NOT NULL DEFAULT '24',
  `setupslots` int(11) NOT NULL DEFAULT '24',
  `etcslots` int(11) NOT NULL DEFAULT '24',
  `familyId` int(11) NOT NULL DEFAULT '-1',
  `monsterbookcover` int(11) NOT NULL DEFAULT '0',
  `allianceRank` int(10) NOT NULL DEFAULT '5',
  `vanquisherStage` int(11) unsigned NOT NULL DEFAULT '0',
  `dojoPoints` int(11) unsigned NOT NULL DEFAULT '0',
  `lastDojoStage` int(10) unsigned NOT NULL DEFAULT '0',
  `finishedDojoTutorial` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `vanquisherKills` int(11) unsigned NOT NULL DEFAULT '0',
  `summonValue` int(11) unsigned NOT NULL DEFAULT '0',
  `partnerId` int(11) NOT NULL DEFAULT '0',
  `reborns` int(5) NOT NULL DEFAULT '0',
  `PQPoints` int(11) NOT NULL DEFAULT '0',
  `dataString` varchar(64) NOT NULL DEFAULT '',
  `lastLogoutTime` timestamp NOT NULL DEFAULT '2015-01-01 05:00:00',
  `pendantExp` tinyint(1) NOT NULL DEFAULT '0',
  `quest` int(11) NOT NULL DEFAULT '0',
  `honor` int(11) NOT NULL DEFAULT '0',
  `steal` int(11) NOT NULL DEFAULT '0',
  `persuasion` int(11) NOT NULL DEFAULT '0',
  `jqpoints` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `accountid` (`accountid`),
  KEY `party` (`party`),
  KEY `ranking1` (`level`,`exp`),
  KEY `ranking2` (`gm`,`job`)
) ENGINE=InnoDB AUTO_INCREMENT=30011 DEFAULT CHARSET=latin1 PACK_KEYS=0;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (30001,2,0,'eminems',31,51223,0,24,62,96,4,1346,648,1296,593,679455,0,420,0,0,1,30020,20001,0,'1,0,0,0,0,0,0,0,0,0',105040400,2,0,-1,25,'2015-07-13 16:01:07',1,0,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,32,32,32,32,-1,0,5,0,0,0,0,0,0,0,0,0,'','2015-01-01 05:00:00',0,42,0,0,0,0),(30002,1,0,'Xari2',2,33,0,17,5,4,4,62,17,65,17,0,0,1000,2,0,0,30022,20001,0,'0,0,0,0,0,0,0,0,0,0',300000000,4,0,-1,25,'2015-07-13 16:56:04',4,-3,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,24,24,24,24,-1,0,5,0,0,0,0,0,0,0,0,0,'','2015-01-01 05:00:00',0,0,0,0,0,0),(30003,3,0,'Winsane',1,0,0,12,10,4,4,352,23,352,23,0,0,100,0,0,0,30027,20001,10,'7,0,0,0,0,0,0,0,0,0',209000000,1,1,-1,25,'2015-07-14 16:39:38',1,0,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,24,24,24,24,-1,0,5,0,0,0,0,0,0,0,0,0,'','2015-01-01 05:00:00',0,0,0,0,0,0),(30004,3,0,'Asdf',25,0,0,17,5,4,4,416,42,416,42,0,0,100,0,0,0,30020,20001,20,'6,0,0,0,0,0,0,0,0,0',209000000,1,1,-1,25,'2015-07-14 17:09:59',1,0,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,24,24,24,24,-1,0,5,0,0,0,0,0,0,0,0,0,'','2015-01-01 05:00:00',0,0,0,0,0,0),(30005,3,0,'Wincake',120,0,0,32767,32767,32767,32767,28382,30000,30000,30000,1421434496,0,1511,0,0,13339,30027,20001,128,'103,0,0,0,0,0,0,0,0,0',104020000,7,1,-1,25,'2015-07-14 17:14:12',1,0,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,24,24,24,24,-1,0,5,0,0,0,0,0,0,0,0,0,'','2015-01-01 05:00:00',0,0,0,0,0,0),(30006,4,0,'Jamie',2,0,0,17,5,4,4,62,16,62,16,0,0,0,0,0,0,30023,20001,0,'0,0,0,0,0,0,0,0,0,0',209000000,8,0,-1,25,'2015-07-17 01:13:41',5,-4,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,24,24,24,24,-1,0,5,0,0,0,0,0,0,0,0,0,'','2015-01-01 05:00:00',0,2,0,0,0,0),(30007,5,0,'DAVID',10,145,0,15,38,4,4,338,104,338,104,22906,0,300,2,0,21,30330,20107,0,'0,0,0,0,0,0,0,0,0,0',100000100,7,0,-1,25,'2015-07-17 21:15:20',2,-1,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,28,28,28,28,-1,0,5,0,0,0,0,0,0,0,0,0,'','2015-01-01 05:00:00',0,20,0,0,0,0),(30008,6,0,'oppai',7,499,0,41,6,4,4,77,73,140,73,6000,0,0,1,0,0,30022,20001,0,'0,0,0,0,0,0,0,0,0,0',100050000,13,0,-1,25,'2015-07-17 22:01:04',3,-2,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,24,24,24,24,-1,0,5,0,0,0,0,0,0,0,0,0,'','2015-01-01 05:00:00',0,18,0,0,0,0),(30009,1,0,'Xari',15,0,0,32767,32767,32767,32767,30000,30000,30000,30000,801253,0,1510,0,0,13344,30205,20505,281,'150,0,0,0,0,0,0,0,0,0',100000000,0,1,-1,25,'2015-07-17 23:24:08',1,0,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,24,24,24,24,-1,0,5,0,10,0,1,1,0,0,0,0,'','2015-01-01 05:00:00',0,17,0,0,0,200000027),(30010,8,0,'Despair',1,0,0,12,5,4,4,50,5,50,5,0,0,0,2,0,0,30007,20002,0,'0,0,0,0,0,0,0,0,0,0',109050001,5,0,-1,25,'2015-07-24 01:28:07',6,-5,1,0,0,5,0,4,1,0,0,0,0,0,0,0,0,0,0,24,24,24,24,-1,0,5,0,0,0,0,0,0,0,0,0,'','2015-01-01 05:00:00',0,0,0,0,0,0);
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-01 12:58:36
