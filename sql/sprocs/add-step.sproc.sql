delimiter // 
drop procedure if exists `barbecue`.`add-step`//
create procedure `barbecue`.`add-step` (
	in inPlanId bigint unsigned,
	in inUserId varchar(64),
	in inAction text
)
language sql
comment 'adds a plan step'
begin
	-- Only allow creating user to add plan steps
	select p.userId into @userId from `barbecue`.`plans` p where p.id = inPlanId;

	if @userId = inUserId then
		insert into `barbecue`.`steps` (planId, action) values (inPlanId, inAction);
		SELECT LAST_INSERT_ID() as newStepId;
	end if;
end //
delimiter ;
