delimiter // 
drop procedure if exists `barbecue`.`get-private-plans`//
create procedure `barbecue`.`get-private-plans` (
	in inUserId varchar(64)
)
language sql
comment 'gets all of a users plans'
begin
	select p.id, p.userId, p.name from `barbecue`.`plans` p where p.userId = inUserId;
end //
delimiter ;