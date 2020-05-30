drop table if exists `barbecue`.`meats`;
create table `barbecue`.`meats` (
	`id` bigint unsigned NOT NULL PRIMARY KEY,
	`type` varchar(64) NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP
);

insert into `barbecue`.`meats` (id, type) values
	(1, 'pork'),
	(2, 'beef'),
	(3, 'chicken'),
	(4, 'turkey'),
	(5, 'poultry/other'),
	(6, 'wild game'),
	(7, 'seafood'),
	(8, 'other');