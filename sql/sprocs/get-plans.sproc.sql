delimiter // 
drop procedure if exists `barbecue`.`get-plans`//
create procedure `barbecue`.`get-plans` (
	in inUserId varchar(64),
	in inPage integer,
	in inPageSize integer,
	in inFilterMeatId bigint unsigned,
	in inFilterUserId varchar(64),
	in inSortBy varchar(32)
)
language sql
comment 'gets all available plans, supporting pagination'
begin
	declare offset integer;
	set inPage = coalesce(inPage, 1);
	set inPageSize = coalesce(inPageSize, 10);
	set offset = (inPage - 1) * inPageSize;

	select p.id, p.userId, u.name as userName, p.meatId, m.type as meatType, p.name, p.private, p.updated, p.created 
		from `barbecue`.`plans` p 
		join `barbecue`.`meats` m on p.meatId = m.id
		left join `barbecue`.`users` u on p.userId = u.id 
		where p.meatId = case when inFilterMeatId is not null then inFilterMeatId else p.meatId end
		and p.userId = case when inFilterUserId is not null then inFilterUserId else p.userId end
		and (p.private = 0 or p.userId = inUserId)
		order by
      case when inSortBy = '-created' or inSortBy = '-updated' then 1
      	else
      		case 
      			when inSortBy = 'created' then p.created
      			when inSortBy = 'updated' then p.updated
        	end
      	end ASC,
      case when inSortBy = 'created' or inSortBy = 'updated' then 1
      	else
      		case 
      			when inSortBy = '-created' then p.created
      			when inSortBy = '-updated' then p.updated
        	end
      	end desc
		limit offset, inPageSize;

	select count(1) as totalHits 
		from `barbecue`.`plans` p
		left join `barbecue`.`users` u on p.userId = u.id 
		where p.meatId = case when inFilterMeatId is not null then inFilterMeatId else p.meatId end
		and p.userId = case when inFilterUserId is not null then inFilterUserId else p.userId end
		and (p.private = 0 or p.userId = inUserId);
end //
delimiter ;