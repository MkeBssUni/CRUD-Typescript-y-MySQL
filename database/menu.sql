create database menu;

create table items(
    id serial primary key,
    name varchar(255),
    description varchar(255),
    price decimal not null
);

alter table items add column image varchar(255);

INSERT INTO items (name, description, price, image)
VALUES ('Pizza', 'Pepperoni Pizza', 10.99, 'asdasds'),
       ('Burger', 'Cheese Burger', 5.99, 'asdasdsd'),
       ('Fries', 'French Fries', 2.99, 'asdasdasd'),
       ('Soda', 'Coke', 1.99,'asdasdsad');

select * from items;