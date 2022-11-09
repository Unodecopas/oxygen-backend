import { OkPacket } from 'mysql'
import { dbQuery } from '../database/dbconfig'
import { Contact, NewContact } from '../types/types'

export const getContacts = async (): Promise<Contact[]> => {
  const contacts: Contact[] = await dbQuery('select * from contacts')
  return contacts
}

export const getContact = async (id: number): Promise<any> => {
  const contact = await dbQuery('select * from contacts where id = ?', [id])
  return contact
}

export const addContact = async (contact: NewContact): Promise<any> => {
  const { date, customer, email, phone, comment, subject, status } = contact
  const response: OkPacket | any = await dbQuery(`
    insert into contacts
    (date, customer, email, phone, comment, subject, status)
    values
    (?)
  `, [[date, customer, email, phone, comment, subject, status]])
  return response
}

export const updateContact = async (contact: NewContact, id: number): Promise<any> => {
  const { date, customer, email, phone, comment, subject, status } = contact
  const response: OkPacket | any = await dbQuery(`
    update contacts set ? where id = ?
  `, [{ date, customer, email, phone, comment, subject, status }, id])
  return response
}
