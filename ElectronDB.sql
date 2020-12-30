-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.0-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for kms_316
CREATE DATABASE IF NOT EXISTS `kms_316` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `kms_316`;

-- Dumping structure for table kms_316.acceptip
CREATE TABLE IF NOT EXISTS `acceptip` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ip` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL DEFAULT '',
  `2ndpassword` varchar(134) DEFAULT NULL,
  `using2ndpassword` tinyint(2) NOT NULL DEFAULT 0,
  `loggedin` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `lastlogin` timestamp NULL DEFAULT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `banned` tinyint(1) NOT NULL DEFAULT 0,
  `banreason` text DEFAULT NULL,
  `gm` tinyint(1) NOT NULL DEFAULT 0,
  `email` tinytext DEFAULT NULL,
  `macs` tinytext DEFAULT NULL,
  `tempban` timestamp NULL DEFAULT NULL,
  `greason` tinyint(4) unsigned DEFAULT NULL,
  `nxCash` int(11) DEFAULT NULL,
  `mPoints` int(11) DEFAULT NULL,
  `gender` int(11) NOT NULL DEFAULT -1,
  `SessionIP` text DEFAULT NULL,
  `ip` text DEFAULT NULL,
  `pin` tinyint(15) unsigned NOT NULL DEFAULT 0,
  `vpoints` int(50) DEFAULT 0,
  `idcode1` int(7) NOT NULL DEFAULT 111111,
  `idcode2` int(7) NOT NULL DEFAULT 1111111,
  `lastconnect` varchar(10) NOT NULL DEFAULT '1999123100',
  `realcash` int(10) unsigned DEFAULT 0,
  `aimkind` int(11) NOT NULL DEFAULT 0,
  `promote` int(10) unsigned DEFAULT 0,
  `chrslot` int(10) unsigned NOT NULL DEFAULT 3,
  `connecterKey` text DEFAULT NULL,
  `allowed` varchar(45) NOT NULL DEFAULT '0',
  `connecterClient` varchar(45) DEFAULT NULL,
  `maincharacter` text DEFAULT NULL,
  `connecterIP` varchar(45) DEFAULT NULL,
  `banby` text DEFAULT NULL,
  `blockgamelimit` int(11) NOT NULL DEFAULT 0,
  `blockgamedays` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `ranking1` (`id`,`banned`,`gm`)
) ENGINE=MyISAM AUTO_INCREMENT=498 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.acheck
CREATE TABLE IF NOT EXISTS `acheck` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(10) unsigned NOT NULL,
  `keya` varchar(80) NOT NULL,
  `value` varchar(80) NOT NULL,
  `day` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `id` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=4556 DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.akeyvalue
CREATE TABLE IF NOT EXISTS `akeyvalue` (
  `aid` int(11) NOT NULL,
  `key` text NOT NULL,
  `value` bigint(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.alliances
CREATE TABLE IF NOT EXISTS `alliances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notice` varchar(101) NOT NULL,
  `name` varchar(45) NOT NULL,
  `guild1` int(10) NOT NULL DEFAULT 0,
  `guild2` int(10) NOT NULL DEFAULT 0,
  `guild3` int(10) NOT NULL DEFAULT 0,
  `guild4` int(10) NOT NULL DEFAULT 0,
  `guild5` int(10) NOT NULL DEFAULT 0,
  `rank1` varchar(45) NOT NULL,
  `rank2` varchar(45) NOT NULL,
  `rank3` varchar(45) NOT NULL,
  `rank4` varchar(45) NOT NULL,
  `rank5` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.android
CREATE TABLE IF NOT EXISTS `android` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemid` int(11) NOT NULL,
  `hair` int(11) NOT NULL,
  `face` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `uniqueid` int(11) NOT NULL,
  `skincolor` int(11) NOT NULL DEFAULT 0,
  `ear` int(11) NOT NULL DEFAULT 0,
  UNIQUE KEY `id` (`id`),
  KEY `uniqueid` (`uniqueid`)
) ENGINE=MyISAM AUTO_INCREMENT=234 DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.attendcheck
CREATE TABLE IF NOT EXISTS `attendcheck` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `accid` int(10) unsigned NOT NULL,
  `weekly_check` int(10) unsigned NOT NULL,
  `returnattend` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.auctionequipment
CREATE TABLE IF NOT EXISTS `auctionequipment` (
  `inventoryequipmentid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inventoryitemid` int(10) unsigned NOT NULL DEFAULT 0,
  `upgradeslots` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 0,
  `str` int(11) NOT NULL DEFAULT 0,
  `dex` int(11) NOT NULL DEFAULT 0,
  `int` int(11) NOT NULL DEFAULT 0,
  `luk` int(11) NOT NULL DEFAULT 0,
  `hp` int(11) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 0,
  `watk` int(11) NOT NULL DEFAULT 0,
  `matk` int(11) NOT NULL DEFAULT 0,
  `wdef` int(11) NOT NULL DEFAULT 0,
  `mdef` int(11) NOT NULL DEFAULT 0,
  `acc` int(11) NOT NULL DEFAULT 0,
  `avoid` int(11) NOT NULL DEFAULT 0,
  `hands` int(11) NOT NULL DEFAULT 0,
  `speed` int(11) NOT NULL DEFAULT 0,
  `jump` int(11) NOT NULL DEFAULT 0,
  `ViciousHammer` tinyint(2) NOT NULL DEFAULT 0,
  `itemLevel` tinyint(1) NOT NULL DEFAULT 0,
  `itemEXP` int(11) NOT NULL DEFAULT 0,
  `durability` mediumint(9) NOT NULL DEFAULT -1,
  `enhance` smallint(3) NOT NULL DEFAULT 0,
  `state` tinyint(2) NOT NULL DEFAULT 0,
  `lines` tinyint(2) NOT NULL DEFAULT 0,
  `potential1` int(11) NOT NULL DEFAULT 0,
  `potential2` int(11) NOT NULL DEFAULT 0,
  `potential3` int(11) NOT NULL DEFAULT 0,
  `potential4` int(11) NOT NULL DEFAULT 0,
  `potential5` int(11) NOT NULL DEFAULT 0,
  `potential6` int(11) NOT NULL DEFAULT 0,
  `anvil` int(11) NOT NULL DEFAULT 0,
  `hpR` smallint(3) NOT NULL,
  `mpR` smallint(3) NOT NULL,
  `potential7` int(11) NOT NULL DEFAULT 0,
  `fire` int(11) NOT NULL DEFAULT -1,
  `downlevel` int(11) NOT NULL DEFAULT 0,
  `bossdmg` int(11) NOT NULL DEFAULT 0,
  `alldmgp` int(11) NOT NULL DEFAULT 0,
  `allstatp` int(11) NOT NULL DEFAULT 0,
  `IgnoreWdef` int(11) NOT NULL DEFAULT 0,
  `soulname` int(11) NOT NULL DEFAULT 0,
  `soulenchanter` int(11) NOT NULL DEFAULT 0,
  `soulpotential` int(11) NOT NULL DEFAULT 0,
  `soulskill` int(11) NOT NULL DEFAULT 0,
  `starforce` int(11) NOT NULL DEFAULT 0,
  `itemtrace` int(11) NOT NULL DEFAULT 0,
  `firestat` varchar(128) NOT NULL DEFAULT '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
  `arc` smallint(6) NOT NULL DEFAULT 0,
  `arcexp` int(11) NOT NULL DEFAULT 0,
  `arclevel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`inventoryequipmentid`),
  KEY `inventoryitemid` (`inventoryitemid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.auctionitems
CREATE TABLE IF NOT EXISTS `auctionitems` (
  `inventoryitemid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` int(2) NOT NULL DEFAULT 0,
  `characterid` int(11) DEFAULT NULL,
  `accountid` int(11) NOT NULL DEFAULT -1,
  `packageId` int(11) NOT NULL DEFAULT -1,
  `itemid` int(11) NOT NULL DEFAULT 0,
  `inventorytype` int(11) NOT NULL DEFAULT 0,
  `position` int(11) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `owner` tinytext DEFAULT NULL,
  `GM_Log` text DEFAULT NULL,
  `uniqueid` int(30) NOT NULL DEFAULT -1,
  `flag` int(2) NOT NULL DEFAULT 0,
  `expiredate` bigint(30) NOT NULL DEFAULT -1,
  `giftFrom` varchar(20) DEFAULT NULL,
  `isCash` int(2) NOT NULL DEFAULT 0,
  `isPet` int(2) NOT NULL DEFAULT 0,
  `isAndroid` int(2) NOT NULL DEFAULT 0,
  `issale` int(11) NOT NULL DEFAULT 0,
  `bid` bigint(30) DEFAULT NULL,
  `meso` bigint(30) NOT NULL,
  `expired` bigint(30) NOT NULL,
  `bargain` tinyint(1) NOT NULL,
  `ownername` varchar(45) NOT NULL,
  `buyer` int(11) DEFAULT NULL,
  `buytime` bigint(30) NOT NULL,
  `starttime` bigint(30) NOT NULL,
  `inventoryid` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`inventoryitemid`),
  KEY `inventoryitems_ibfk_1` (`characterid`),
  KEY `characterid` (`characterid`),
  KEY `inventorytype` (`inventorytype`),
  KEY `characterid_2` (`characterid`,`inventorytype`),
  KEY `uniqueid` (`uniqueid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.auctions
CREATE TABLE IF NOT EXISTS `auctions` (
  `characterid` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  `inventoryid` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`characterid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.auth_server_login
CREATE TABLE IF NOT EXISTS `auth_server_login` (
  `loginserverid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(40) NOT NULL DEFAULT '',
  `world` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`loginserverid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.bbs_replies
CREATE TABLE IF NOT EXISTS `bbs_replies` (
  `replyid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `threadid` int(10) unsigned NOT NULL,
  `postercid` int(10) unsigned NOT NULL,
  `timestamp` bigint(20) unsigned NOT NULL,
  `content` varchar(26) NOT NULL DEFAULT '',
  PRIMARY KEY (`replyid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.bbs_threads
CREATE TABLE IF NOT EXISTS `bbs_threads` (
  `threadid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `postercid` int(10) unsigned NOT NULL,
  `name` varchar(26) NOT NULL DEFAULT '',
  `timestamp` bigint(20) unsigned NOT NULL,
  `icon` smallint(5) unsigned NOT NULL,
  `replycount` smallint(5) unsigned NOT NULL DEFAULT 0,
  `startpost` text NOT NULL,
  `guildid` int(10) unsigned NOT NULL,
  `localthreadid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`threadid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.boom
CREATE TABLE IF NOT EXISTS `boom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` text DEFAULT NULL,
  `gun` text DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.boomboom
CREATE TABLE IF NOT EXISTS `boomboom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create` text DEFAULT NULL,
  `gun` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.bossclear
CREATE TABLE IF NOT EXISTS `bossclear` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(10) unsigned NOT NULL,
  `cleartime` bigint(20) unsigned NOT NULL,
  `bossname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1513 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.bosscooltime
CREATE TABLE IF NOT EXISTS `bosscooltime` (
  `channel` int(11) NOT NULL,
  `map` int(11) NOT NULL,
  `time` bigint(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.bosslog
CREATE TABLE IF NOT EXISTS `bosslog` (
  `bosslogid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `characterid` int(10) unsigned NOT NULL,
  `bossid` varchar(20) NOT NULL,
  `lastattempt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`bosslogid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.bossraidtime
CREATE TABLE IF NOT EXISTS `bossraidtime` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bgin` varchar(45) NOT NULL,
  `ends` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `diff` varchar(45) NOT NULL,
  `time` int(10) NOT NULL,
  `rate` int(10) NOT NULL,
  `pmem` varchar(45) NOT NULL,
  `size` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.boss_total_rank
CREATE TABLE IF NOT EXISTS `boss_total_rank` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `boss` int(11) NOT NULL,
  `bgin` varchar(45) NOT NULL,
  `ends` varchar(45) NOT NULL,
  `time` int(11) NOT NULL,
  `pmem` varchar(45) NOT NULL,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.buddies
CREATE TABLE IF NOT EXISTS `buddies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characterid` int(11) NOT NULL,
  `buddyid` int(11) NOT NULL,
  `pending` tinyint(4) NOT NULL DEFAULT 0,
  `groupname` varchar(16) NOT NULL DEFAULT '그룹 미지정',
  PRIMARY KEY (`id`),
  KEY `buddies_ibfk_1` (`characterid`)
) ENGINE=MyISAM AUTO_INCREMENT=8434 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.charactercard
CREATE TABLE IF NOT EXISTS `charactercard` (
  `accountid` int(11) NOT NULL,
  `cardid` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`accountid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.characters
CREATE TABLE IF NOT EXISTS `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountid` int(11) NOT NULL DEFAULT 0,
  `name` varchar(13) NOT NULL DEFAULT '',
  `level` int(3) NOT NULL DEFAULT 0,
  `exp` bigint(20) NOT NULL DEFAULT 0,
  `str` int(11) NOT NULL DEFAULT 0,
  `dex` int(11) NOT NULL DEFAULT 0,
  `luk` int(11) NOT NULL DEFAULT 0,
  `int` int(11) NOT NULL DEFAULT 0,
  `hp` int(11) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 0,
  `maxhp` int(11) NOT NULL DEFAULT 0,
  `maxmp` int(11) NOT NULL DEFAULT 0,
  `meso` bigint(20) NOT NULL DEFAULT 0,
  `hpApUsed` int(11) NOT NULL DEFAULT 0,
  `mpApUsed` int(11) NOT NULL DEFAULT 0,
  `job` int(11) NOT NULL DEFAULT 0,
  `skincolor` int(1) NOT NULL DEFAULT 0,
  `skincolor2` int(1) NOT NULL DEFAULT 0,
  `gender` int(11) NOT NULL DEFAULT 0,
  `gender2` int(11) NOT NULL DEFAULT 0,
  `fame` int(11) NOT NULL DEFAULT 0,
  `hair` int(10) unsigned NOT NULL DEFAULT 0,
  `hair2` int(11) NOT NULL DEFAULT 0,
  `face` int(11) NOT NULL DEFAULT 0,
  `face2` int(11) NOT NULL DEFAULT 0,
  `wp` int(11) NOT NULL DEFAULT 0,
  `askguildid` int(11) NOT NULL DEFAULT 0,
  `ap` int(11) NOT NULL DEFAULT 0,
  `map` int(11) NOT NULL DEFAULT 0,
  `spawnpoint` int(11) NOT NULL DEFAULT 0,
  `gm` int(11) NOT NULL DEFAULT 0,
  `party` int(11) NOT NULL DEFAULT 0,
  `buddyCapacity` int(11) NOT NULL DEFAULT 25,
  `createdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `rank` int(10) unsigned NOT NULL DEFAULT 1,
  `rankMove` int(11) NOT NULL DEFAULT 0,
  `worldRank` int(10) unsigned NOT NULL DEFAULT 1,
  `worldRankMove` int(11) NOT NULL DEFAULT 0,
  `guildid` int(10) unsigned NOT NULL DEFAULT 0,
  `guildrank` int(10) unsigned NOT NULL DEFAULT 5,
  `allianceRank` int(10) unsigned NOT NULL DEFAULT 0,
  `messengerid` int(10) unsigned NOT NULL DEFAULT 0,
  `messengerposition` int(10) unsigned NOT NULL DEFAULT 4,
  `monsterbookcover` int(11) unsigned NOT NULL DEFAULT 0,
  `subcategory` int(11) DEFAULT 0,
  `reborns` int(11) unsigned NOT NULL DEFAULT 0,
  `sp` varchar(255) NOT NULL DEFAULT '0,0,0,0,0,0,0,0,0,0',
  `ambition` int(11) NOT NULL DEFAULT 0,
  `insight` int(11) NOT NULL DEFAULT 0,
  `willpower` int(11) NOT NULL DEFAULT 0,
  `diligence` int(11) NOT NULL DEFAULT 0,
  `empathy` int(11) NOT NULL DEFAULT 0,
  `charm` int(11) NOT NULL DEFAULT 0,
  `innerExp` int(10) unsigned NOT NULL DEFAULT 0,
  `innerLevel` int(10) unsigned NOT NULL DEFAULT 1,
  `artifactPoints` int(11) NOT NULL DEFAULT 0,
  `morphGage` int(11) NOT NULL DEFAULT 0,
  `firstProfession` int(11) NOT NULL DEFAULT 0,
  `secondProfession` int(11) NOT NULL DEFAULT 0,
  `firstProfessionLevel` int(11) NOT NULL DEFAULT 0,
  `secondProfessionLevel` int(11) NOT NULL DEFAULT 0,
  `firstProfessionExp` int(11) NOT NULL DEFAULT 0,
  `secondProfessionExp` int(11) NOT NULL DEFAULT 0,
  `fatigue` int(11) NOT NULL DEFAULT 0,
  `last_command_time` bigint(14) NOT NULL DEFAULT -1,
  `pet_id` varchar(60) NOT NULL DEFAULT '-1,-1,-1',
  `pet_loot` tinyint(1) NOT NULL DEFAULT 0,
  `pet_mp` int(7) NOT NULL DEFAULT 0,
  `pet_hp` int(7) NOT NULL DEFAULT 0,
  `rankpoint` int(11) NOT NULL,
  `gp` int(11) NOT NULL,
  `soul` int(11) NOT NULL,
  `chatban` varchar(45) NOT NULL,
  `betaclothes` int(11) NOT NULL DEFAULT 0,
  `burning` int(11) NOT NULL DEFAULT 0,
  `loginpoint` int(11) NOT NULL DEFAULT 0,
  `coreq` int(11) NOT NULL DEFAULT 0,
  `frozenmobcount` int(4) NOT NULL DEFAULT 0,
  `mesochair` int(10) unsigned NOT NULL DEFAULT 0,
  `TowerChairSetting` int(10) unsigned NOT NULL DEFAULT 0,
  `damage` bigint(20) unsigned DEFAULT 0,
  `damagehit` int(10) unsigned NOT NULL DEFAULT 100,
  `hope` varchar(45) NOT NULL DEFAULT '장래희망 없음',
  `damagehit2` int(10) unsigned NOT NULL DEFAULT 0,
  `tierReborns` int(11) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `accountid` (`accountid`),
  KEY `party` (`party`),
  KEY `ranking1` (`level`,`exp`),
  KEY `ranking2` (`gm`,`job`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.code
CREATE TABLE IF NOT EXISTS `code` (
  `chrid` int(10) NOT NULL DEFAULT 0,
  `item` int(10) NOT NULL DEFAULT 0,
  `qua` int(10) NOT NULL DEFAULT 0,
  `code` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.color
CREATE TABLE IF NOT EXISTS `color` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(10) unsigned NOT NULL,
  `color` int(11) NOT NULL DEFAULT 2,
  `selection` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.connectorban
CREATE TABLE IF NOT EXISTS `connectorban` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ip` text CHARACTER SET euckr DEFAULT NULL,
  `connecterkey` text CHARACTER SET euckr DEFAULT NULL,
  `comment` text CHARACTER SET euckr DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.core
CREATE TABLE IF NOT EXISTS `core` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `crcid` bigint(11) unsigned NOT NULL,
  `coreid` int(10) unsigned NOT NULL,
  `charid` int(10) unsigned NOT NULL,
  `level` int(10) unsigned NOT NULL,
  `exp` int(10) unsigned NOT NULL,
  `state` int(10) unsigned NOT NULL,
  `skill1` int(10) unsigned NOT NULL,
  `skill2` int(10) unsigned NOT NULL,
  `skill3` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38295917 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.coupon
CREATE TABLE IF NOT EXISTS `coupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `item` text DEFAULT NULL,
  `itemn` text DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.dailygift
CREATE TABLE IF NOT EXISTS `dailygift` (
  `accountid` int(11) DEFAULT NULL,
  `dailyday` int(11) DEFAULT NULL,
  `dailycount` int(11) DEFAULT NULL,
  `dailyData` varchar(50) DEFAULT '00000000'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.dailyquest
CREATE TABLE IF NOT EXISTS `dailyquest` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `accid` int(11) NOT NULL,
  `questid` int(11) NOT NULL,
  `data` int(11) NOT NULL,
  `bossid` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `clear` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.damagerank
CREATE TABLE IF NOT EXISTS `damagerank` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `damage` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=792 DEFAULT CHARSET=utf8 PACK_KEYS=1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.drop_data
CREATE TABLE IF NOT EXISTS `drop_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dropperid` int(11) NOT NULL,
  `itemid` int(11) NOT NULL DEFAULT 0,
  `minimum_quantity` int(11) NOT NULL DEFAULT 1,
  `maximum_quantity` int(11) NOT NULL DEFAULT 1,
  `questid` int(11) NOT NULL DEFAULT 0,
  `chance` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `mobid` (`dropperid`)
) ENGINE=MyISAM AUTO_INCREMENT=90552 DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.drop_data_global
CREATE TABLE IF NOT EXISTS `drop_data_global` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `continent` int(11) NOT NULL,
  `dropType` tinyint(1) NOT NULL DEFAULT 0,
  `itemid` int(11) NOT NULL DEFAULT 0,
  `minimum_quantity` int(11) NOT NULL DEFAULT 1,
  `maximum_quantity` int(11) NOT NULL DEFAULT 1,
  `questid` int(11) NOT NULL DEFAULT 0,
  `chance` int(11) NOT NULL DEFAULT 0,
  `comments` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mobid` (`continent`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.drop_data_vana
CREATE TABLE IF NOT EXISTS `drop_data_vana` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dropperid` int(11) NOT NULL,
  `flags` set('is_mesos') NOT NULL DEFAULT '',
  `itemid` int(11) NOT NULL DEFAULT 0,
  `minimum_quantity` int(11) NOT NULL DEFAULT 1,
  `maximum_quantity` int(11) NOT NULL DEFAULT 1,
  `questid` int(11) NOT NULL DEFAULT 0,
  `chance` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `mobid` (`dropperid`)
) ENGINE=MyISAM AUTO_INCREMENT=9967 DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.dueypackages
CREATE TABLE IF NOT EXISTS `dueypackages` (
  `PackageId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `RecieverId` int(10) NOT NULL,
  `SenderName` varchar(13) NOT NULL,
  `Mesos` int(10) unsigned DEFAULT 0,
  `TimeStamp` bigint(20) unsigned DEFAULT NULL,
  `Checked` tinyint(1) unsigned DEFAULT 1,
  `Type` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`PackageId`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.eventstats
CREATE TABLE IF NOT EXISTS `eventstats` (
  `eventstatid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `event` varchar(30) NOT NULL,
  `instance` varchar(30) NOT NULL,
  `characterid` int(11) NOT NULL,
  `channel` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`eventstatid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.extendedslots
CREATE TABLE IF NOT EXISTS `extendedslots` (
  `index` int(11) NOT NULL,
  `characterid` int(11) NOT NULL,
  `uniqueid` int(11) NOT NULL,
  KEY `index` (`index`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.famelog
CREATE TABLE IF NOT EXISTS `famelog` (
  `famelogid` int(11) NOT NULL AUTO_INCREMENT,
  `characterid` int(11) NOT NULL DEFAULT 0,
  `characterid_to` int(11) NOT NULL DEFAULT 0,
  `when` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`famelogid`),
  KEY `characterid` (`characterid`)
) ENGINE=MyISAM AUTO_INCREMENT=173 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.fireitem
CREATE TABLE IF NOT EXISTS `fireitem` (
  `value` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uniqueid` int(11) NOT NULL DEFAULT 0,
  `mdef` int(11) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 0,
  `hp` int(11) NOT NULL DEFAULT 0,
  `wdef` int(11) NOT NULL DEFAULT 0,
  `speed` int(11) NOT NULL DEFAULT 0,
  `jump` int(11) NOT NULL DEFAULT 0,
  `fire` int(11) NOT NULL DEFAULT 0,
  `hands` int(11) NOT NULL DEFAULT 0,
  `avoid` int(11) NOT NULL DEFAULT 0,
  `acc` int(11) NOT NULL DEFAULT 0,
  `watk` int(11) NOT NULL DEFAULT 0,
  `matk` int(11) NOT NULL DEFAULT 0,
  `str` int(11) NOT NULL DEFAULT 0,
  `dex` int(11) NOT NULL DEFAULT 0,
  `_int` int(11) NOT NULL DEFAULT 0,
  `luk` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.force
CREATE TABLE IF NOT EXISTS `force` (
  `forceid` int(11) NOT NULL AUTO_INCREMENT,
  `point` int(11) NOT NULL,
  PRIMARY KEY (`forceid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.forcemap
CREATE TABLE IF NOT EXISTS `forcemap` (
  `mapid` int(11) NOT NULL,
  `mobcount` int(11) NOT NULL,
  `force` int(1) NOT NULL,
  `channel` int(2) NOT NULL,
  `time` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.futurehope
CREATE TABLE IF NOT EXISTS `futurehope` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(10) unsigned NOT NULL,
  `hope` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2182 DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.game_poll_reply
CREATE TABLE IF NOT EXISTS `game_poll_reply` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `AccountId` int(10) unsigned NOT NULL,
  `SelectAns` tinyint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.ggpremium
CREATE TABLE IF NOT EXISTS `ggpremium` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `aid` int(11) NOT NULL,
  `limit` bigint(30) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.guilds
CREATE TABLE IF NOT EXISTS `guilds` (
  `guildid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `leader` int(10) unsigned NOT NULL DEFAULT 0,
  `GP` int(10) unsigned NOT NULL DEFAULT 0,
  `logo` int(10) unsigned DEFAULT NULL,
  `logoColor` smallint(5) unsigned NOT NULL DEFAULT 0,
  `name` varchar(45) NOT NULL,
  `rank1title` varchar(45) NOT NULL DEFAULT '마스터',
  `rank2title` varchar(45) NOT NULL DEFAULT '부마스터',
  `rank3title` varchar(45) NOT NULL DEFAULT '멤버',
  `rank4title` varchar(45) NOT NULL DEFAULT '멤버',
  `rank5title` varchar(45) NOT NULL DEFAULT '멤버',
  `capacity` int(10) unsigned NOT NULL DEFAULT 10,
  `logoBG` int(10) unsigned DEFAULT NULL,
  `logoBGColor` smallint(5) unsigned NOT NULL DEFAULT 0,
  `notice` varchar(101) DEFAULT NULL,
  `signature` int(11) NOT NULL DEFAULT 0,
  `alliance` int(10) unsigned NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 0,
  `accruedGP` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`guildid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.guildsills
CREATE TABLE IF NOT EXISTS `guildsills` (
  `gid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `skillid` int(10) unsigned NOT NULL,
  `time` bigint(20) unsigned NOT NULL,
  `buyer` int(10) unsigned NOT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.guildskills
CREATE TABLE IF NOT EXISTS `guildskills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `guildid` int(10) unsigned DEFAULT 0,
  `skillid` int(10) unsigned DEFAULT 0,
  `level` int(10) unsigned DEFAULT 0,
  `timestamp` bigint(20) unsigned DEFAULT 0,
  `purchaser` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.guild_join_requests
CREATE TABLE IF NOT EXISTS `guild_join_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guildid` int(11) NOT NULL DEFAULT 0,
  `job` int(6) NOT NULL DEFAULT 0,
  `level` int(3) NOT NULL DEFAULT 0,
  `name` varchar(14) NOT NULL,
  `request_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `인덱스 2` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.hiredmerch
CREATE TABLE IF NOT EXISTS `hiredmerch` (
  `PackageId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `characterid` int(10) unsigned DEFAULT 0,
  `accountid` int(10) unsigned DEFAULT NULL,
  `Mesos` int(10) unsigned DEFAULT 0,
  `time` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`PackageId`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.hiredmerchantsaveitems
CREATE TABLE IF NOT EXISTS `hiredmerchantsaveitems` (
  `id` int(11) NOT NULL,
  `merchid` int(11) NOT NULL,
  `uniqueid` int(30) NOT NULL,
  `bundle` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.hiredmerchantsaves
CREATE TABLE IF NOT EXISTS `hiredmerchantsaves` (
  `id` int(20) NOT NULL,
  `desc` varchar(100) NOT NULL,
  `itemId` int(11) NOT NULL,
  `ownerName` varchar(30) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `ownerAccid` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `map` int(11) NOT NULL,
  `channel` int(11) NOT NULL,
  `start` bigint(30) NOT NULL,
  `meso` int(13) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.hns
CREATE TABLE IF NOT EXISTS `hns` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL DEFAULT 0,
  `win` int(11) NOT NULL DEFAULT 0,
  `lose` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.htsquads
CREATE TABLE IF NOT EXISTS `htsquads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `channel` int(10) unsigned NOT NULL,
  `leaderid` int(10) unsigned NOT NULL DEFAULT 0,
  `status` int(10) unsigned NOT NULL DEFAULT 0,
  `members` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.inner_ability_skills
CREATE TABLE IF NOT EXISTS `inner_ability_skills` (
  `player_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `skill_level` int(11) NOT NULL,
  `max_level` int(11) NOT NULL,
  `rank` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.inventoryequipment
CREATE TABLE IF NOT EXISTS `inventoryequipment` (
  `inventoryequipmentid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inventoryitemid` int(10) unsigned NOT NULL DEFAULT 0,
  `upgradeslots` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 0,
  `str` int(11) NOT NULL DEFAULT 0,
  `dex` int(11) NOT NULL DEFAULT 0,
  `int` int(11) NOT NULL DEFAULT 0,
  `luk` int(11) NOT NULL DEFAULT 0,
  `hp` int(11) NOT NULL DEFAULT 0,
  `mp` int(11) NOT NULL DEFAULT 0,
  `watk` int(11) NOT NULL DEFAULT 0,
  `matk` int(11) NOT NULL DEFAULT 0,
  `wdef` int(11) NOT NULL DEFAULT 0,
  `mdef` int(11) NOT NULL DEFAULT 0,
  `acc` int(11) NOT NULL DEFAULT 0,
  `avoid` int(11) NOT NULL DEFAULT 0,
  `hands` int(11) NOT NULL DEFAULT 0,
  `speed` int(11) NOT NULL DEFAULT 0,
  `jump` int(11) NOT NULL DEFAULT 0,
  `ViciousHammer` tinyint(2) NOT NULL DEFAULT 0,
  `itemLevel` tinyint(1) NOT NULL DEFAULT 0,
  `itemEXP` int(11) NOT NULL DEFAULT 0,
  `durability` mediumint(9) NOT NULL DEFAULT -1,
  `enhance` smallint(3) NOT NULL DEFAULT 0,
  `state` int(11) NOT NULL DEFAULT 0,
  `lines` tinyint(2) NOT NULL DEFAULT 0,
  `potential1` int(11) NOT NULL DEFAULT 0,
  `potential2` int(11) NOT NULL DEFAULT 0,
  `potential3` int(11) NOT NULL DEFAULT 0,
  `potential4` int(11) NOT NULL DEFAULT 0,
  `potential5` int(11) NOT NULL DEFAULT 0,
  `potential6` int(11) NOT NULL DEFAULT 0,
  `anvil` int(11) NOT NULL DEFAULT 0,
  `hpR` smallint(3) NOT NULL,
  `mpR` smallint(3) NOT NULL,
  `potential7` int(11) NOT NULL DEFAULT 0,
  `fire` int(11) NOT NULL DEFAULT -1,
  `downlevel` int(11) NOT NULL DEFAULT 0,
  `bossdmg` int(11) NOT NULL DEFAULT 0,
  `alldmgp` int(11) NOT NULL DEFAULT 0,
  `allstatp` int(11) NOT NULL DEFAULT 0,
  `IgnoreWdef` int(11) NOT NULL DEFAULT 0,
  `soulname` int(11) NOT NULL DEFAULT 0,
  `soulenchanter` int(11) NOT NULL DEFAULT 0,
  `soulpotential` int(11) NOT NULL DEFAULT 0,
  `soulskill` int(11) NOT NULL DEFAULT 0,
  `starforce` int(11) NOT NULL DEFAULT 0,
  `itemtrace` int(11) NOT NULL DEFAULT 0,
  `firestat` varchar(128) NOT NULL DEFAULT '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
  `arc` smallint(6) NOT NULL DEFAULT 0,
  `arcexp` int(11) NOT NULL DEFAULT 0,
  `arclevel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`inventoryequipmentid`),
  KEY `inventoryitemid` (`inventoryitemid`)
) ENGINE=MyISAM AUTO_INCREMENT=45163 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.inventoryitems
CREATE TABLE IF NOT EXISTS `inventoryitems` (
  `inventoryitemid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` int(2) NOT NULL DEFAULT 0,
  `characterid` int(11) DEFAULT NULL,
  `accountid` int(11) NOT NULL DEFAULT -1,
  `packageId` int(11) NOT NULL DEFAULT -1,
  `itemid` int(11) NOT NULL DEFAULT 0,
  `inventorytype` int(11) NOT NULL DEFAULT 0,
  `position` int(11) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `owner` tinytext DEFAULT NULL,
  `GM_Log` text DEFAULT NULL,
  `uniqueid` int(30) NOT NULL DEFAULT -1,
  `flag` int(2) NOT NULL DEFAULT 0,
  `expiredate` bigint(30) NOT NULL DEFAULT -1,
  `giftFrom` varchar(20) DEFAULT NULL,
  `isCash` int(2) NOT NULL DEFAULT 0,
  `isPet` int(2) NOT NULL DEFAULT 0,
  `isAndroid` int(2) NOT NULL DEFAULT 0,
  `issale` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`inventoryitemid`),
  KEY `inventoryitems_ibfk_1` (`characterid`),
  KEY `characterid` (`characterid`),
  KEY `inventorytype` (`inventorytype`),
  KEY `characterid_2` (`characterid`,`inventorytype`),
  KEY `uniqueid` (`uniqueid`)
) ENGINE=MyISAM AUTO_INCREMENT=70642150 DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.inventorylog
CREATE TABLE IF NOT EXISTS `inventorylog` (
  `inventorylogid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inventoryitemid` int(10) unsigned NOT NULL DEFAULT 0,
  `msg` tinytext NOT NULL,
  PRIMARY KEY (`inventorylogid`),
  KEY `inventoryitemid` (`inventoryitemid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.inventoryslot
CREATE TABLE IF NOT EXISTS `inventoryslot` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `characterid` int(10) unsigned DEFAULT NULL,
  `equip` int(10) unsigned DEFAULT NULL,
  `use` int(10) unsigned DEFAULT NULL,
  `setup` int(10) unsigned DEFAULT NULL,
  `etc` int(10) unsigned DEFAULT NULL,
  `cash` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.ipbans
CREATE TABLE IF NOT EXISTS `ipbans` (
  `ipbanid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ip` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`ipbanid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.itempot
CREATE TABLE IF NOT EXISTS `itempot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL DEFAULT 0,
  `lifeid` int(11) NOT NULL DEFAULT 0,
  `slot` int(11) NOT NULL DEFAULT 0,
  `level` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `fullness` int(8) NOT NULL DEFAULT 0,
  `closeness` int(8) NOT NULL DEFAULT 0,
  `starttime` bigint(20) NOT NULL DEFAULT 0,
  `sleeptime` bigint(20) NOT NULL DEFAULT 0,
  `incCloseLeft` int(8) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.keymap
CREATE TABLE IF NOT EXISTS `keymap` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characterid` int(11) NOT NULL DEFAULT 0,
  `key` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 0,
  `action` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `keymap_ibfk_1` (`characterid`)
) ENGINE=MyISAM AUTO_INCREMENT=279881 DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.keyvalue
CREATE TABLE IF NOT EXISTS `keyvalue` (
  `cid` int(11) NOT NULL DEFAULT 0,
  `key` varchar(50) NOT NULL DEFAULT 'null',
  `value` varchar(100) NOT NULL DEFAULT 'null',
  KEY `cid` (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.keyvalue2
CREATE TABLE IF NOT EXISTS `keyvalue2` (
  `cid` int(11) NOT NULL,
  `key` varchar(100) NOT NULL,
  `value` bigint(100) NOT NULL,
  KEY `cid` (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.learnexp
CREATE TABLE IF NOT EXISTS `learnexp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `accid` int(11) NOT NULL DEFAULT 0,
  `exp` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.linkskill
CREATE TABLE IF NOT EXISTS `linkskill` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `accid` int(10) unsigned NOT NULL,
  `realskillid` int(10) unsigned NOT NULL,
  `skillid` int(10) unsigned NOT NULL,
  `linking_cid` int(10) unsigned NOT NULL,
  `linked_cid` int(10) unsigned NOT NULL,
  `skilllevel` int(10) unsigned NOT NULL,
  `time` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=646 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.link_skill
CREATE TABLE IF NOT EXISTS `link_skill` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `skillid` int(10) unsigned NOT NULL,
  `skillLevel` int(10) unsigned NOT NULL,
  `link_cid` int(10) unsigned NOT NULL,
  `cid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.macbans
CREATE TABLE IF NOT EXISTS `macbans` (
  `macbanid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mac` varchar(30) NOT NULL,
  PRIMARY KEY (`macbanid`),
  UNIQUE KEY `mac_2` (`mac`)
) ENGINE=MEMORY DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.macfilters
CREATE TABLE IF NOT EXISTS `macfilters` (
  `macfilterid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `filter` varchar(30) NOT NULL,
  PRIMARY KEY (`macfilterid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.medalranking
CREATE TABLE IF NOT EXISTS `medalranking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET euckr NOT NULL,
  `type` varchar(100) CHARACTER SET euckr NOT NULL,
  `value` bigint(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.memo
CREATE TABLE IF NOT EXISTS `memo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `title` text NOT NULL,
  `date` varchar(64) DEFAULT NULL,
  `memo` text NOT NULL,
  `reply` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.meso_market
CREATE TABLE IF NOT EXISTS `meso_market` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sellname` text DEFAULT NULL,
  `buyname` text DEFAULT NULL,
  `sellmeso` bigint(20) unsigned DEFAULT NULL,
  `sellmesokp` int(10) unsigned DEFAULT NULL,
  `selldate` text DEFAULT NULL,
  `buydate` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.monsterbook
CREATE TABLE IF NOT EXISTS `monsterbook` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `charid` int(10) unsigned NOT NULL DEFAULT 0,
  `cardid` int(10) unsigned NOT NULL DEFAULT 0,
  `level` tinyint(2) unsigned DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.mountdata
CREATE TABLE IF NOT EXISTS `mountdata` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `characterid` int(10) unsigned DEFAULT NULL,
  `Level` int(10) unsigned NOT NULL DEFAULT 0,
  `Exp` int(10) unsigned NOT NULL DEFAULT 0,
  `Fatigue` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.mulungdojo
CREATE TABLE IF NOT EXISTS `mulungdojo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `charid` int(11) NOT NULL DEFAULT 0,
  `stage` tinyint(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.named
CREATE TABLE IF NOT EXISTS `named` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` varchar(13) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.named_char
CREATE TABLE IF NOT EXISTS `named_char` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `itemid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `RC` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `date` varchar(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.notes
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to` varchar(13) NOT NULL DEFAULT '',
  `from` varchar(13) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `timestamp` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.nxcode
CREATE TABLE IF NOT EXISTS `nxcode` (
  `code` varchar(15) NOT NULL,
  `valid` int(11) NOT NULL DEFAULT 1,
  `user` varchar(13) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT 0,
  `item` int(11) NOT NULL DEFAULT 10000,
  PRIMARY KEY (`code`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.oxquiz
CREATE TABLE IF NOT EXISTS `oxquiz` (
  `Id` int(5) NOT NULL DEFAULT 0,
  `Question` varchar(500) NOT NULL DEFAULT 'none',
  `Explaination` varchar(500) NOT NULL DEFAULT 'none',
  `Result` varchar(1) NOT NULL DEFAULT 'X',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.party
CREATE TABLE IF NOT EXISTS `party` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `recom` int(11) DEFAULT NULL,
  `recomp` text DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.pets
CREATE TABLE IF NOT EXISTS `pets` (
  `uniqueid` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(13) DEFAULT NULL,
  `level` int(10) unsigned NOT NULL,
  `closeness` int(10) unsigned NOT NULL,
  `fullness` int(10) unsigned NOT NULL,
  `pet_skill` varchar(70) NOT NULL DEFAULT '-1',
  `expiredate` bigint(14) NOT NULL DEFAULT -1,
  `pet_buff` int(8) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uniqueid`)
) ENGINE=MyISAM AUTO_INCREMENT=402637777 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.playernpcs
CREATE TABLE IF NOT EXISTS `playernpcs` (
  `id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(13) NOT NULL,
  `hair` int(11) NOT NULL,
  `face` int(11) NOT NULL,
  `skin` int(11) NOT NULL,
  `dir` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `map` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.playernpcs_equip
CREATE TABLE IF NOT EXISTS `playernpcs_equip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `npcid` int(11) NOT NULL,
  `equipid` int(11) NOT NULL,
  `equippos` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.questactions
CREATE TABLE IF NOT EXISTS `questactions` (
  `questactionid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `questid` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `data` blob NOT NULL,
  PRIMARY KEY (`questactionid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.questinfo
CREATE TABLE IF NOT EXISTS `questinfo` (
  `questinfoid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `characterid` int(11) NOT NULL DEFAULT 0,
  `quest` int(11) NOT NULL DEFAULT 0,
  `data` mediumtext DEFAULT NULL,
  PRIMARY KEY (`questinfoid`),
  KEY `characterid` (`characterid`)
) ENGINE=MyISAM AUTO_INCREMENT=5342 DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.questrequirements
CREATE TABLE IF NOT EXISTS `questrequirements` (
  `questrequirementid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `questid` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `data` blob NOT NULL,
  PRIMARY KEY (`questrequirementid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.queststatus
CREATE TABLE IF NOT EXISTS `queststatus` (
  `queststatusid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `characterid` int(11) NOT NULL DEFAULT 0,
  `quest` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `time` int(11) NOT NULL DEFAULT 0,
  `forfeited` int(11) NOT NULL DEFAULT 0,
  `customData` text DEFAULT NULL,
  PRIMARY KEY (`queststatusid`),
  KEY `characterid` (`characterid`)
) ENGINE=MyISAM AUTO_INCREMENT=71380 DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.queststatusmobs
CREATE TABLE IF NOT EXISTS `queststatusmobs` (
  `queststatusmobid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `queststatusid` int(10) unsigned NOT NULL DEFAULT 0,
  `mob` int(11) NOT NULL DEFAULT 0,
  `count` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`queststatusmobid`),
  KEY `queststatusid` (`queststatusid`)
) ENGINE=MyISAM AUTO_INCREMENT=1429 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.quickslot
CREATE TABLE IF NOT EXISTS `quickslot` (
  `cid` int(11) NOT NULL,
  `index` int(8) NOT NULL,
  `key` int(8) NOT NULL,
  KEY `cid` (`cid`),
  KEY `cid_2` (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.reactordrops
CREATE TABLE IF NOT EXISTS `reactordrops` (
  `reactordropid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reactorid` int(11) NOT NULL,
  `itemid` int(11) NOT NULL,
  `chance` int(11) NOT NULL,
  `questid` int(5) NOT NULL DEFAULT -1,
  PRIMARY KEY (`reactordropid`),
  KEY `reactorid` (`reactorid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr PACK_KEYS=1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.receivedaccount
CREATE TABLE IF NOT EXISTS `receivedaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accid` int(11) NOT NULL,
  `itemid` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.recom_log
CREATE TABLE IF NOT EXISTS `recom_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `recom` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2419 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.reports
CREATE TABLE IF NOT EXISTS `reports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reporttime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reporterid` int(11) NOT NULL,
  `victimid` int(11) NOT NULL,
  `reason` tinyint(4) NOT NULL,
  `chatlog` text NOT NULL,
  `status` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.rewardsaves
CREATE TABLE IF NOT EXISTS `rewardsaves` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `itemid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.rings
CREATE TABLE IF NOT EXISTS `rings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ringId` int(11) NOT NULL DEFAULT 0,
  `itemid` int(11) NOT NULL DEFAULT 0,
  `partnerChrId` int(11) NOT NULL DEFAULT 0,
  `partnerName` varchar(255) NOT NULL,
  `partnerRingId` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.sakuralogin
CREATE TABLE IF NOT EXISTS `sakuralogin` (
  `no` int(10) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) NOT NULL,
  `time` int(12) NOT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.savedlocations
CREATE TABLE IF NOT EXISTS `savedlocations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characterid` int(11) NOT NULL,
  `locationtype` int(11) NOT NULL DEFAULT 0,
  `map` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `savedlocations_ibfk_1` (`characterid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.send
CREATE TABLE IF NOT EXISTS `send` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `itemid` text DEFAULT NULL,
  `itemop` text DEFAULT NULL,
  `name2` text DEFAULT NULL,
  `time` text DEFAULT NULL,
  `itime` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.serialbans
CREATE TABLE IF NOT EXISTS `serialbans` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `serial` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.shopitems
CREATE TABLE IF NOT EXISTS `shopitems` (
  `shopitemid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shopid` int(10) unsigned NOT NULL DEFAULT 0,
  `itemid` int(11) NOT NULL DEFAULT 0,
  `price` bigint(20) NOT NULL DEFAULT 0,
  `position` int(11) NOT NULL DEFAULT 0,
  `pricequantity` int(4) NOT NULL DEFAULT 0,
  `Tab` int(4) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `period` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`shopitemid`),
  KEY `shopid` (`shopid`)
) ENGINE=InnoDB AUTO_INCREMENT=970000866 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.shops
CREATE TABLE IF NOT EXISTS `shops` (
  `shopid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `npcid` int(11) DEFAULT 0,
  PRIMARY KEY (`shopid`)
) ENGINE=MyISAM AUTO_INCREMENT=91100049 DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.skillmacros
CREATE TABLE IF NOT EXISTS `skillmacros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characterid` int(11) NOT NULL DEFAULT 0,
  `position` tinyint(1) NOT NULL DEFAULT 0,
  `skill1` int(11) NOT NULL DEFAULT 0,
  `skill2` int(11) NOT NULL DEFAULT 0,
  `skill3` int(11) NOT NULL DEFAULT 0,
  `name` varchar(13) DEFAULT NULL,
  `shout` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.skills
CREATE TABLE IF NOT EXISTS `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skillid` int(11) NOT NULL DEFAULT 0,
  `characterid` int(11) NOT NULL DEFAULT 0,
  `skilllevel` int(11) NOT NULL DEFAULT 0,
  `masterlevel` int(11) NOT NULL DEFAULT 0,
  `expiration` bigint(30) NOT NULL DEFAULT -1,
  PRIMARY KEY (`id`),
  KEY `skills_ibfk_1` (`characterid`)
) ENGINE=MyISAM AUTO_INCREMENT=576174 DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.skills_cooldowns
CREATE TABLE IF NOT EXISTS `skills_cooldowns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charid` int(11) NOT NULL,
  `SkillID` int(11) NOT NULL,
  `length` bigint(20) unsigned NOT NULL,
  `StartTime` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=798 DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.spawn
CREATE TABLE IF NOT EXISTS `spawn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lifeid` int(11) NOT NULL,
  `rx0` int(11) NOT NULL,
  `rx1` int(11) NOT NULL,
  `cy` int(11) NOT NULL,
  `fh` int(11) NOT NULL,
  `type` varchar(11) NOT NULL,
  `dir` int(11) NOT NULL,
  `mapid` int(11) NOT NULL,
  `mobTime` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=643 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.spawns_profession
CREATE TABLE IF NOT EXISTS `spawns_profession` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idd` int(11) NOT NULL,
  `f` int(11) NOT NULL,
  `fh` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  `cy` int(11) NOT NULL,
  `rx0` int(11) NOT NULL,
  `rx1` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `mobtime` int(11) DEFAULT 1000,
  `mid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.steelskills
CREATE TABLE IF NOT EXISTS `steelskills` (
  `cid` int(11) NOT NULL,
  `skillid` int(11) NOT NULL,
  `skilllevel` int(7) NOT NULL,
  `index` tinyint(1) NOT NULL,
  `slot` tinyint(1) NOT NULL,
  `equipped` tinyint(1) NOT NULL DEFAULT 0,
  KEY `cid` (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.storages
CREATE TABLE IF NOT EXISTS `storages` (
  `storageid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `accountid` int(11) NOT NULL DEFAULT 0,
  `slots` int(11) NOT NULL DEFAULT 0,
  `meso` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`storageid`),
  KEY `accountid` (`accountid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.trade_cm
CREATE TABLE IF NOT EXISTS `trade_cm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chr_name` text DEFAULT NULL,
  `from_name` text DEFAULT NULL,
  `cash` int(11) DEFAULT NULL,
  `meso` text DEFAULT NULL,
  `confirm` text DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.trocklocations
CREATE TABLE IF NOT EXISTS `trocklocations` (
  `trockid` int(11) NOT NULL AUTO_INCREMENT,
  `characterid` int(11) DEFAULT NULL,
  `mapid` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`trockid`)
) ENGINE=MyISAM DEFAULT CHARSET=euckr;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.website_events
CREATE TABLE IF NOT EXISTS `website_events` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `author` varchar(16) NOT NULL,
  `date` varchar(32) NOT NULL,
  `type` varchar(100) NOT NULL,
  `status` varchar(32) NOT NULL,
  `content` text NOT NULL,
  `views` int(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.website_news
CREATE TABLE IF NOT EXISTS `website_news` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `author` varchar(16) NOT NULL,
  `date` varchar(32) NOT NULL,
  `type` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `views` int(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kms_316.wishlist
CREATE TABLE IF NOT EXISTS `wishlist` (
  `characterid` int(11) NOT NULL,
  `sn` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=euckr ROW_FORMAT=FIXED;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
