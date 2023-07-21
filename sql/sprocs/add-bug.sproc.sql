delimiter // 
drop procedure if exists `barbecue`.`add-bug`//
create procedure `barbecue`.`add-bug` (
	in inUserId varchar(64),
	in inFeedback text
)
language sql
comment 'adds a bug'
begin
	insert into `barbecue`.`bugs` (userId, feedback) values (inUserId, inFeedback);
end //
delimiter ;
