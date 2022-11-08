/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import reviesData from '../data/reviews.json'
import { Contact } from '../types/types'
import { getContact, getContacts, addContact } from '../controllers/contactControllers'
import { dbQuery } from '../database/dbconfig'
import generateError from '../utils/generateError'

const router = express.Router()

const reviewsList: Contact[] = reviesData as Contact[]

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

router.patch('/:id', (req, res, next) => {
  const index = reviewsList.findIndex(review => review.id === Number(req.params.id))
  if (index === -1) {
    next()
  } else {
    reviewsList[index] = { id: reviewsList[index].id, ...req.body }
    res.send(reviewsList[index])
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
