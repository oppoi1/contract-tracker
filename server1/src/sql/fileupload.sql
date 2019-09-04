CREATE TABLE Fileupload(
  id int not null AUTO_INCREMENT PRIMARY KEY,
  contractId int,
  fieldname varchar(50),
  originalname varchar(255),
  encoding varchar(50),
  mimetype varchar(50),
  destination varchar(50),
  filename varchar(50),
  path varchar(50),
  size varchar(50),
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime ON UPDATE CURRENT_TIMESTAMP,
  userId int,
  FOREIGN KEY (contractId) REFERENCES Contracts(id),
  FOREIGN KEY (userId) REFERENCES Users(id)
)

ALTER TABLE Fileupload ADD userId int AFTER contractId, ADD FOREIGN KEY (userId) REFERENCES Users(id)
ALTER TABLE Fileupload ADD contractId int, ADD FOREIGN KEY (contractId) REFERENCES contracts(id)