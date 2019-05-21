USE [MITRPLUSARC_TEST]
GO

/****** Object:  Table [dbo].[users]    Script Date: 5/16/2019 6:29:24 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[users](
	[userid] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](30) NULL,
	[EmailId] [varchar](50) NULL,
	[password] [varchar](50) NULL,
	[createdby] [varchar](50) NULL,
	[createdDate] [date] NULL,
	[modifiedBy] [varchar](50) NULL,
	[modifiedDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


