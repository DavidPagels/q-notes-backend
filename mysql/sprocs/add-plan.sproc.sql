delimiter // 
drop procedure if exists `barbecue`.`add-plan`//
create procedure `barbecue`.`add-plan` (
	in inUserId varchar(64),
	in inName varchar(128),
	in inPrivate tinyint
)
language sql
comment 'adds a plan'
begin
	insert into `barbecue`.`plans` (userId, name, private) values (inUserId, inName, inPrivate);
end //
delimiter ;
