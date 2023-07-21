delimiter // 
drop procedure if exists `barbecue`.`add-plan`//
create procedure `barbecue`.`add-plan` (
	in inUserId varchar(64),
	in inName varchar(128),
	in inMeatId bigint unsigned,
	in inPrivate tinyint
)
language sql
comment 'adds a plan'
begin
	insert into `barbecue`.`plans` (userId, name, meatId, private) values (inUserId, inName, inMeatId, inPrivate);
	SELECT LAST_INSERT_ID() as newPlanId;
end //
delimiter ;
