--- 1 ---
--- Общий список туристов ---
SELECT 
    t.Tourist_ID, 
    p.Last_Name, 
    p.First_Name, 
    p.Middle_Name, 
    p.Passport_Data, 
    p.Gender 
FROM Tourists t
JOIN Peoples p ON t.People_ID = p.People_ID;

--- Список по указанной категории ---
SELECT 
    t.Tourist_ID, 
	t.Category,
    p.Last_Name, 
    p.First_Name, 
    p.Middle_Name, 
    p.Passport_Data, 
    p.Gender
FROM Tourists t
JOIN Peoples p ON t.People_ID = p.People_ID WHERE t.Category = 'cargo';

--- 2 ---
--- Общий список ---
SELECT 
	h.Hotel_Name,
	hb.Check_in_date,
	hb.Check_out_date,
	p.Last_Name, 
    p.First_Name
FROM Hotel_Booking hb
JOIN Tourists t ON hb.Tourist_ID = t.Tourist_ID
JOIN Peoples p ON t.People_ID = p.People_ID
JOIN Hotels h ON hb.Hotel_ID = h.Hotel_ID
WHERE h.Hotel_Name = 'Название отеля';

--- Список по указанной категории ---
SELECT 
	h.Hotel_Name,
	hb.Check_in_date,
	hb.Check_out_date,
	p.Last_Name, 
    p.First_Name
FROM Hotel_Booking hb
JOIN Tourists t ON hb.Tourist_ID = t.Tourist_ID
JOIN Peoples p ON t.People_ID = p.People_ID
JOIN Hotels h ON hb.Hotel_ID = h.Hotel_ID
WHERE h.Hotel_Name = 'Название отеля' AND t.Category = 'cargo';

--- 3 ---
--- Общий список ---
SELECT COUNT (*) AS total_tourists
FROM Tourists t
JOIN Tourist_Groups tg ON t.Group_ID = tg.Group_ID
JOIN Flights_Schedule fs ON t.Tourist_ID = fs.Tourist_ID
WHERE 
	tg.Country = 'Название страны'
	AND fs.flight_type = 'arrival'
	AND fs.date_time BETWEEN '2022-03-24' AND '2022-03-29';

--- Список по категории ---
SELECT COUNT (*) AS total_tourists
FROM Tourists t
JOIN Tourist_Groups tg ON t.Group_ID = tg.Group_ID
JOIN Flights_Schedule fs ON t.Tourist_ID = fs.Tourist_ID
WHERE 
	tg.Country = 'Название страны'
	AND t.Category = 'cargo'
	AND fs.flight_type = 'arrival'
	AND fs.date_time BETWEEN '2022-03-24' AND '2022-03-29';


--- 4 ---
SELECT
    visits.visits,
    visits.first_arrival,
    visits.last_departure,
    hotels.Hotel_Name,
    hotels.Check_in_date,
    hotels.Check_out_date,
    excursions.Excursion_Name,
    excursions.Agency_Name,
    cargo.Product_Name,
    cargo.Weight
FROM
    (SELECT 
        COUNT(*) AS visits,
        MIN(fs.Date_Time) AS first_arrival,
        MAX(fs.Date_Time) AS last_departure
    FROM 
        Flights_Schedule fs
    JOIN 
        Tourists t ON fs.Tourist_ID = t.Tourist_ID
    WHERE 
        t.People_ID = '123') AS visits
    
LEFT JOIN
    (SELECT 
        h.Hotel_Name,
        hb.Check_in_date,
        hb.Check_out_date
    FROM 
        Hotel_Booking hb
    JOIN 
        Hotels h ON hb.Hotel_ID = h.Hotel_ID
    JOIN 
        Tourists t ON hb.Tourist_ID = t.Tourist_ID
    WHERE 
        t.People_ID = '123') AS hotels ON true
    
LEFT JOIN
    (SELECT 
        ebr.Tourist_ID,
        e.Excursion_Name,
        a.Agency_Name
    FROM 
        Excursion_Booking_Records ebr
    JOIN 
        Excursion_Schedule es ON ebr.Schedule_ID = es.Schedule_ID
    JOIN 
        Excursions e ON es.Excursion_ID = e.Excursion_ID
    JOIN 
        Agencies a ON e.Agency_ID = a.Agency_ID) AS excursions ON excursions.Tourist_ID = '123'

LEFT JOIN
    (SELECT 
        w.Product_Name,
        w.Weight,
        p.Tourist_ID
    FROM 
        Warehouse w
    JOIN 
        Purchases p ON w.Product_ID = p.Product_ID
    JOIN 
        Tourists t ON p.Tourist_ID = t.Tourist_ID
    WHERE 
        t.People_ID = '123') AS cargo ON cargo.Tourist_ID = '123';

--- 5 ---
SELECT 
    h.Hotel_Name,
    COUNT(*) AS occupied_rooms,
    SUM(t.Number_Of_Guests) AS total_guests
FROM 
    Hotels h
JOIN 
    Hotel_Booking hb ON h.Hotel_ID = hb.Hotel_ID
LEFT JOIN 
    (SELECT 
         hb.Hotel_ID,
         hb.Booking_ID,
         COUNT(*) AS Number_Of_Guests
     FROM 
         Hotel_Booking hb
     JOIN 
         Tourists t ON hb.Tourist_ID = t.Tourist_ID
     WHERE 
         hb.Check_in_date BETWEEN '2024.01.01' AND '2024.03.04'
     GROUP BY 
         hb.Hotel_ID, hb.Booking_ID) AS t ON hb.Hotel_ID = t.Hotel_ID AND hb.Booking_ID = t.Booking_ID
WHERE 
    hb.Check_in_date BETWEEN '2024.01.01' AND '2024.03.04'
GROUP BY 
    h.Hotel_Name;

--- 6 ---
SELECT
	COUNT(*) AS count_people
FROM Excursion_Booking_Records ebr
JOIN Excursion_Schedule es ON ebr.Schedule_ID = es.Schedule_ID
WHERE es.Excursion_Date BETWEEN '2024.01.01' AND '2024.02.02'
GROUP BY ebr.Record_ID;

--- 7 ---
--- Экскурсии ---
SELECT
	e.Excursion_Name,
	COUNT (*) AS count_bookings
FROM Excursion_Booking_Records ebr
JOIN Excursion_Schedule es ON ebr.Schedule_ID = es.Schedule_ID
JOIN Excursions e ON es.Excursion_ID = e.Excursion_ID
GROUP BY e.Excursion_Name
ORDER BY count_bookings DESC
LIMIT 10;

--- Агенства ---
SELECT 
	a.Agency_Name,
	AVG(f.estimation) AS average_estimation
FROM Feedback f
JOIN Excursions e ON f.Excursion_ID = e.Excursion_ID
JOIN Agencies a ON e.Agency_ID = a.Agency_ID
GROUP BY a.Agency_Name
ORDER BY average_estimation DESC
LIMIT 10;

--- 8 ---
SELECT 
    f."flightId",
    f."seatsNumber" AS total_seats,
    COUNT(fs."touristId") AS occupied_seats,
    SUM(w.weight) AS total_cargo_weight
FROM "Flights" f
JOIN "FlightsSchedules" fs ON f."flightId" = fs."flightNumber"
JOIN "Purchases" p ON fs."touristId" = p."touristId"
LEFT JOIN "WarehouseItems" w ON p."productId" = w."productId"
WHERE 
    f."flightId" = '2'
    AND fs.date = '2024-05-25T00:00:00.000Z'
GROUP BY 
    f."flightId", f."seatsNumber";

--- 9 ---
SELECT 
	COUNT(DISTINCT w.Place_Number) as total_occupied_places,
	SUM(w.Weight) as total_cargo_weight,
	COUNT(DISTINCT fs.Flight_Number) as total_flights
FROM Warehouse w
JOIN Purchases p ON w.Product_ID = w.Product_ID
JOIN Flights_Schedule fs ON p.Tourist_ID = fs.Tourist_ID
WHERE w.Unloading_Date BETWEEN '2024.01.01' AND '2024.01.01';

--- 10 ---
--- По группе ---
SELECT
    tg.Group_ID,
    SUM(h.Night_Cost * (hb.Check_out_date - hb.Check_in_date)) AS total_hotel_cost,
    SUM(e.Excursion_Cost) AS total_excursion_cost,
    COUNT(*) AS total_tourists,
    SUM(h.Night_Cost * (hb.Check_out_date - hb.Check_in_date)) + SUM(e.Excursion_Cost) AS total_cost
FROM Tourist_Groups tg
JOIN Tourists t ON tg.Group_ID = t.Group_ID
LEFT JOIN Hotel_Booking hb ON t.Tourist_ID = hb.Tourist_ID
LEFT JOIN Hotels h ON hb.Hotel_id = h.Hotel_ID
LEFT JOIN excursion_booking_records ebs ON t.Tourist_ID = ebs.Tourist_ID
LEFT JOIN Excursion_Schedule es ON ebs.Schedule_ID = es.Schedule_ID
LEFT JOIN Excursions e ON es.Excursion_ID = e.Excursion_ID
WHERE tg.Group_ID = '123'
GROUP BY tg.Group_ID;

--- По категории ---
SELECT
    tg.Group_ID,
    SUM(h.Night_Cost * (hb.Check_out_date - hb.Check_in_date)) AS total_hotel_cost,
    SUM(e.Excursion_Cost) AS total_excursion_cost,
    COUNT(*) AS total_tourists,
    SUM(h.Night_Cost * (hb.Check_out_date - hb.Check_in_date)) + SUM(e.Excursion_Cost) AS total_cost
FROM Tourist_Groups tg
JOIN Tourists t ON tg.Group_ID = t.Group_ID
LEFT JOIN Hotel_Booking hb ON t.Tourist_ID = hb.Tourist_ID
LEFT JOIN Hotels h ON hb.Hotel_id = h.Hotel_ID
LEFT JOIN excursion_booking_records ebs ON t.Tourist_ID = ebs.Tourist_ID
LEFT JOIN Excursion_Schedule es ON ebs.Schedule_ID = es.Schedule_ID
LEFT JOIN Excursions e ON es.Excursion_ID = e.Excursion_ID
WHERE tg.Group_ID = '123' AND t.category = 'cargo'
GROUP BY tg.Group_ID;

--- 11 ---

--- 12 ---
SELECT
	w.Product_Name,
	COUNT(*) AS total_shipments,
	COUNT(*) * 100.0 / total_total_shipments AS share_percentage
FROM  Warehouse w, (SELECT COUNT(*) AS total_total_shipments FROM Warehouse)
GROUP BY w.Product_Name, total_total_shipments
ORDER BY total_shipments DESC;

--- 13 ---

--- 14 ---
SELECT
    (SELECT COUNT(*) FROM Tourists) AS total_tourists,
    (SELECT COUNT(*) FROM Tourists WHERE Category = 'rest') AS leisure_tourists,
    (SELECT COUNT(*) FROM Tourists WHERE Category = 'shop') AS shop_tourists,
    (SELECT COUNT(*) FROM Tourists WHERE Category = 'rest') * 100.0 /
        1 AS leisure_shop_ratio; -- вместо 1 (SELECT COUNT(*) FROM Tourists WHERE Category = 'shop')

SELECT
	(SELECT COUNT(*) FROM Tourist_Groups WHERE check_in_date BETWEEN '2024.01.01' AND '2024.02.02') AS total_tourists,
	(SELECT COUNT(*) FROM Tourist_Groups tg 
	JOIN Tourists t ON tg.Group_ID = t.Group_ID 
    WHERE t.Category = 'rest' AND tg.Check_in_date BETWEEN '2024.01.01' AND '2024.02.02') AS leisure_tourists,
	(SELECT COUNT(*) FROM Tourist_Groups tg 
    JOIN Tourists t ON tg.Group_ID = t.Group_ID 
    WHERE t.Category = 'shop' AND tg.Check_in_date BETWEEN '2024.01.01' AND '2024.02.02') AS shop_tourists,
    (SELECT COUNT(*) FROM Tourist_Groups tg1 
    JOIN Tourists t1 ON tg1.Group_ID = t1.Group_ID 
    WHERE t1.Category = 'rest' AND tg1.Check_in_date BETWEEN '2024.01.01' AND '2024.02.02') * 100.0 /
    	1 AS leisure_shop_ratio;
	--(SELECT COUNT(*) FROM Tourist_Groups tg2 
     --   JOIN Tourists t2 ON tg2.Group_ID = t2.Group_ID 
       -- WHERE t2.Category = 'shop' AND tg2.Check_in_date BETWEEN '2024.01.01' AND '2024.02.02') AS leisure_shop_ratio;

--- 15 ---
SELECT
    tg.Group_ID,
    tg.Name_Group AS group_name,
    h.Hotel_Name AS hotel,
    w.Product_Name AS cargo,
    fs.Flight_Number AS flight_number,
    fs.Date_Time AS flight_datetime
FROM Flights_Schedule fs
JOIN Tourists t ON fs.Tourist_ID = t.Tourist_ID
JOIN Tourist_Groups tg ON t.Group_ID = tg.Group_ID
LEFT JOIN Hotel_Booking hb ON t.Tourist_ID = hb.Tourist_ID
LEFT JOIN Hotels h ON hb.Hotel_ID = h.Hotel_ID
LEFT JOIN Purchases p ON t.Tourist_ID = p.Tourist_ID
LEFT JOIN Warehouse w ON p.Product_ID = w.Product_ID
WHERE fs.Flight_Number = '123';

