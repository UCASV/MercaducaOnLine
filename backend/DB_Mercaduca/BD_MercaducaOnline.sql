IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = 'db_mercaduca')
BEGIN
    PRINT 'Creando la base de datos';
	CREATE DATABASE db_mercaduca;
END

USE db_mercaduca;

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Imagen')
BEGIN
	PRINT 'Creando la tabla Imagen';
	CREATE TABLE Imagen
	(
		id INT IDENTITY(1,1) PRIMARY KEY,
		codigo_imagen VARCHAR(50)
	);	
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Emprendimiento')
BEGIN
	PRINT 'Creando la tabla Emprendimiento';
	CREATE TABLE Emprendimiento 
	(
		id INT IDENTITY(1,1) PRIMARY KEY,
		nombre VARCHAR(50) ,
		estado VARCHAR(20) NOT NULL DEFAULT 'Inactivo',
		id_imagen INT FOREIGN KEY REFERENCES Imagen(id) ON DELETE CASCADE
	);
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Categoria')
BEGIN
	PRINT 'Creando la tabla Categoria';
	CREATE TABLE Categoria
	(
		id INT IDENTITY(1,1) PRIMARY KEY,
		nombre VARCHAR(50)
	);
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Producto')
BEGIN
	PRINT 'Creando la tabla Producto';
	CREATE TABLE Producto
	(
		id INT IDENTITY(1,1) PRIMARY KEY,
		nombre VARCHAR(20),
		id_categoria INT FOREIGN KEY REFERENCES Categoria(id) ON DELETE CASCADE,
	);
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'EmprendimientoxProducto')
BEGIN
	PRINT 'Creando la tabla EmprendimientoxProducto';
	CREATE TABLE EmprendimientoxProducto
	(
		descripcion VARCHAR(100),
		Estado BIT,
		precio DECIMAL(18,2),
		id_imagen INT FOREIGN KEY REFERENCES Imagen(id) ON DELETE CASCADE,
		id_emprendimiento INT FOREIGN KEY REFERENCES Emprendimiento(id),
		id_producto INT FOREIGN KEY REFERENCES Producto(id) ON DELETE CASCADE
	);
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'Evento')
BEGIN
	PRINT 'Creando la tabla Evento';
	CREATE TABLE Evento
	(
		id INT IDENTITY(1,1) PRIMARY KEY,
		nombre VARCHAR(40),
		descripcion VARCHAR(100),
		horario_inicio DATETIME,
		horario_final DATETIME,
	);
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'EmprendimientoxEvento')
BEGIN
	PRINT 'Creando la tabla EmprendimientoxEvento';
	CREATE TABLE EmprendimientoXEvento 
	(
		id_emprendimiento INT FOREIGN KEY REFERENCES Emprendimiento(id),
		id_evento INT FOREIGN KEY REFERENCES Evento(id) ON DELETE CASCADE,
	);
END

IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'ProductosMasVendidos')
BEGIN
	PRINT 'Creando la tabla ProductosMasVendidos';
	CREATE TABLE ProductosMasVendidos
	(
		id INT IDENTITY(1,1) PRIMARY KEY,
		id_producto INT FOREIGN KEY REFERENCES Producto(ID) ON DELETE CASCADE
	);
END

