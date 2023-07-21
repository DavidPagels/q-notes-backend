drop table if exists `barbecue`.`bugs`;
create table `barbecue`.`bugs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`userId` varchar(64) NOT NULL,
  `feedback` text NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP
);