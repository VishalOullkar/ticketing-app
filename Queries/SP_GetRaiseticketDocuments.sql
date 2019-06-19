USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[SP_GetRaiseticketDocuments]    Script Date: 6/19/2019 6:14:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


create procedure [dbo].[SP_GetRaiseticketDocuments]
@IncidentId UNIQUEIDENTIFIER
as
begin
select * from incidentDocuments where IncidentId=@IncidentId
end


GO


