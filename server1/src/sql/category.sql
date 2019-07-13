CREATE TABLE Categories(
  id int not null AUTO_INCREMENT PRIMARY KEY,
  name varchar(50),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime ON UPDATE CURRENT_TIMESTAMP
)