USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[sp_InsertUpdateIncidentConvarsion]    Script Date: 6/19/2019 6:01:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROC [dbo].[sp_InsertUpdateIncidentConvarsion]
@Status NVARCHAR(MAX),
@UserID NVARCHAR(MAX),
@ResolveDescription NVARCHAR(MAX),
@ResponseDescription NVARCHAR(MAX),
@Database NVARCHAR(MAX),
@IncidentId uniqueidentifier
AS
BEGIN
IF (@Status ='Response')
BEGIN
	UPDATE Incident SET ResponseBy = @UserID,ResponseDateTime = GETDATE(),Status = @Status,ResponseDescription = @ResponseDescription
	WHERE IncidentId = @IncidentId

	insert into incidentConversation(commentedby,comment,Status,createdDate,incidentid )
	values(@UserID,@ResponseDescription,@Status,GETDATE(),@IncidentId) 

END
ELSE IF (@Status ='Resolved' or @Status ='Resolve')
BEGIN
	UPDATE Incident SET ResolvedBy = @UserID,ResolvedDateTime = GETDATE(),Status = @Status,ResolveDescription = @ResolveDescription
	WHERE IncidentId = @IncidentId

	insert into incidentConversation(commentedby,comment,Status,createdDate,IncidentId)
	values(@UserID,@ResolveDescription,@Status,GETDATE(),@IncidentId) 
END
ELSE
BEGIN
	insert into incidentConversation(commentedby,comment,Status,createdDate,IncidentId)
	values(@UserID,@ResolveDescription,@Status,GETDATE(),@IncidentId) 
END
END
GO


