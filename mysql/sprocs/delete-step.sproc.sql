delimiter // 
drop procedure if exists `barbecue`.`delete-step`//
create procedure `barbecue`.`delete-step` (
	in inPlanId bigint unsigned,
	in inId bigint unsigned,
	in inUserId varchar(64)
)
language sql
comment 'deletes a plan step'
begin
	-- Only allow creating user to delete plan steps
	select p.userId into @userId from `barbecue`.`plans` p where p.id = inPlanId;

	if @userId = inUserId then
		update `barbecue`.`steps` s set deleted = 1 where s.id = inId and s.planId = inPlanId;
	end if;
end //
delimiter ;
