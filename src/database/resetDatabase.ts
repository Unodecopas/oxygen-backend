import connection from './dbconfig'

const removeTables = (): void => {
  console.log('Deleting old tables...')
  connection.query('drop table if exists contacts')
  connection.query('drop table if exists users')
  connection.query('drop table if exists bookings')
  connection.query('drop table if exists rooms_photos')
  connection.query('drop table if exists rooms_amenities')
  connection.query('drop table if exists amenities')
  connection.query('drop table if exists rooms')
  console.log('Tables deleted ✔')
}

const createTables = (): void => {
  console.log('Creating new tables ...')
  connection.query(`
    create table contacts(
      id int unsigned auto_increment primary key,
      date date not null,
      customer varchar(255) not null,
      email varchar(255) not null,
      phone varchar(20) not null,
      comment varchar(255) not null,
      subject varchar(255) not null,
      status ENUM('published', 'unread') default 'unread'
    )
  `)
  connection.query(`
    create table rooms (
      id int unsigned auto_increment primary key,
      roomType varchar(255) not null,
      roomNumber int not null,
      description varchar(255) not null,
      offer boolean default false,
      price int not null,
      discount int not null,
      cancellation varchar(255) not null
    )
  `)
  connection.query(`
    create table users (
      id int unsigned auto_increment primary key,
      username varchar(255) not null unique,
      photo varchar(255) not null,
      email varchar(255) not null unique,
      startDate date not null,
      job varchar(255) not null,
      contact varchar(20) not null,
      status ENUM('active', 'inactive') default 'inactive'
    )
  `)
  connection.query(`
    create table bookings(
      id int unsigned auto_increment primary key,
      guestName varchar(255) not null,
      orderDate date not null,
      checkin date not null,
      checkout date not null,
      request varchar(255) not null,
      roomID int unsigned not null,
      status ENUM('checkin','checkout','inprogress') default 'inprogress',
      foreign key (roomID) references rooms(id)
    )
  `)
  connection.query(`
    create table rooms_photos (
      id int unsigned auto_increment primary key,
      photo varchar(255) not null,
      roomID int unsigned not null,
      foreign key (roomID) references rooms(id)
    )
  `)
  connection.query(`
    create table amenities(
      id int unsigned auto_increment primary key,
      name varchar(255) not null
    )
  `)
  connection.query(`
    create table rooms_amenities(
      id int unsigned auto_increment primary key,
      amenitieID int unsigned not null,
      roomID int unsigned not null,
      foreign key (amenitieID) references amenities(id),
      foreign key (roomID) references rooms(id)
    )
  `)
  console.log('Tables created ✔')
}
removeTables()
createTables()
connection.end()
