delimiter // 
drop procedure if exists `barbecue`.`get-plans`//
create procedure `barbecue`.`get-plans` (
	in inUserId varchar(64)
)
language sql
comment 'gets all plans'
begin
	select p.id, p.userId, p.name, p.private from `barbecue`.`plans` p where (p.private = 0 or p.userId = inUserId);
end //
delimiter ;