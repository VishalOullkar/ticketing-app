USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[sp_UpdateIncidentStatus]    Script Date: 6/19/2019 6:13:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_UpdateIncidentStatus]
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




--DECLARE @EmpId NVARCHAR(17),@EmpEmailID NVARCHAR(MAX),@SupEmailId NVARCHAR(MAX),@SupName NVARCHAR(32),
--@VarSql NVARCHAR(MAX),@Body NVARCHAR(MAX),@Subject NVARCHAR(MAX)

--SELECT TOP 1 @SupName = SupporterName,@SupEmailId = EmailID FROM Supporter WHERE SupporterId = @UserID
--SELECT @Subject = @SupName +' ' + @Status + ' Incident ' + @IncidentCode

----SELECT @Body = '<p>Dear ' + RaisedByName + ',<br/>' + @SupName + ' ' + @Status + ' an incident with following details.<br/><br/><b>Incident Code : </b>' + IncidentCode
----+ '<br/><b>Description : </b>' + ProblemDescription + '<br/><b>Module Name : </b>'+ ModuleName+ '<br/><b>Link : </b>'+ Link
----+ '<br/><b>Priority : </b>' + Priority + '<br/><br/><b> Action : </b>' + @Status + '<br/><b>Remarks : </b>' + @Description + '<br/><br/>Regards<br/>' + @SupName + '</p>',
----@EmpId = RaisedBy
----FROM Incident WHERE IncidentCode = @IncidentCode

--IF (@Status ='Response')
--Begin
--SELECT @Body = '<p>Dear ' + RaisedByName + ',<br/>' + @SupName + ' ' + @Status + ' an incident with following details.<br/><br/><b>Incident Code : </b>' + IncidentCode
--+ '<br/><b>Description : </b>' + ProblemDescription + '<br/><b>Module Name : </b>'+ ModuleName+ '<br/><b>Link : </b>'+ Link
--+ '<br/><b>Priority : </b>' + Priority + '<br/><br/><b> Action : </b>' + @Status + '<br/><b>Remarks : </b>' + @ResponseDescription + '<br/><br/>Regards<br/>' + @SupName + '</p>',
--@EmpId = RaisedBy
--FROM Incident WHERE IncidentCode = @IncidentCode
--End
--else If (@Status ='Resolved')
--Begin 

--SELECT @Body = '<p>Dear ' + RaisedByName + ',<br/>' + @SupName + ' ' + @Status + ' an incident with following details.<br/><br/><b>Incident Code : </b>' + IncidentCode
--+ '<br/><b>Description : </b>' + ProblemDescription + '<br/><b>Module Name : </b>'+ ModuleName+ '<br/><b>Link : </b>'+ Link
--+ '<br/><b>Priority : </b>' + Priority + '<br/><br/><b> Action : </b>' + @Status + '<br/><b>Remarks : </b>' + @ResolveDescription + '<br/><br/>Regards<br/>' + @SupName + '</p>',
--@EmpId = RaisedBy
--FROM Incident WHERE IncidentCode = @IncidentCode

--End

--SELECT @VarSql ='USE ' + @Database + ';SELECT TOP 1 @EmpEmailID = EmailID FROM Employee WHERE UserID = ''' + @EmpId + ''';'
--EXEC sp_executesql @VarSql,N'@EmpEmailID NVARCHAR(MAX) OUTPUT',@EmpEmailID OUTPUT

--EXEC msdb.dbo.sp_send_dbmail @recipients = @EmpEmailID, @subject = @Subject,
--			@body = @Body, @body_format = 'HTML', @reply_to = @SupEmailId
END









GO


