delimiter // 
drop procedure if exists `barbecue`.`add-plan-comment`//
create procedure `barbecue`.`add-plan-comment` (
	in inUserId varchar(64),
	in inPlanId bigint unsigned,
	in inComment text
)
language sql
comment 'adds a comment to a plan'
begin
	-- Disallow non-creating user comments on private plans
	select p.private, p.userId into @private, @userId 
		from `barbecue`.`plans` p 
		where p.id = inPlanId;

	if @private = 0 or @userId = inUserId then
		insert into `barbecue`.`comments` (userId, planId, comment) values (inUserId, inPlanId, inComment);
		SELECT LAST_INSERT_ID() as newStepId;
	end if;
end //
delimiter ;
