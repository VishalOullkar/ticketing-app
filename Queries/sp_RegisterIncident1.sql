USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[sp_RegisterIncident1]    Script Date: 6/19/2019 6:12:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_RegisterIncident1]
@Priority NVARCHAR(16)
,@ProblemDescription NVARCHAR(MAX)
,@RaisedBy NVARCHAR(32)
,@Status NVARCHAR(32)
,@Database NVARCHAR(MAX)
,@ModuleName NVARCHAR(50)
,@Link NVARCHAR(MAX)=NULL
,@incidentID uniqueidentifier
,@FileName NVARCHAR(550)=NULL
,@FilePath NVARCHAR(MAX)=NULL
,@Category NVARCHAR(32)
,@UserEmailId nvarchar(50)
,@MobileNo nvarchar(13)=NULL
AS
BEGIN
DECLARE @RaisedByName NVARCHAR(MAX),@RaisedByEmailId NVARCHAR(MAX),@VarSql NVARCHAR(MAX),@SupEmailID NVARCHAR(MAX),
@SupName NVARCHAR(MAX),@Subject NVARCHAR(MAX),@Body NVARCHAR(MAX),@LocationName nvarchar(20),
@CountryID int,@LocationID int,@IncidentCode NVARCHAR(8)

DECLARE @Mails TABLE(EmailID NVARCHAR(MAX))
SELECT @RaisedByEmailId = EmailID, @RaisedByName = EmpName,@LocationID=LocationID,@CountryID=CountryID From Employee WHERE UserID = '' + @RaisedBy + ''
select @LocationName=LocationName from Location where CountryID=@CountryID and LocationID=@LocationID
select @RaisedBy= UserID from Employee where EmailID=@UserEmailId
DECLARE @MaxID INT
SELECT @MaxID = COUNT(1) + 1 FROM Incident
SELECT @IncidentCode  = 'INC' + REPLICATE(0,5-LEN(@MaxID)) + CAST(@MaxID AS NVARCHAR)
INSERT INTO Incident(IncidentCode,Priority,ProblemDescription,RaisedDateTime,RaisedBy,RaisedByName,ModuleName,Link,Status,FileName,FilePath,IncidentId,Category,EmailId,MobileNo)
VALUES (@IncidentCode, @Priority , @ProblemDescription ,GETDATE(), @RaisedBy , @RaisedByName ,@ModuleName,@Link, @Status,@FileName,@FilePath,@incidentID,@Category,@UserEmailId,@MobileNo)

Declare @EmailID nvarchar(200)
SELECT @EmailID=EmailID FROM Supporter WHERE Active = 1

SELECT @Subject = 'Incident ' + @IncidentCode + ' Raised By ' + @RaisedByName
SELECT @Body = '<p>Dear Supporter,<br/><br/><b>' + @RaisedByName + '</b> from '+ @LocationName + '</b> raised an incident.<br/><br/>
<b>Incident Code : </b>'+ @IncidentCode + '<br/><b>Description : </b>' + @ProblemDescription + '<br/>
<b>Module Name : </b>'+ @ModuleName + '<br/><b>Link : </b>'+ @Link 

+ '<br/><b>Priority : </b>' + @Priority + '<br/><br/>Regards<br/>' + @RaisedByName + '</p>'

print @Body

WHILE EXISTS(SELECT 1 FROM @Mails)
BEGIN
	SELECT TOP 1 @SupEmailID= EmailID FROM @Mails
	EXEC msdb.dbo.sp_send_dbmail @recipients = @SupEmailID, @subject = @Subject,
			@body = @Body, @body_format = 'HTML', @reply_to = @RaisedByEmailId
	DELETE FROM @Mails Where EmailID = @SupEmailID
END
END





GO


