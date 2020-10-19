DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users (
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(60) NOT NULL,
    Balance INT DEFAULT 0,
    UNIQUE(Email)
);

DROP TABLE IF EXISTS Objects;

CREATE TABLE IF NOT EXISTS Objects (
    Name VARCHAR(255) NOT NULL,
    Price INT NOT NULL,
    Amount INT NOT NULL,
    UNIQUE(Name)
);

INSERT INTO Objects (Name, Price, Amount) VALUES
('Cat', 10, 1000), ('Dog', 100, 1000), ('Crocodile', 200, 1000), ('Mammoth', 1000, 1000), ('Giant', 2000, 1000), ('Dragon', 10000, 1000);

DROP TABLE IF EXISTS UserObjects;

CREATE TABLE IF NOT EXISTS UserObjects (
    UserEmail VARCHAR(255) NOT NULL,
    ObjectName VARCHAR(255) NOT NULL,
    ObjectAmount INT
);
