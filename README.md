# PruebaTecnicaPopularSeguros

Respuesta Corta – Responda con sus propias palabras
1. ¿Qué es una arquitectura de microservicio y como se diferencia de una arquitectura monolítica?
Una arquitectura de microservicio es dividir el desarrollo del softaware multiples servicios o apis, el cual puede desarrollar una funcionalidad especifica y de forma independiente. 
La monolitica es todo lo contrario el desarrollo se enfoca en sotware agrupado donde estan todas las capas y dependen unas de las otras.

2. Mencione al menos 2 patrones de diseño y explique brevemente
Singleton se crea una instancia y se le da acceso Global.
Prototype este crea un clon de una instancia ya existente. 

3. ¿Cuál es la diferencia entre una base de datos relacional y una base de datos no relacional?
La principal diferencia es que la relacional almacena los datos en tablas y no relacional en documentos. La relacional tiene estructuras fijas y la no relacional estructuras flexibles. Tambien las no relacionales es para mayor cantidad de datos. 

Ejecucion del aplicativo.
#Base de datos SQL SERVER
0. Ejecutar SMSS en modo administrador.
1. Crear la Base de Datos PruebaTecnicaPopularSeguros
2. Ejecutar el siguiente script :
USE [PruebaTecnicaPopularSeguros]
GO

/****** Object:  Table [dbo].[Usuario]    Script Date: 4/4/2025 04:39:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Usuario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](max) NOT NULL,
	[correo] [nvarchar](50) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[password] [nvarchar](50) NOT NULL,
	[activo] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

USE [PruebaTecnicaPopularSeguros]
GO

/****** Object:  Table [dbo].[EstadoPoliza]    Script Date: 4/4/2025 04:39:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[EstadoPoliza](
	[ID] [int] NOT NULL,
	[Estado] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Estado] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [PruebaTecnicaPopularSeguros]
GO

/****** Object:  Table [dbo].[TipoPoliza]    Script Date: 4/4/2025 04:39:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TipoPoliza](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](4) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TipoPoliza] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [PruebaTecnicaPopularSeguros]
GO

/****** Object:  Table [dbo].[Polizas]    Script Date: 4/4/2025 04:39:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Polizas](
	[NumeroPoliza] [varchar](50) NOT NULL,
	[TipoPoliza] [int] NOT NULL,
	[CedulaAsegurado] [varchar](10) NOT NULL,
	[MontoAsegurado] [decimal](18, 3) NOT NULL,
	[FechaVencimiento] [datetime2](7) NOT NULL,
	[FechaEmision] [datetime2](7) NOT NULL,
	[Coberturas] [int] NOT NULL,
	[EstadoPoliza] [int] NOT NULL,
	[Prima] [decimal](18, 3) NOT NULL,
	[Periodo] [datetime2](7) NOT NULL,
	[FechaInclusion] [datetime2](7) NOT NULL,
	[Aseguradora] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Polizas] PRIMARY KEY CLUSTERED 
(
	[NumeroPoliza] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

USE [PruebaTecnicaPopularSeguros]
GO

/****** Object:  Table [dbo].[Coberturas]    Script Date: 4/4/2025 04:39:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Coberturas](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](4) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Coberturas] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [PruebaTecnicaPopularSeguros]
GO

/****** Object:  Table [dbo].[Cliente]    Script Date: 4/4/2025 04:39:13 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Cliente](
	[CedulaAsegurado] [varchar](10) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[PrimerApellido] [varchar](50) NOT NULL,
	[SegundoApellido] [varchar](50) NOT NULL,
	[TipoPersona] [int] NOT NULL,
	[FechaNacimiento] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[CedulaAsegurado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


#visual studio
0. Ejecutar Visual Studio modo administrador.
1. Abrir la solucion de nombre CRUDPopularSeguros.sln
2. Compilar la solucion y ejecutar. 

#visual studio code
0. Ejecutar Visual Studio code modo administrador.
1. Abrir la carpeta o folder CRUDPopularSeguros
2. verificar si tiene instalado node.js y sino instalarlo.
3. en la terminal irse a la carpeta "react-ui" del proyecto react la ruta deberia ser similar a 
*donde este almacenado\CRUDPopularSeguros\react-ui>.
4. ejecutar el comando npm start.
5. ir a la url http://localhost:3000/
6. log-in con username = admin y password = admin
