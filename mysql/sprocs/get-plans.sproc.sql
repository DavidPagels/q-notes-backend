delimiter // 
drop procedure if exists `barbecue`.`get-plans`//
create procedure `barbecue`.`get-plans` (
	in inUserId varchar(64)
)
language sql
comment 'gets all plans'
begin
	select p.id, p.userId, u.name as userName, p.name, p.private 
		from `barbecue`.`plans` p 
		left join `barbecue`.`users` u on p.userId = u.id 
		where (p.private = 0 or p.userId = inUserId);
end //
delimiter ;