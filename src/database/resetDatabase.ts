import connection from './dbconfig'
import { faker } from '@faker-js/faker'

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
      contact varchar(255) not null,
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

const createFakeUsers = (): void => {
  for (let i = 0; i < 10; i++) {
    const username = faker.internet.userName()
    const photo = faker.internet.avatar()
    const email = faker.internet.email()
    const startDate = faker.date.recent()
    const job = faker.lorem.lines(1)
    const contact = faker.phone.number('##########')
    const status = faker.helpers.arrayElement(['active', 'inactive'])
    connection.query(`
      insert into users 
      (username, photo, email, startDate, job, contact, status)
      values
      (?)
    `, [[username, photo, email, startDate, job, contact, status]])
  }
}

const createFakeRooms = (): void => {
  for (let i = 0; i < 10; i++) {
    const roomType = faker.helpers.arrayElement(['Single Bed A -', 'Suite S -', 'Double Superior DS -', 'Double Bed D -'])
    const roomNumber = faker.random.numeric(2)
    const description = faker.lorem.lines(1)
    const offer = faker.datatype.boolean()
    const price = faker.random.numeric(5)
    const discount = faker.random.numeric(2)
    const cancellation = faker.lorem.lines(1)

    connection.query(`
      insert into rooms 
      (roomType, roomNumber, description, offer, price, discount, cancellation)
      values
      (?)
    `, [[roomType, roomNumber, description, offer, price, discount, cancellation]])
  }
}
const createFakeContacts = (): void => {
  for (let i = 0; i < 10; i++) {
    const date = faker.date.recent()
    const customer = faker.name.fullName()
    const email = faker.internet.email()
    const phone = faker.phone.number('##########')
    const comment = faker.lorem.lines(1)
    const subject = faker.lorem.lines(1)
    const status = faker.helpers.arrayElement(['published', 'unread'])
    connection.query(`
      insert into contacts 
      (date, customer, email, phone, comment, subject, status)
      values
      (?)
    `, [[date, customer, email, phone, comment, subject, status]])
  }
}

const createFakeBookings = (): void => {
  for (let i = 0; i < 10; i++) {
    const guestName = faker.name.fullName()
    const orderDate = faker.date.recent()
    const checkin = faker.date.between(orderDate, new Date())
    const checkout = faker.date.soon(10, checkin)
    const request = faker.lorem.lines(1)
    const roomID = Math.floor(Math.random() * 10 + 1)
    const status = faker.helpers.arrayElement(['checkin', 'checkout', 'inprogress'])
    connection.query(`
      insert into bookings 
      (guestName, orderDate, checkin, checkout, request, status, roomID)
      values
      (?)
    `, [[guestName, orderDate, checkin, checkout, request, status, roomID]])
  }
}
const createFakeAmenities = (): void => {
  const amenities = ['Vistas al mar', 'Bañera', 'TV', 'AC']
  amenities.forEach(item => {
    connection.query(`
      insert into amenities (name) values (?)
    `, [item])
  })
}
const createFakeRoomsAmenities = (): void => {
  for (let i = 0; i < 100; i++) {
    const roomID = Math.floor(Math.random() * 10 + 1)
    const amenitieID = Math.floor(Math.random() * 4 + 1)
    connection.query(`
      insert into rooms_amenities
      (roomID, amenitieID)
      values
      (?)
    `, [[roomID, amenitieID]])
  }
}
const createRoomPhotos = (): void => {
  for (let i = 0; i < 50; i++) {
    const photo = faker.image.imageUrl()
    const roomID = Math.floor(Math.random() * 10 + 1)
    connection.query(`
      insert into rooms_photos
      (roomID, photo)
      values
      (?)
    `, [[roomID, photo]])
  }
}
removeTables()
createTables()
createFakeUsers()
createFakeRooms()
createFakeContacts()
createFakeBookings()
createFakeAmenities()
createFakeRoomsAmenities()
createRoomPhotos()
connection.end()
