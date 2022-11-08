import request, { Response } from 'supertest'
import app from './app'
import 'dotenv/config'
describe('Bookings Endpoints', () => {
  it('GET BOOKINGS: should return all bookings', async () => {
    const res: Response = await request(app)
      .get('/bookings')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET BOOKING (with valid ID): should return a booking', async () => {
    const res: Response = await request(app)
      .get('/bookings/1')
      .expect(200)
      .expect('Content-Type', /json/)
    expect(res.body).toHaveProperty('id', 1)
  })
  it('GET BOOKING (with invalid ID): should return not found', async () => {
    const res: Response = await request(app)
      .get('/bookings/187')
      .expect(404)
      .expect('Content-Type', /json/)
    expect(res.body).toHaveProperty('message', 'Not Found')
  })
  it('CREATE BOOKING : should return the booking with id 51', async () => {
    const newBooking = {
      guestName: 'string',
      orderDate: 'string',
      checkin: 'string',
      checkout: 'string',
      request: 'string',
      roomType: 'string',
      status: 'BookingStatus'
    }
    const res: Response = await request(app)
      .post('/bookings')
      .send(newBooking)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 51)
  })
  it('PATCH BOOKING: should return a booking with fake data', async () => {
    const newBooking = {
      guestName: 'fake',
      orderDate: 'string',
      checkin: 'string',
      checkout: 'string',
      request: 'string',
      roomType: 'string',
      status: 'BookingStatus'
    }
    const res: Response = await request(app)
      .patch('/bookings/1')
      .send(newBooking)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('guestName', 'fake')
  })
})
describe('Contacts Endpoints', () => {
  it('GET CONTACTS: should return all contacts', async () => {
    const res: Response = await request(app)
      .get('/contacts')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET CONTACT (with valid ID): should return a contact', async () => {
    const res: Response = await request(app)
      .get('/contacts/1')
      .expect(200)
      .expect('Content-Type', /json/)
    expect(res.body).toHaveProperty('id', 1)
  })
  it('GET CONTACT (with invalid ID): should return not found', async () => {
    const res: Response = await request(app)
      .get('/contacts/18777')
      .expect(404)
      .expect('Content-Type', /json/)
    expect(res.body).toHaveProperty('message', 'Not Found')
  })
  it('CREATE CONTACT : should return the contact with id ', async () => {
    const newcontact = {
      date: '2022-04-03',
      customer: 'Klara Gostage',
      email: 'kgostage1@china.com.cn',
      phone: '2287171022',
      comment: 'In eleifend quam a odio. In hac habitasse platea dictumst.',
      subject: 'Nunc rhoncus dui vel sem.',
      status: 'unread'
    }
    const res: Response = await request(app)
      .post('/contacts')
      .send(newcontact)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('customer', newcontact.customer)
  })
  it('PATCH contact: should return a contact with fake data', async () => {
    const newcontact = {
      date: '2022-04-03',
      customer: 'Fake Customer',
      email: 'kgostage1@china.com.cn',
      phone: '2287171022',
      comment: 'In eleifend quam a odio. In hac habitasse platea dictumst.',
      subject: 'Nunc rhoncus dui vel sem.',
      status: 'unread'
    }
    const res: Response = await request(app)
      .patch('/contacts/1')
      .send(newcontact)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('customer', 'Fake Customer')
  })
})
describe('Rooms Endpoints', () => {
  it('GET ROOMS: should return all rooms', async () => {
    const res: Response = await request(app)
      .get('/rooms')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET ROOM (with valid ID): should return a room', async () => {
    const res: Response = await request(app)
      .get('/rooms/1')
      .expect(200)
      .expect('Content-Type', /json/)
    expect(res.body).toHaveProperty('id', 1)
  })
  it('GET ROOM (with invalid ID): should return not found', async () => {
    const res: Response = await request(app)
      .get('/rooms/187')
      .expect(404)
      .expect('Content-Type', /json/)
    expect(res.body).toHaveProperty('message', 'Not Found')
  })
  it('CREATE ROOM : should return the room with id 101', async () => {
    const newRoom = {
      photos: ['asd', 'eee'],
      roomType: 'newRoom',
      roomNumber: '02',
      description: 'string',
      offer: true,
      price: 100,
      discount: 23,
      cancellation: 'string',
      amenities: ['asd', 'asd']
    }
    const res: Response = await request(app)
      .post('/rooms')
      .send(newRoom)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 101)
  })
  it('PATCH ROOM: should return a room with fake roomType', async () => {
    const newRoom = {
      photos: ['asd', 'eee'],
      roomType: 'fake',
      roomNumber: '02',
      description: 'string',
      offer: true,
      price: 100,
      discount: 23,
      cancellation: 'string',
      amenities: ['asd', 'asd']
    }
    const res: Response = await request(app)
      .patch('/rooms/1')
      .send(newRoom)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('roomType', 'fake')
  })
})
describe('Users Endpoints', () => {
  it('POST LOGIN (wrong username or password): should return a error', async () => {
    const newUser = { username: 'fake', password: 'fake' }
    const res: Response = await request(app)
      .post('/users/login')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('message', 'Wrong username or password')
  })
  it('POST LOGIN (correct username and password): should return a token', async () => {
    process.env.JWTSECRETWORD = 'secret'
    const newUser = { username: 'Jesus', password: 'admin' }
    const res: Response = await request(app)
      .post('/users/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('token')
  })
})

describe('Private Endpoint', () => {
  it('PRIVATE Endpoint (without token): sould be return an error', async () => {
    await request(app)
      .get('/private')
      .expect(401)
  })
  it('PRIVATE Endpoint (with token): sould be return ok', async () => {
    const res: Response = await request(app)
      .get('/private')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.SmVzdXM.zLGQQfgMC6z2-KvfZbe0CJksKS3tBrtwYSi5V5Q39a8')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('message', 'ok')
  })
})
