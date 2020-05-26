delimiter // 
drop procedure if exists `barbecue`.`get-plan-comments`//
create procedure `barbecue`.`get-plan-comments` (
	in inUserId varchar(64),
	in inPlanId bigint unsigned
)
language sql
comment 'gets comments for a given plan id'
begin
	select c.id, c.userId, u.name as userName, u.picture as userPicture, c.planId, c.comment, c.created from `barbecue`.`comments` c 
		join `barbecue`.`plans` p on p.id = c.planId
		left join `barbecue`.`users` u on u.id = c.userId
		where c.planId = inPlanId
		and (p.private = 0 or p.userId = inUserId);
end //
delimiter ;