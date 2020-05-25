drop table if exists `barbecue`.`plans`;
create table `barbecue`.`plans` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`userId` varchar(64) NOT NULL,
  `name` varchar(128) NOT NULL,
  `private` tinyint NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP
);