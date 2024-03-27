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
    Hash VARCHAR(255),
    UNIQUE(Email)
);

-- Add dummy data for users
INSERT INTO Users (ID, FirstName, LastName, Email, IsAdmin) VALUES
(1,  'John', 'Doe', 'john.doe@example.com', true),
(2,  'Jane', 'Smith',  'jane.smith@example.com', false),
(3,   'Admin', 'User', 'admin@example.com', true),
(4,   'Alice', 'Johnson', 'alice.johnson@example.com', false),
(5,   'Bob', 'Miller', 'bob.miller@example.com', false);

CREATE TABLE Tests (
    ID VARCHAR(64) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    MeasureOf VARCHAR(255),
    LevelOfUser VARCHAR(10),
    EditionNumber VARCHAR(100),
    OrderingCompany VARCHAR(155)
);

CREATE TABLE Items (
    ID VARCHAR(64) PRIMARY KEY,
    Status BOOLEAN NOT NULL, -- Available (True) or Borrowed (False)
    ItemType VARCHAR(75),
    ItemName VARCHAR(355),
    Ages VARCHAR(50),
    NumberOfParts VARCHAR(100),
    Location VARCHAR(155),
    TestID VARCHAR(64), 
    IsArchived BOOLEAN NOT NULL,
    Stock INT,
    FOREIGN KEY (TestID) REFERENCES Tests(ID)
);

CREATE TABLE Loans (
    ID VARCHAR(64) PRIMARY KEY,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    UserID VARCHAR(64) NOT NULL, 
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
