select * 
from Apartment a
order by OwnerId asc, UnitPrice desc
where ApartmentId in (
    select ApartmentId 
    from Apartment b 
    where b.OwnerId = a.OwnerId 
    order by UnitPrice desc
    limit 5
);