


create PROC [dbo].[sp_InsertUpdateIncidentConvarsion]
@IncidentCode NVARCHAR(MAX),
@Status NVARCHAR(MAX),
@UserID NVARCHAR(MAX),
@ResolveDescription NVARCHAR(MAX),
@ResponseDescription NVARCHAR(MAX),
@Database NVARCHAR(MAX)
AS
BEGIN
IF (@Status ='Response')
BEGIN
	UPDATE Incident SET ResponseBy = @UserID,ResponseDateTime = GETDATE(),Status = @Status,ResponseDescription = @ResponseDescription
	WHERE IncidentCode = @IncidentCode

	insert into incidentConversation(IncidentCode,ResponseBy,ResponseDescription,Status,createdDate )
	values(@IncidentCode,@UserID,@ResponseDescription,@Status,GETDATE()) 

END
ELSE IF (@Status ='Resolved')
BEGIN
	UPDATE Incident SET ResolvedBy = @UserID,ResolvedDateTime = GETDATE(),Status = @Status,ResolveDescription = @ResolveDescription
	WHERE IncidentCode = @IncidentCode

	insert into incidentConversation(IncidentCode,ResolvedBy,ResolveDescription,Status,createdDate )
	values(@IncidentCode,@UserID,@ResolveDescription,@Status,GETDATE()) 
END
IF @Status = 'Response'
SELECT @Status = 'Responded'
END