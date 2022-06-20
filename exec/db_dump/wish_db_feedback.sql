-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: i6E201.p.ssafy.io    Database: wish_db
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `meeting_name` varchar(255) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `rate` float NOT NULL,
  `time` time DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `meeting_id` bigint DEFAULT NULL,
  `member_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8kpnq3dbc1o1sh6vx3wqpupg1` (`meeting_id`),
  KEY `FKmonjtjt92g6gruqyfumtmg8m8` (`member_id`),
  CONSTRAINT `FK8kpnq3dbc1o1sh6vx3wqpupg1` FOREIGN KEY (`meeting_id`) REFERENCES `meeting_room` (`id`),
  CONSTRAINT `FKmonjtjt92g6gruqyfumtmg8m8` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (80,'교육생들에게 CS지식을 적절히 전달할 만큼의 이해력을 가지고 있음.',NULL,NULL,'프로세스와 스레드의 차이점은 무엇인가?',0,NULL,'직무',151,'ssafy'),(81,'SSAFY 코치는 교육생들 프로젝트에 이슈가 생기면 저녁 늦게라도 봐줄 수 있어야 하는데 그에 대한 대비가 부족해보임.',NULL,NULL,'업무강도가 센 편입니다. 괜찮습니까?',0,NULL,'직무',151,'ssafy'),(82,'입과기간동안 수업을 열심히 들었음을 알 수 있었습니다.',NULL,NULL,'객체지향 언어의 특징',0,NULL,'직무',151,'ssafy'),(83,'코치로써 학생들에게 먼저 다가가려는 마음가짐과 함께 잘 풀어 설명하였다.',NULL,NULL,'오늘 면접 보는 지원자들 중 누가 제일 먼저 말을 걸었습니까?',5,NULL,'인성',153,'ssafy'),(84,'코치로써의 포부를 잘 보여줌',NULL,NULL,'일하는 목적이 무엇입니까?',3,NULL,'인성',153,'ssafy'),(85,'언어에 대한 이해도를 알 수 있었음',NULL,NULL,'본인이 사용할 줄 아는 언어들의 차이점은 무엇인가?',5,NULL,'직무',154,'ssafy'),(86,'기초가 튼튼해보인다.',NULL,NULL,'객체지향 언어의 특징',5,NULL,'직무',154,'ssafy');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-18  6:04:16
