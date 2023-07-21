delimiter // 
drop procedure if exists `barbecue`.`upsert-user-settings`//
create procedure `barbecue`.`upsert-user-settings` (
  in inUserId varchar(64),
  in inTheme varchar(16),
  in inHeaterMeterUrl varchar(128)
)
language sql
comment 'adds or updates a users settings info'
begin
  insert into `barbecue`.`user-settings` 
    (
      userId, 
      theme,
      heaterMeterUrl,
      updated
    ) 
    values (
      inUserId, 
      COALESCE(inTheme, theme), 
      COALESCE(inHeaterMeterUrl, heaterMeterUrl), 
      NOW()
    ) 
    ON DUPLICATE KEY UPDATE
      theme = COALESCE(inTheme, theme),
      heaterMeterUrl = COALESCE(inHeaterMeterUrl, heaterMeterUrl),
      updated = NOW();
end //
delimiter ;
