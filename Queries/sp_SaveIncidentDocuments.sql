USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[sp_SaveIncidentDocuments]    Script Date: 6/19/2019 6:12:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[sp_SaveIncidentDocuments]
@IncidentId uniqueidentifier,
@FileName  nvarchar(550),
@FilePath nvarchar(max)
as
begin
 INSERT INTO IncidentDocuments(DocumentId,IncidentId,[FileName],FilePath) VALUES(NEWID(),@IncidentId,@FileName,@FilePath)
end
GO


