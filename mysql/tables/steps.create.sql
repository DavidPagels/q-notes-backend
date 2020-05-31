drop table if exists `barbecue`.`steps`;
create table `barbecue`.`steps` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`planId` bigint unsigned NOT NULL,
  `action` text NOT NULL,
  `deleted` tinyint NOT NULL DEFAULT 0,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  KEY(`planId`)
);