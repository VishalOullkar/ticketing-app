USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[getAuthenticatedUser]    Script Date: 5/21/2019 4:39:20 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure   [dbo].[getAuthenticatedUser]-- 'vishal@gmail.com35','123'
(@username varchar(30)=NULL,
@password varchar(20)=null
)
As
Begin 

Select * from users where EmailId=@username and password=@password 
End
GO


