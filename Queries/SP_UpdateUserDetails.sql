USE [MITRPLUSARC_TEST]
GO

/****** Object:  StoredProcedure [dbo].[SP_UpdateUserDetails]    Script Date: 6/19/2019 6:22:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[SP_UpdateUserDetails]
@Userid int,
@ModifiedBy  varchar(max)
as
begin
update users set IsActive=0, ModifiedBy=@ModifiedBy where Userid=@Userid 
end
GO


