delimiter // 
drop procedure if exists `barbecue`.`get-plan`//
create procedure `barbecue`.`get-plan` (
	in inUserId varchar(64),
	in inId bigint unsigned
)
language sql
comment 'gets a plan by id'
begin
	select p.id, p.name, p.private from `barbecue`.`plans` p where p.id = inId and (p.private = 0 or p.userId = inUserId);
end //
delimiter ;