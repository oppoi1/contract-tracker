CREATE TABLE Partners(
  id int not null AUTO_INCREMENT PRIMARY KEY,
  name varchar(50),
  branch varchar(30),
  phone varchar(50),
  companyId int,
  isActive bool,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (companyId) REFERENCES Companies(id)
)

ALTER TABLE Partners ADD COLUMN isActive bool