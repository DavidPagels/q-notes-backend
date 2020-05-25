drop table if exists `barbecue`.`users`;
create table `barbecue`.`users` (
	`id` varchar(64) NOT NULL PRIMARY KEY,
  `name` varchar(128) NOT NULL,
  `firstName` varchar(128),
  `lastName` varchar(128),
  `middleName` varchar(128),
  `nickname` varchar(128),
  `preferredUserName` varchar(128),
  `email` varchar(128),
  `emailVerified` tinyint,
  `gender` varchar(16),
  `birthdate` date,
  `zoneinfo` varchar(128),
  `locale` varchar(128),
  `lastLogin` datetime DEFAULT CURRENT_TIMESTAMP,
  `created` datetime DEFAULT CURRENT_TIMESTAMP
);
