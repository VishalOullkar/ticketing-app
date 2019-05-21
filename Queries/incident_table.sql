USE [MITRPLUSARC_TEST]
GO

/****** Object:  Table [dbo].[Incident]    Script Date: 5/21/2019 4:36:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Incident](
	[IncidentCode] [nvarchar](8) NULL,
	[Category] [nvarchar](32) NULL,
	[Priority] [nvarchar](16) NULL,
	[ProblemDescription] [nvarchar](max) NULL,
	[RaisedDateTime] [datetime] NULL,
	[RaisedBy] [nvarchar](32) NULL,
	[ResolveDescription] [nvarchar](max) NULL,
	[ResolvedDateTime] [datetime] NULL,
	[ResolvedBy] [nvarchar](20) NULL,
	[ResponseDescription] [nvarchar](max) NULL,
	[ResponseDateTime] [datetime] NULL,
	[ResponseBy] [nvarchar](20) NULL,
	[Status] [nvarchar](32) NULL,
	[RaisedByName] [nvarchar](max) NULL,
	[ModuleName] [nvarchar](50) NULL,
	[Link] [nvarchar](max) NULL,
	[ConfirmBy] [nvarchar](32) NULL,
	[ConfirmDateTime] [datetime] NULL,
	[IncidentId] [uniqueidentifier] NOT NULL,
	[FileName] [nvarchar](550) NULL,
	[FilePath] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[IncidentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


