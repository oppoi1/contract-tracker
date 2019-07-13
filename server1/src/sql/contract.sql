CREATE TABLE Contracts(
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  number varchar(75),
  start DATE,
  end DATE,
  duration int(5),
  objectives varchar(255),
  futureobjectives varchar(255),
  other varchar(255),
  createdBy int,
  pricePerMonth int(10),
  responsible int,
  cancel int(2),
  categoryId int,
  partnerId int,
  companyId int,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
  isActive boolean,
  FOREIGN KEY (createdBy) REFERENCES Users(id),
  FOREIGN KEY (responsible) REFERENCES Users(id),
  FOREIGN KEY (categoryId) REFERENCES Categories(id),
  FOREIGN KEY (partnerId) REFERENCES Partners(id),
  FOREIGN KEY (companyId) REFERENCES Companies(id)
)

ALTER TABLE Contracts ADD COLUMN isActive bool