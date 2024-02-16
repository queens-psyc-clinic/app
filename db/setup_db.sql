-- Create the psychClinic database
CREATE DATABASE psychClinic;

-- Switch to the psychClinic database
USE psychClinic;

CREATE TABLE Users (
    ID INT PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    IsAdmin BOOLEAN NOT NULL
);

-- Add dummy data for users
INSERT INTO Users (ID, UserName, Email, IsAdmin) VALUES
(1, 'JohnDoe', 'john.doe@example.com', true),
(2, 'JaneSmith', 'jane.smith@example.com', false),
(3, 'AdminUser', 'admin@example.com', true),
(4, 'AliceJohnson', 'alice.johnson@example.com', false),
(5, 'BobMiller', 'bob.miller@example.com', false);

CREATE TABLE Tests (
    ID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    MeasureOf VARCHAR(255),
    LevelOfUser VARCHAR(10)
);

CREATE TABLE Items (
    ID INT PRIMARY KEY,
    Status BOOLEAN NOT NULL, -- Available (True) or Borrowed (False)
    ItemType VARCHAR(75),
    ItemName VARCHAR(355),
    EditionNumber VARCHAR(100),
    Ages VARCHAR(50),
    NumberOfParts VARCHAR(100),
    Location VARCHAR(155),
    OrderingCompany VARCHAR(155),
    TestID INT, 
    FOREIGN KEY (TestID) REFERENCES Tests(ID)
);

CREATE TABLE Loans (
    ID INT PRIMARY KEY,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    UserID INT NOT NULL, 
    ItemID INT NOT NULL,
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