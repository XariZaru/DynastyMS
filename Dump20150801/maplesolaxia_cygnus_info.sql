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
-- Table structure for table `cygnus_info`
--

DROP TABLE IF EXISTS `cygnus_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cygnus_info` (
  `tableId` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `information` text,
  `questName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tableId`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cygnus_info`
--

LOCK TABLES `cygnus_info` WRITE;
/*!40000 ALTER TABLE `cygnus_info` DISABLE KEYS */;
INSERT INTO `cygnus_info` VALUES (31,2,'You\'ve introduced yourself to Perzen, but he seems to have something else in mind for you.','Perzen, the Commanding Officer'),(32,3,'Perzen has commanded you to bring him five snail shells, and to reach level 2 before you speak to him again. There are all types of small monsters roaming in the local town. Most are docile, but some are aggressive. Eliminate some of the green snails and report back to Perzen once you have completed your task.','A Simple Task'),(33,4,'Perzen seemed satisfied at your attempt to complete his task. He may have other tasks in mind.','Another Task in Mind'),(34,5,'Perzen has requested that you bring him 3 of the squishy liquids that fall off of a slime upon death. There are a few slimes in the town itself. Collecting them should be easy.','A Slime to the Grave'),(35,6,'You retrieved 3 squishy liquid easily and turned them in to Perzen. Continue with your training to hit new levels.','Progress is Quick'),(36,7,'Perzen gave you a strange looking bottle that contains many herbs. He told you to give it to a woman called Loha. Perhaps you may find her in the village nearby.','Medicine for a Woman'),(37,8,'You\'ve turned in the bottle of medicine to Loha, but Perzen doesn\'t seem to have anything else for you to do. Perhaps you should train until he\'s ready with another assignment.','Complacency'),(38,9,'You\'ve been promoted to a rank 1 Knight of Cygnus. Your work seems to be done here. Training in Altaire should never extend for long periods of time. The Empire never stays sedentary. Report to Perzen one last time.','My Reward?'),(39,10,'Perzen shipped you off to a bright town named Henesys. He left you a message and said to find a woman named Agent E, who should be in charge of all Imperial activity on the continent. You are to find her immediately and start your first task.','Finding Agent E'),(40,11,'Agent E told you to hunt down pigs as they have been disrupting imperial supply lines for quite some time. She requires 10 leather and 2 pig heads as trophies and proof of your completion of the task.','Farm Work'),(41,13,'Your commanding officer, Agent E, has assigned to you a more important task. You are to enter Kerning City and deliver messages to three of the cities most important men. Afterwards, report back to Agent E as soon as possible.','Allied Suppliers'),(42,16,'The letters have been delivered as Agent E had requested. She seems to have more in store for your capabilities, but has withdrawn that opportunity until you have reached a more sufficient level.','Man, You Are Good'),(43,18,'Agent E has promoted you to a second rank Cygnus Knight, but that doesn\'t mean you can stop here. She is sure to have tasks for you that extend to even further reaches of the continent.','A Promotion is Always Nice'),(44,19,'You\'ve been tasked with subduing a potential threat in an imperial colony named Aquarium. It sits in the continent of Ossyria, which is home to the imperial capital, Orbis.','Mission Into the Water'),(45,20,'The dolphin you spoke with seemed to know who the traitor is, but is unwilling to spill his secrets. He told you there are people inside the Zoo that may know who it is.','A Reluctant Dolphin'),(46,21,'Kenta told you to speak with Muse for she should know all about the traitor. Muse should be nearby in the Zoo, for she tends to the animals carefully.','Kenta, the Elusive'),(47,22,'Muse told you the storage keeper of Aquarium, is the culprit. Find him in one of the main buildings and capture him.','The Traitor Arises'),(48,23,'Gerrard refused to come with you to court. Apparently, you need to show evidence before making allegations. Dolphin might know how to pin this criminal down.','An Elusive Traitor'),(49,24,'Dolphin made you sign a treaty before handing over the suspicious items that could put Gerrard away for life. With this evidence, you can bring Gerrard in and convict him.','A Treaty for Aqua Town'),(50,25,'Gerrard has been convicted for his crimes against the empire. Instead of taking him in, you\'ve decided to jot his name down instead and tell Agent M of the culprit. Agent E will come after, of course. Agent M is known to be found in #bOrbis#k in some sort of #bheadquarters#k building. We should go there and look for him.','An Even Better Plan'),(51,26,'Now that you\'ve told Agent M of the culprit, it\'s time to tell Agent E as well so she can update her archives.','An Even Better Plan : Part 2'),(52,28,'Agent E has noted that the monster threat has been growing much larger since the olden days. She\'s worried about the incoming refugees from the war and has asked you to run a check on them. She\'s provided a list of maps for you to follow and will repeat her instructions if you need her to.','Something Bigger Than Us'),(53,32,'You met a refugee, Amelia Pond, who seems nice enough and has been under fear for quite a while. You\'ve retrieved all the information needed to update a status on the immigrant condition. It\'s time to return to #bAgent E#k.','Amelia Pond'),(54,33,'Agent E has decided based on our information that the monster threat has grown to a much more grave state. She has ordered you to train harder than ever, and will be back to give you an assignment.','Preparations for the Future'),(55,34,'Aquarium has been under siege by water creatures for quite some time. You should see Dolphin and have him brief you of the situation.','Back to the Aqua'),(56,35,'Dolphin has requested that you honor the Empire\'s promises to Aquarium, so you have been tasked to embark on a journey to collect several items from the monsters around the sea.','A Lucrative Plan'),(57,36,'You brought promise of economic success back to Aquarium; however, Dolphin seems to require some more help to get Aquarium back on its fins.','A Successful Lucrative Plan'),(58,37,'Dolphin has asked that you ask around the town about the mythical sharks before undergoing a task to kill them. What could be so fearsome about these animals? Talk to the nearby residents of Aquarium to see who knows something about these dangerous predators.','A Deep Plunge'),(59,38,'Kenta said a boy named \"Jay\" is in possession of the book about the Aquarium Sharks. Kenta said he\'d be on Victoria Island in one of the Imperials cities. You should look for Jay to quickly subdue Shark aggression against Aquarium\'s lucrative tourist attractions.','A Hunt for Jay'),(60,39,'Time to get started in this area! Perhaps I should look for a man named #bPerzen#k, who seems to be running this place.','Altaire Camp'),(61,12,'You turned in your items to Agent E, but she wants you to train for until you reach #rlevel 20#k. We should go around and kill something!','A Grind for Experience'),(62,14,'You turned in some information to a knight named #bMatthias#k. There are two others remaining. If you lose your notes you can talk to Agent E for more.','One Down, Two to Go!'),(63,15,'You found Mr. Pickall and gave him some information. This leaves one more to go.','Two Down, One to Go!'),(65,17,'A chance for a promotion? Kill them all! It\'s time to prove our worth as a knight!','Promotion Time!!'),(66,27,'Now that you\'ve written Gerrard up for treason you must train a little longer so that you can partake in more tasks for your commanding officer.','Downtime'),(67,29,'You met a man at #bHenesys Hunting Ground I#k and he told you of monster aggression increasing towards the Empire\'s caravans. You jot down the information and redirect him to Henesys','Refugees Part I'),(68,30,'This incessant woman kept talking about the roads and how poorly guarded they are. Despite her ramblings, you jot down more important information about the immigration routes throughout the Dynasty. Time to find the other refugees!','Refugees Part II'),(69,31,'A man with some of his children were on their way to Henesys, but they were stranded. You helped them out and gave them instructions to a place called #bAltaire#k, your original starting area. You understand the current status of the refugees right now. Onto the last area!','Refugees Part III');
/*!40000 ALTER TABLE `cygnus_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-01 12:58:32
