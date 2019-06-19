USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[sp_getNextIncidentcode1]    Script Date: 6/19/2019 6:10:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE procedure [dbo].[sp_getNextIncidentcode1]

as

Begin 



--SELECT  Max(SUBSTRING(Incidentcode, 4, 8)) AS NextIncidentcode  from Incident

DECLARE @IncidentCode Varchar(50) 

DECLARE @MaxID INT

select @MaxID = COUNT(1) + 1 FROM Incident

SELECT @IncidentCode   = 'INC' + REPLICATE(0,5-LEN(@MaxID)) + CAST(@MaxID AS NVARCHAR) 

SELECT  ''as Category,'' as Priority,'' as ProblemDescription,
getdate() as RaisedDateTime,'' as RaisedBy,'' as ResolveDescription,getdate() as ResolvedDateTime,
'' as ResolvedBy,'' as ResponseDescription,getdate() as ResponseDateTime,
'' as ResponseBy,'' as Status,'' as RaisedByName,'' as ModuleName,'' as Link,'' as EmailId,'' as MobileNo,
'' as ConfirmBy,getdate() as ConfirmDateTime,
 NEWID() as IncidentId,'' as FileName,'' as FilePath, @IncidentCode as IncidentCode



End



GO


