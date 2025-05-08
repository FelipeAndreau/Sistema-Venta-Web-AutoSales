-- Crear la base de datos
USE master;
GO

CREATE DATABASE MyDatabase;
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'MyDatabase')
BEGIN
    ALTER DATABASE MyDatabase SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE MyDatabase;
END
GO

CREATE DATABASE MyDatabase;
GO

USE MyDatabase;
GO

-- Crear tabla Cars
CREATE TABLE Cars (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Make NVARCHAR(100) NOT NULL,
    Model NVARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Description NVARCHAR(500) NULL,
    ImageUrl NVARCHAR(MAX) NULL,
    IsAvailable BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);
GO

-- Crear tabla Customers
CREATE TABLE Customers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Phone NVARCHAR(20) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);
GO

-- Crear tabla Sales
CREATE TABLE Sales (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CarId INT NOT NULL,
    CustomerId INT NOT NULL,
    SaleDate DATETIME2 NOT NULL DEFAULT GETDATE(),
    SalePrice DECIMAL(18,2) NOT NULL,
    CONSTRAINT FK_Sales_Cars FOREIGN KEY (CarId) 
        REFERENCES Cars(Id) ON DELETE NO ACTION,
    CONSTRAINT FK_Sales_Customers FOREIGN KEY (CustomerId) 
        REFERENCES Customers(Id) ON DELETE NO ACTION
);
GO

-- Insertar datos de ejemplo
INSERT INTO Cars (Make, Model, Year, Price, Description, IsAvailable) VALUES
('Toyota', 'Corolla', 2024, 25000.00, 'Nuevo modelo sedán', 1),
('Honda', 'Civic', 2023, 27000.00, 'Versión deportiva', 1),
('Ford', 'Mustang', 2024, 45000.00, 'Muscle car clásico', 1);
GO

INSERT INTO Customers (Name, Email, Phone) VALUES
('John Doe', 'john@example.com', '555-0100'),
('Jane Smith', 'jane@example.com', '555-0200'),
('Bob Johnson', 'bob@example.com', '555-0300');
GO

INSERT INTO Sales (CarId, CustomerId, SalePrice) VALUES
(1, 1, 24000.00);
GO

-- Crear índices para mejorar el rendimiento
CREATE INDEX IX_Cars_Make ON Cars(Make);
CREATE INDEX IX_Cars_Model ON Cars(Model);
CREATE INDEX IX_Cars_IsAvailable ON Cars(IsAvailable);
CREATE INDEX IX_Customers_Email ON Customers(Email);
CREATE INDEX IX_Sales_SaleDate ON Sales(SaleDate);
GO

-- Crear vista para reportes de ventas
CREATE VIEW vw_SalesReport AS
SELECT 
    s.Id AS SaleId,
    s.SaleDate,
    s.SalePrice,
    c.Make,
    c.Model,
    c.Year,
    cu.Name AS CustomerName,
    cu.Email AS CustomerEmail
FROM Sales s
JOIN Cars c ON s.CarId = c.Id
JOIN Customers cu ON s.CustomerId = cu.Id;
GO

-- Procedimiento almacenado para registrar una venta
CREATE PROCEDURE sp_RegisterSale
    @CarId INT,
    @CustomerId INT,
    @SalePrice DECIMAL(18,2)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Verificar si el auto está disponible
        IF NOT EXISTS (SELECT 1 FROM Cars WHERE Id = @CarId AND IsAvailable = 1)
        BEGIN
            THROW 51000, 'El auto no está disponible para la venta.', 1;
        END

        -- Registrar la venta
        INSERT INTO Sales (CarId, CustomerId, SalePrice, SaleDate)
        VALUES (@CarId, @CustomerId, @SalePrice, GETDATE());

        -- Marcar el auto como no disponible
        UPDATE Cars SET IsAvailable = 0 WHERE Id = @CarId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO

-- Abre SSMS y ejecuta:
USE MyDatabase;
SELECT * FROM Cars;
SELECT * FROM Sales;
SELECT * FROM vw_SalesReport;
GO