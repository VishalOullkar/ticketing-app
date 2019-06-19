USE [MITRPLUSARC_TEST]
GO

/****** Object:  Table [dbo].[IncidentDocuments]    Script Date: 6/19/2019 5:58:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[IncidentDocuments](
	[DocumentId] [uniqueidentifier] NOT NULL,
	[IncidentId] [uniqueidentifier] NOT NULL,
	[FileName] [nvarchar](550) NULL,
	[FilePath] [nvarchar](max) NULL,
	[CreateDate] [datetime] NULL CONSTRAINT [DF__IncidentD__Creat__6B4FD30B]  DEFAULT (getdate()),
 CONSTRAINT [PK_IncidentDocuments] PRIMARY KEY CLUSTERED 
(
	[DocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


