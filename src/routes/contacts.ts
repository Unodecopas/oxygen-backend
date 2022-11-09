/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getContact, getContacts, addContact, updateContact } from '../controllers/contactControllers'
import { dbQuery } from '../database/dbconfig'
import generateError from '../utils/generateError'
import { contactSchema } from '../schemas/schemas'

const router = express.Router()

router.get('/', async (_, res, next): Promise<void> => {
  try {
    const contacts = await getContacts()
    res.send(contacts)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next): Promise<void> => {
  try {
    await contactSchema.validateAsync(req.body)
    const response = await addContact(req.body)

    if (response !== null) {
      const [newContact] = await getContact(response.insertId)
      res.send(newContact)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next): Promise<void> => {
  try {
    const [contact] = await getContact(Number(req.params.id))
    if (contact === undefined) next()
    res.send(contact)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    await contactSchema.validateAsync(req.body)
    const contact = await getContact(Number(req.params.id))
    if (contact.length === 0) next()
    const response = await updateContact(req.body, Number(req.params.id))
    if (response !== null) {
      const [updatedContact] = await getContact(Number(req.params.id))
      res.send(updatedContact)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next): Promise<void> => {
  try {
    const contact = await getContact(Number(req.params.id))
    if (contact.length === 0) throw generateError(404, 'Not found')
    await dbQuery('delete from contacts where id = ? ', [Number(req.params.id)])
    res.send({ message: `Delete contact ${req.params.id}` })
  } catch (error) {
    next(error)
  }
})

export default router
