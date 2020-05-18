drop table if exists `barbecue`.`steps`;
create table `barbecue`.`steps` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`planId` bigint unsigned NOT NULL,
  `action` varchar(256) NOT NULL,
  `deleted` tinyint NOT NULL DEFAULT 0,
  KEY(`planId`)
);