create database menu;
use menu;
create table items(
    id int not null primary key auto_increment,
    name varchar(255) not null,
    description varchar(255) not null,
    price double not null
);

INSERT INTO items (name, description, price)
VALUES ('Pizza', 'Pepperoni Pizza', 10.99),
       ('Burger', 'Cheese Burger', 5.99),
       ('Fries', 'French Fries', 2.99),
       ('Soda', 'Coke', 1.99);

Select * from items;