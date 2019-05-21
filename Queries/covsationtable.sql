


create table incidentConversation 
(
ID  int  identity(1,1) primary key,
IncidentCode varchar(30),
RaisedBy varchar(30),
ResolvedBy varchar(30),
ResolveDescription nvarchar(MAX),
ResponseBy varchar(30),
ResponseDescription nvarchar(MAX),
Status varchar(30),
createdDate datetime
)