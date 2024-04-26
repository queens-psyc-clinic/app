-- Create the psychClinic database
CREATE DATABASE psychClinic;

-- Switch to the psychClinic database
USE psychClinic;

CREATE TABLE Users (
    ID VARCHAR(64) PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    IsAdmin BOOLEAN NOT NULL,
    IsSubscribed BOOLEAN DEFAULT TRUE,
    ProfilePicture BLOB DEFAULT NULL,
    IsAccepted BOOLEAN DEFAULT FALSE,
    Hash VARCHAR(255),
    UNIQUE(Email)
);

-- Add dummy data for users
INSERT INTO Users (ID, FirstName, LastName, Email, IsAdmin, IsAccepted, Hash) VALUES 
(1,  'Admin', 'User', 'psycclin@queensu.ca', true, true, '27e123ebdafafca3456bee31df844f226b1ebdcddc040aff900a60dbbced258c22b726daf8619e63f866671c077d87051161171ee57f898d11953c6a9522027fb07dccfdac4bb2744bf5bba5b4004737c0a2664c682c1c9caabe667877bc693b');

CREATE TABLE Tests (
    ID VARCHAR(64) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    MeasureOf VARCHAR(255),
    LevelOfUser VARCHAR(10),
    EditionNumber VARCHAR(100),
    OrderingCompany VARCHAR(155),
    Notes TINYTEXT,
    IsArchived BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Items (
    ID VARCHAR(64) PRIMARY KEY,
    Status BOOLEAN NOT NULL DEFAULT TRUE, -- Available (True) or Borrowed (False)
    ItemType VARCHAR(75),
    ItemName VARCHAR(355),
    Ages VARCHAR(155),
    Location VARCHAR(155),
    TestID VARCHAR(64), 
    IsArchived BOOLEAN NOT NULL DEFAULT FALSE,
    Notes TINYTEXT,
    Stock INT,
    FOREIGN KEY (TestID) REFERENCES Tests(ID)
);

CREATE TABLE Loans (
    ID VARCHAR(64) PRIMARY KEY,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    UserID VARCHAR(64) NOT NULL, 
    ItemID VARCHAR(64) NOT NULL,
    IsConfirmed BOOLEAN NOT NULL DEFAULT FALSE,
    Quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (ItemID) REFERENCES Items(ID)
);

CREATE TABLE Notifications (
    ID VARCHAR(64) PRIMARY KEY,
    UserID VARCHAR(64) NOT NULL,
    Message VARCHAR(600),
    NotificationDate DATETIME,
    ItemID VARCHAR(64) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (ItemID) REFERENCES Items(ID)
);

-- Load data into the Tests table from the CSV file
LOAD DATA INFILE '/var/lib/mysql-files/test_data.csv'
INTO TABLE Tests
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; -- Skip header row if it exists in the CSV

-- Load data into the Items table from the CSV file
LOAD DATA INFILE '/var/lib/mysql-files/item_data.csv'
INTO TABLE Items
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS; -- Skip header row if it exists in the CSV

CREATE USER 'dev'@'%' IDENTIFIED BY '498capstone';
GRANT ALL PRIVILEGES ON *.* TO 'dev'@'%';
FLUSH PRIVILEGES;
