USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[spgetConversationList]    Script Date: 6/19/2019 6:00:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[spgetConversationList]
(@IncidentId uniqueidentifier)
as 
Begin
select *from incidentconversation where IncidentId=@IncidentId
End
GO


