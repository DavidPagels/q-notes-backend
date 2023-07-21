drop table if exists `barbecue`.`comments`;
create table `barbecue`.`comments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`userId` varchar(64) NOT NULL,
	`planId` bigint unsigned NOT NULL,
  `comment` text NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP
);