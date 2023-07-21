delimiter // 
drop procedure if exists `barbecue`.`upsert-user`//
create procedure `barbecue`.`upsert-user` (
  in inId varchar(64),
  in inName varchar(128),
  in inFirstName varchar(128),
  in inLastName varchar(128),
  in inMiddleName varchar(128),
  in inNickname varchar(128),
  in inPicture varchar(512),
  in inPreferredUserName varchar(128),
  in inEmail varchar(128),
  in inEmailVerified tinyint,
  in inGender varchar(16),
  in inBirthDate date,
  in inZoneInfo varchar(128),
  in inLocale varchar(128)
)
language sql
comment 'adds or updates a users info'
begin
  insert into `barbecue`.`users` 
    (
      id, 
      name, 
      firstName, 
      lastName, 
      middleName, 
      nickname, 
      picture,
      preferredUserName,
      email,
      emailVerified,
      gender,
      birthdate,
      zoneinfo,
      locale,
      lastLogin
    ) 
    values (
      inId, 
      COALESCE(inName, name), 
      COALESCE(inFirstName, firstName), 
      COALESCE(inLastName, lastName), 
      COALESCE(inMiddleName, middleName), 
      COALESCE(inNickname, nickname), 
      COALESCE(inPicture, picture),
      COALESCE(inPreferredUserName, preferredUserName), 
      COALESCE(inEmail, email), 
      COALESCE(inEmailVerified, emailVerified), 
      COALESCE(inGender, gender), 
      COALESCE(inBirthDate, birthdate), 
      COALESCE(inZoneinfo, zoneinfo), 
      COALESCE(inLocale, locale), 
      NOW()
    ) 
    ON DUPLICATE KEY UPDATE
      name = COALESCE(inName, name),
      firstName = COALESCE(inFirstName, firstName),
      lastName = COALESCE(inLastName, lastName),
      middleName = COALESCE(inMiddleName, middleName),
      nickname = COALESCE(inNickname, nickname), 
      picture = COALESCE(inPicture, picture),
      preferredUserName = COALESCE(inPreferredUserName, preferredUserName),
      email = COALESCE(inEmail, email), 
      emailVerified = COALESCE(inEmailVerified, emailVerified), 
      gender = COALESCE(inGender, gender), 
      birthdate = COALESCE(inBirthDate, birthdate), 
      zoneinfo = COALESCE(inZoneinfo, zoneinfo), 
      locale = COALESCE(inLocale, locale),
      lastLogin = NOW();
end //
delimiter ;
