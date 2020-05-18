delimiter // 
drop procedure if exists `barbecue`.`add-step`//
create procedure `barbecue`.`add-step` (
	in inPlanId bigint unsigned,
	in inAction varchar(256)
)
language sql
comment 'adds a plan step'
begin
	insert into `barbecue`.`steps` (planId, action) values (inPlanId, inAction);
end //
delimiter ;
