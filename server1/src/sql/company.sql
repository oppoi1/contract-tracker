CREATE TABLE Companies(
  id int not null AUTO_INCREMENT PRIMARY KEY,
  name varchar(50),
  adress varchar(50),
  branch varchar(50),
  phone varchar(20),
  fax varchar (50),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
)