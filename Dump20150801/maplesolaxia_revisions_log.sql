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
-- Table structure for table `revisions_log`
--

DROP TABLE IF EXISTS `revisions_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `revisions_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `revisionName` text NOT NULL,
  `revision` decimal(3,1) NOT NULL DEFAULT '1.0',
  `information` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisions_log`
--

LOCK TABLES `revisions_log` WRITE;
/*!40000 ALTER TABLE `revisions_log` DISABLE KEYS */;
INSERT INTO `revisions_log` VALUES (1,'prealpha',1.0,'- Level 1-30 Explorer storyline created.'),(2,'prealpha',1.0,'- TestPoints for account added.'),(3,'prealpha',1.0,'- CustomQuest added.'),(4,'prealpha',1.0,'- Added guide to assist the player.'),(5,'prealpha',1.0,'- Level 1-10 Knights of Cygnus added.'),(6,'prealpha',1.0,'- Set spawn maps for the three classes.'),(7,'prealpha',1.0,'- Added portal scripts for Altaire'),(8,'prealpha',1.0,'- Converted Happyville to beginner\'s starting place.'),(9,'prealpha',1.0,'- Decided which towns belong to which party.'),(11,'prealpha',1.1,'- Level 30 - 90 Explorer storyline made.'),(12,'prealpha',1.1,'- Level 10 - 20 storyline Knights of Cygnus made.'),(13,'prealpha',1.1,'- Added @guide for removal of guide (will return during quests).'),(14,'prealpha',1.1,'- Added setNPCscriptable (makes all NPCs codable).'),(15,'prealpha',1.1,'- Fixed Orbis boat.'),(16,'prealpha',1.1,'- Added in goal npc named \"Pietro\".'),(17,'prealpha',1.1,'- Added event npc named \"Vikoon\". Currently only in Henesys.'),(18,'prealpha',1.1,'- 2nd Job for Knights of Cygnus.'),(22,'prealpha',1.2,'- Knights of Cygnus level 30 chain quest finished.'),(23,'prealpha',1.2,'- Changes to delays in guide when talking.'),(24,'prealpha',1.2,'- Changes to guide when spawned.'),(25,'prealpha',1.2,'- Knights of Cygnus updated to level 70.'),(26,'prealpha',1.2,'- Bug Report NPC (Cody) added'),(27,'prealpha',1.2,'- KoC chain quest level 70 finished.'),(28,'prealpha',1.2,'- Marked down which towns belong to which faction.'),(29,'prealpha',1.2,'- KoC updated to level 90.'),(30,'prealpha',1.2,'- Fixed The Ticket Gate not reading tickets correctly.'),(31,'prealpha',1.2,'- Added in Quest Log NPC for guide.'),(32,'prealpha',1.2,'- Added in maple items exchange for Gaga.'),(33,'prealpha',1.2,'- Added in Rooney as the beta quest NPC.'),(34,'prealpha',1.3,'- Steal skill added.'),(35,'prealpha',1.3,'- Persuasion skill added.'),(36,'prealpha',1.3,'- Integrity skill added.'),(37,'prealpha',1.3,'- First parts of legend storyline coded.'),(38,'prealpha',1.3,'- Fixed Alcaster'),(39,'prealpha',1.3,'- Level 90 KoC.'),(40,'prealpha',1.3,'- Added Maple Shields to Gaga.'),(41,'prealpha',1.3,'- Voting NPC created.'),(42,'prealpha',1.3,'- Donation created.'),(43,'alpha',1.0,'- Level 90 KoC Storyline.'),(44,'alpha',1.0,'- Drop rate of chaos scrolls lowered.'),(45,'alpha',1.0,'- Drop rate of maple leaves lowered.'),(46,'alpha',1.0,'- Level 100 KoC Storyline.'),(47,'alpha',1.0,'- Began work on lottery npc.'),(48,'alpha',1.0,'- Henesys Gachapon (added ~90 more items)'),(49,'alpha',1.0,'- Hene gach now uses 3 tix.'),(50,'alpha',1.0,'- Rooney now has 2 options, beta and daily'),(51,'alpha',1.0,'- Added in common items for Rooney'),(52,'alpha',1.1,'- Fixed Gaga maple shield purchase'),(53,'alpha',1.1,'- Disabled Chair gach npc'),(54,'alpha',1.1,'- Finished daily rewards NPC Rooney'),(55,'alpha',1.1,'- Began coding on 110 Explorer'),(56,'alpha',1.1,'- Bulletin Board w/ famous Imperial Legions added'),(57,'alpha',1.1,'- 4th Job Explorer coded'),(58,'alpha',1.2,'- First parts of Aran coded'),(59,'alpha',1.2,'- More skills to Wu Yuan'),(60,'alpha',1.2,'- Fixed a part in Taeng storyline'),(61,'alpha',1.2,'- Reduced prize in Rooney\'s Beta Option');
/*!40000 ALTER TABLE `revisions_log` ENABLE KEYS */;
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
