delimiter // 
drop procedure if exists `barbecue`.`get-plan-steps`//
create procedure `barbecue`.`get-plan-steps` (
	in inPlanId bigint unsigned,
	in inUserId varchar(64)
)
language sql
comment 'gets steps for a given plan id'
begin
	select s.id, s.planId, s.action, s.created, s.updated from `barbecue`.`steps` s 
		join `barbecue`.`plans` p on p.id = s.planId
		where s.planId = inPlanId 
		and s.deleted = 0 
		and (p.private = 0 or p.userId = inUserId);
end //
delimiter ;