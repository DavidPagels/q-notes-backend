delimiter // 
drop procedure if exists `barbecue`.`get-plans`//
create procedure `barbecue`.`get-plans` (
	in inUserId varchar(64),
	in inPage integer,
	in inPageSize integer
)
language sql
comment 'gets all available plans, supporting pagination'
begin
	declare offset integer;
	set inPage = coalesce(inPage, 1);
	set inPageSize = coalesce(inPageSize, 10);
	set offset = (inPage - 1) * inPageSize;

	select p.id, p.userId, u.name as userName, p.name, p.private, p.updated, p.created 
		from `barbecue`.`plans` p 
		left join `barbecue`.`users` u on p.userId = u.id 
		where (p.private = 0 or p.userId = inUserId)
		limit offset, inPageSize;

	select count(1) as totalHits 
		from `barbecue`.`plans` p
		left join `barbecue`.`users` u on p.userId = u.id 
		where (p.private = 0 or p.userId = inUserId);
end //
delimiter ;