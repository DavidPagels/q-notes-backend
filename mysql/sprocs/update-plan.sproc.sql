delimiter // 
drop procedure if exists `barbecue`.`update-plan`//
create procedure `barbecue`.`update-plan` (
	in inId bigint unsigned,
	in inUserId varchar(64),
	in inName varchar(128),
	in inMeatId bigint unsigned,
	in inPrivate tinyint
)
language sql
comment 'updates a plan'
begin
	-- Only allow creating user to update a plan
	select p.userId into @userId from `barbecue`.`plans` p where p.id = inId;

	if @userId = inUserId then
		update `barbecue`.`plans` p 
			set p.name = inName, p.meatId = inMeatId, p.private = inPrivate, p.updated = NOW()
			where p.id = inId;
	end if;
end //
delimiter ;
