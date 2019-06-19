USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[spgetIncidentByEmailId]    Script Date: 6/19/2019 6:02:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[spgetIncidentByEmailId]
(@EmailId varchar(50))

as
Begin
Select *from incident where EmailId=@EmailId;
--select 
--I.Category,I.Priority,I.ProblemDescription,
--I.RaisedDateTime,I.RaisedBy,I.ResolveDescription,I.ResolvedDateTime,
--I.ResolvedBy,I.ResponseDescription,I.ResponseDateTime,
--I.ResponseBy,I.Status,I.RaisedByName,I.ModuleName,I.Link,
--I.ConfirmBy,I.ConfirmDateTime,
--I.IncidentId,I.FileName,I.FilePath,I. IncidentCode
--from Incident I inner join Employee E on I.RaisedBy=E.UserId  where E.EmailId=@EmailId
End


GO


