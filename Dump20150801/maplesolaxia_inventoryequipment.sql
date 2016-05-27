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
-- Table structure for table `inventoryequipment`
--

DROP TABLE IF EXISTS `inventoryequipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventoryequipment` (
  `inventoryequipmentid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inventoryitemid` int(10) unsigned NOT NULL DEFAULT '0',
  `upgradeslots` int(11) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '0',
  `str` int(11) NOT NULL DEFAULT '0',
  `dex` int(11) NOT NULL DEFAULT '0',
  `int` int(11) NOT NULL DEFAULT '0',
  `luk` int(11) NOT NULL DEFAULT '0',
  `hp` int(11) NOT NULL DEFAULT '0',
  `mp` int(11) NOT NULL DEFAULT '0',
  `watk` int(11) NOT NULL DEFAULT '0',
  `matk` int(11) NOT NULL DEFAULT '0',
  `wdef` int(11) NOT NULL DEFAULT '0',
  `mdef` int(11) NOT NULL DEFAULT '0',
  `acc` int(11) NOT NULL DEFAULT '0',
  `avoid` int(11) NOT NULL DEFAULT '0',
  `hands` int(11) NOT NULL DEFAULT '0',
  `speed` int(11) NOT NULL DEFAULT '0',
  `jump` int(11) NOT NULL DEFAULT '0',
  `locked` int(11) NOT NULL DEFAULT '0',
  `vicious` int(11) unsigned NOT NULL DEFAULT '0',
  `itemlevel` int(11) NOT NULL DEFAULT '1',
  `itemexp` int(11) unsigned NOT NULL DEFAULT '0',
  `ringid` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`inventoryequipmentid`),
  KEY `INVENTORYITEMID` (`inventoryitemid`)
) ENGINE=InnoDB AUTO_INCREMENT=7325 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventoryequipment`
--

LOCK TABLES `inventoryequipment` WRITE;
/*!40000 ALTER TABLE `inventoryequipment` DISABLE KEYS */;
INSERT INTO `inventoryequipment` VALUES (702,2045,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(703,2046,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(704,2047,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(705,2048,7,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,1,0,-1),(732,2115,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(733,2116,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(734,2117,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(735,2118,7,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1237,3595,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(1238,3596,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(1239,3597,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(1240,3598,7,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1779,4801,7,0,0,0,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1780,4802,0,0,0,0,0,0,50,50,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1781,4809,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(1782,4810,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(1783,4811,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(1784,4812,7,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1965,5146,7,0,0,0,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1966,5147,7,0,0,0,1,0,100,100,49,80,0,0,0,0,0,0,0,0,0,1,0,-1),(1967,5148,7,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1968,5149,7,0,0,0,0,0,0,0,20,25,0,0,0,0,0,0,0,0,0,1,0,-1),(1969,5150,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1970,5151,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1971,5152,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1972,5153,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1973,5154,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1974,5161,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(1975,5162,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(1976,5163,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(1977,5164,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1978,5165,7,0,1,1,1,1,0,0,0,0,15,0,0,0,0,0,0,0,0,1,0,-1),(1979,5166,7,0,0,0,0,0,0,0,15,23,0,0,0,0,0,0,0,0,0,1,0,-1),(1980,5167,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1981,5168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1982,5169,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1983,5170,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1984,5171,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1985,5172,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1986,5173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1987,5174,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1988,5175,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(1989,5176,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2365,5838,5,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(2366,5839,7,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2367,5840,0,0,0,0,0,0,50,50,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2368,5841,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2369,5842,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2370,5843,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2371,5844,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2372,5845,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2373,5846,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2374,5847,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2375,5868,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(2376,5869,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(2377,5870,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(2378,5871,7,0,0,0,0,0,0,0,28,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2379,5872,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1),(2380,5873,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2381,5874,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2382,5875,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2383,5876,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2384,5877,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2385,5878,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2386,5879,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2387,5880,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2388,5881,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(2389,5882,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3063,7010,7,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3064,7011,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(3065,7012,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(3066,7013,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(3067,7014,7,0,0,0,0,0,0,0,28,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3068,7015,7,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3069,7016,7,0,0,0,0,0,0,0,49,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3070,7056,0,0,0,0,0,0,50,50,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3071,7057,7,0,0,0,0,1,0,0,0,0,18,0,0,0,0,0,0,0,0,1,0,-1),(3072,7058,7,0,0,0,0,0,0,5,0,0,15,0,0,0,0,0,0,0,0,1,0,-1),(3073,7059,7,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,1,0,-1),(3074,7060,7,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3075,7061,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3076,7062,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3077,7063,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3078,7064,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3079,7065,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3080,7066,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(3081,7067,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(5087,10842,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(5088,10845,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(5371,11405,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(5372,11406,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(5373,11407,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(5374,11408,7,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6191,12938,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(6192,12939,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(6193,12940,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(6194,12941,7,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6620,13732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6621,13733,7,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6622,13734,7,0,0,5,0,0,100,0,60,0,0,0,0,25,0,0,0,0,0,1,0,-1),(6623,13735,7,0,0,0,0,0,0,0,78,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6624,13736,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6625,13737,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6626,13738,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6627,13739,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6628,13740,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6629,13741,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6630,13742,7,100,0,100,0,0,0,0,578,0,0,0,300,0,0,0,0,0,0,1,0,-1),(6631,13743,7,0,1,1,1,1,0,0,0,0,15,0,0,0,0,0,0,0,0,1,0,-1),(6632,13744,7,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6633,13745,7,0,0,0,0,0,0,0,28,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6634,13746,7,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,1,0,-1),(6635,13747,7,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6636,13787,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(6637,13788,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(6638,13789,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(6639,13790,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6640,13791,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6641,13792,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6642,13793,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6643,13794,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2),(6644,13795,5,100,0,0,0,0,0,0,305,0,5,5,0,0,0,0,0,0,0,1,0,-1),(6645,13796,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6646,13797,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6647,13798,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6648,13799,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6649,13800,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(6650,13801,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,4),(6651,13802,7,0,0,0,0,0,0,0,38,0,0,0,10,0,0,0,0,0,0,1,0,-1),(6652,13803,0,0,0,0,0,0,20,20,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7297,14986,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7298,14987,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7299,14988,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7300,14989,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7301,14990,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7302,14991,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(7303,14992,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7304,14993,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7305,14994,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7306,14995,7,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7307,14996,7,0,1,1,1,1,0,0,0,0,15,0,0,0,0,0,0,0,0,1,0,-1),(7308,14997,7,0,1,1,1,1,0,0,0,0,15,0,0,0,0,0,0,0,0,1,0,-1),(7309,15022,7,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,-1),(7310,15023,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(7311,15024,5,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,-1),(7312,15025,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7313,15026,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7314,15027,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7315,15028,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7316,15029,7,0,1,1,1,1,0,0,0,0,15,0,0,0,0,0,0,0,0,1,0,-1),(7317,15030,0,0,0,0,0,0,50,50,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7318,15031,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7319,15032,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7320,15033,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7321,15034,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7322,15035,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,-1),(7323,15036,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,3),(7324,15037,7,0,0,0,0,0,0,0,82,0,0,0,0,0,0,0,0,0,0,1,0,-1);
/*!40000 ALTER TABLE `inventoryequipment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-01 12:58:34
