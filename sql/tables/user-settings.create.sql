drop table if exists `barbecue`.`user-settings`;
create table `barbecue`.`user-settings` (
	`userId` varchar(64) NOT NULL PRIMARY KEY,
  `theme` varchar(16),
  `heaterMeterUrl` varchar(128),
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `created` datetime DEFAULT CURRENT_TIMESTAMP
);
