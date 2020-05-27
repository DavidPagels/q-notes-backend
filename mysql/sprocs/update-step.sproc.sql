delimiter // 
drop procedure if exists `barbecue`.`update-step`//
create procedure `barbecue`.`update-step` (
	in inPlanId bigint unsigned,
	in inId bigint unsigned,
	in inUserId varchar(64),
	in inAction varchar(256)
)
language sql
comment 'updates a plan step'
begin
	-- Only allow creating user to update plan steps
	select p.userId into @userId from `barbecue`.`plans` p where p.id = inPlanId;

	if @userId = inUserId then
		update `barbecue`.`steps` s 
			set s.action = inAction, s.updated = NOW()
			where s.id = inId 
			and s.planId = inPlanId;
	end if;
end //
delimiter ;
