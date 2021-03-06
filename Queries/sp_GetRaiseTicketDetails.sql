USE [MITRPLUSARC_TEST]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetRaiseTicketDetails]    Script Date: 5/21/2019 4:43:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[sp_GetRaiseTicketDetails]

@UserID NVARCHAR(32)
,@Status NVARCHAR(64)
AS
BEGIN

SELECT [i].[IncidentId], [i].[Category], [i].[ConfirmBy], [i].[ConfirmDateTime], [i].[FileName], [i].[FilePath],
 [i].[IncidentCode], [i].[Link], [i].[ModuleName], [i].[Priority], [i].[ProblemDescription], [i].[RaisedBy], [i].[RaisedByName], 
 [i].[RaisedDateTime], [i].[ResolveDescription], [i].[ResolvedBy], [i].[ResolvedDateTime], [i].[ResponseBy], [i].[ResponseDateTime], 
 [i].[ResponseDescription], [i].[Status]
FROM [Incident] AS [i] WHERE [i].[Status]=@Status OR ( @Status='All' OR @Status='-1' )

END



