delimiter // 
drop procedure if exists `barbecue`.`get-plan-steps`//
create procedure `barbecue`.`get-plan-steps` (
	in inPlanId bigint unsigned
)
language sql
comment 'gets steps for a given plan id'
begin
	select s.id, s.planId, s.action from `barbecue`.`steps` s where s.planId = inPlanId and s.deleted = 0;
end //
delimiter ;