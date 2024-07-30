DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;


CREATE TABLE IF NOT EXISTS Tourist_Groups (
    Group_ID       	serial primary key,
    Name_Group     	varchar(40),
	Country			varchar(40) not null,
	Check_in_date	date not null,
	Check_out_date	date not null
);

CREATE TABLE IF NOT EXISTS Peoples (
	People_ID		serial primary key,
	Last_Name		varchar(60) not null,
	First_Name		varchar(40) not null,
	Middle_Name		varchar(60),
	Passport_Data	int,
	Gender			bool not null,
	Parent_ID		serial references Peoples(People_ID)
);

CREATE TYPE category_type AS ENUM ('child', 'shop', 'rest');

CREATE TABLE Tourists (
    Tourist_ID      serial primary key,
	Group_ID		int not null,
	foreign key (Group_ID) references Tourist_Groups(Group_ID),
	People_ID		int not null,
    foreign key (People_ID) references Peoples(People_ID),
    Category		category_type not null
);

CREATE TABLE IF NOT EXISTS Hotels (
	Hotel_ID		serial primary key,
	Hotel_Name		varchar(30) not null,
	Night_Cost		int not null
);

CREATE TABLE IF NOT EXISTS Hotel_Booking (
	Booking_ID		serial primary key,
	Hotel_ID		int not null,
	foreign key (Hotel_ID) references Hotels(Hotel_ID),
	Tourist_ID		int not null,
	foreign key (Tourist_ID) references Tourists(Tourist_ID),
	Check_in_date	date not null,
	Check_out_date	date not null
);

CREATE TABLE IF NOT EXISTS Agencies (
	Agency_ID		serial primary key,
	Agency_Name		varchar(40) not null
);

CREATE TABLE IF NOT EXISTS Excursions (
	Excursion_ID	serial primary key,
	Agency_ID		int not null,
	foreign key (Agency_ID) references Agencies(Agency_ID),
	Excursion_Name	varchar(40) not null,
	Excursion_Cost	int not null,
	Maximum_People	int not null
);

CREATE TABLE IF NOT EXISTS Excursion_Schedule (
	Schedule_ID		serial primary key,
	Excursion_ID	int not null,
	foreign key (Excursion_ID) references Excursions(Excursion_ID),
	Excursion_Date	date not null,
	Start_Time		time not null,
	End_Time		time not null
);

CREATE TABLE IF NOT EXISTS Excursion_Booking_Records (
	Tourist_ID		int not null,
	foreign key (Tourist_ID) references Tourists(Tourist_ID),
	Schedule_ID		int not null,
	foreign key (Schedule_ID) references Excursion_Schedule(Schedule_ID),
	constraint record_ID primary key (Tourist_ID, Schedule_ID)
);

CREATE TABLE IF NOT EXISTS Feedback (
	Record_ID		serial primary key,
	Tourist_ID		int not null,
	foreign key (Tourist_ID) references Tourists(Tourist_ID),
	Excursion_ID	int not null,
	foreign key (Excursion_ID) references Excursions(Excursion_ID),
	Estimation		int not null,
	Description		varchar(150)
);

CREATE TABLE IF NOT EXISTS Flights (
	Flight_ID		serial primary key,
	Seats_Number	int,
	Cargo_Seats		int
);

CREATE TYPE flight_type AS ENUM ('departure', 'arrival');

CREATE TABLE IF NOT EXISTS Flights_Schedule (
	Schedule_ID		serial primary key,
	Tourist_ID		int not null,
	foreign key (Tourist_ID) references Tourists(Tourist_ID),
	Flight_Number	int not null,
	foreign key (Flight_Number) references Flights(Flight_ID),
	Date_Time		date not null,
	Flight_Type		flight_type not null
);

CREATE TABLE IF NOT EXISTS Visas (
	Visa_ID			serial primary key,
	Tourist_ID		int not null,
	foreign key (Tourist_ID) references Tourists(Tourist_ID),
	Issue_Date		date,
	Expiration_date	date,
	Country			varchar(30) not null
);

CREATE TABLE IF NOT EXISTS Visas_Document (
	Document_ID			serial primary key,
	Visa_ID				int not null,
	foreign key (Visa_ID) references Visas(Visa_ID),
	Document_Name		varchar(50),
	Document_Content	varchar(150)
);

CREATE TABLE IF NOT EXISTS Warehouse (
	Product_ID		serial primary key,
	Product_Name	varchar(70) not null,
	Place_Number	int not null,
	Weight			real not null,
	Product_Cost	int not null,
	Insurance_Cost	int,
	Packaging_Cost	int,
	Receipt_Date	date,
	Unloading_Date	date
);

CREATE TABLE IF NOT EXISTS Purchases (
	Purchase_ID		serial primary key,
	Tourist_ID		int not null,
	foreign key (Tourist_ID) references Tourists(Tourist_ID),
	Product_ID		int not null,
	foreign key (Product_ID) references Warehouse(Product_ID),
	count_purchase	int not null
);


CREATE TABLE IF NOT EXISTS Migrations (
	Migration_ID	serial primary key,
	Name			text
);

INSERT INTO Migrations (Name) VALUES ('0_init');