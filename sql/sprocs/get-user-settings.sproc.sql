delimiter // 
drop procedure if exists `barbecue`.`get-user-settings`//
create procedure `barbecue`.`get-user-settings` (
	in inUserId varchar(64)
)
language sql
comment 'gets settings for a given user id'
begin
	select s.userId, s.theme, s.heaterMeterUrl from `barbecue`.`user-settings` s
		where s.userId = inUserId;
end //
delimiter ;
