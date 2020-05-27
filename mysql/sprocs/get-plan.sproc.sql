delimiter // 
drop procedure if exists `barbecue`.`get-plan`//
create procedure `barbecue`.`get-plan` (
	in inId bigint unsigned,
	in inUserId varchar(64)
)
language sql
comment 'gets a plan by id'
begin
	select p.id, p.userId, p.name, p.private, p.created, p.updated from `barbecue`.`plans` p 
		where p.id = inId 
		and (p.private = 0 or p.userId = inUserId);
end //
delimiter ;