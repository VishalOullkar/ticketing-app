USE [MITRPLUSARC_TEST]
GO

/****** Object:  Table [dbo].[incidentConversation]    Script Date: 6/19/2019 5:58:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[incidentConversation](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Status] [varchar](30) NULL,
	[CreatedDate] [datetime] NULL,
	[IncidentId] [uniqueidentifier] NULL,
	[CommentedBy] [varchar](30) NULL,
	[Comment] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[incidentConversation]  WITH CHECK ADD FOREIGN KEY([IncidentId])
REFERENCES [dbo].[Incident] ([IncidentId])
GO


