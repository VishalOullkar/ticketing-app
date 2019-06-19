USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[sp_GetRaiseTicketDetailsByStatus]    Script Date: 6/19/2019 6:11:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_GetRaiseTicketDetailsByStatus]
@Status NVARCHAR(64)
AS
BEGIN
IF(@Status='Response')
	BEGIN
	select *from incident where Status='Response' order by incidentcode desc
	END
ELSE IF(@Status='Resolved')
	BEGIN
	select *from incident where Status='Resolved' order by incidentcode desc
	END
ELSE IF(@Status='Confirm')
BEGIN
	select *from incident where Status='Confirm' order by incidentcode desc
END
ELSE IF(@Status='Outstanding')
BEGIN
	select *from incident where Status='Outstanding' order by incidentcode desc
END
ELSE
BEGIN
select *from incident order by incidentcode desc
END
END
GO


