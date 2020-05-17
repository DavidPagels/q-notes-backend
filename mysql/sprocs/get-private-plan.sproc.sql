delimiter // 
drop procedure if exists `barbecue`.`get-private-plan`//
create procedure `barbecue`.`get-private-plan` (
	in inUserId varchar(64),
	in inId bigint unsigned
)
language sql
comment 'gets a private plan by id'
begin
	select p.id, p.name from `barbecue`.`plans` p where p.userId = inUserId and p.id = inId;
end //
delimiter ;