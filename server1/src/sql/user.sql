CREATE TABLE Users(
	id int AUTO_INCREMENT not null PRIMARY KEY,
	name varchar(50),
    email varchar(50),
    password varchar(50),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
)

