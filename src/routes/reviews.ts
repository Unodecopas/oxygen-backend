import express from 'express'
import reviesData from '../data/reviews.json'
import { Review } from '../types/types'

const router = express.Router()

const reviewsList: Review[] = reviesData as Review[]

router.get('/', (_, res) => res.send(reviewsList))

router.post('/', (req, res) => {
  const id = Math.max(...reviewsList.map(review => review.id)) + 1
  const newBooking = { id, ...req.body }
  reviewsList.push(newBooking)
  res.send(newBooking)
})
router.get('/:id', (req, res, next) => {
  const review = reviewsList.find(review => review.id === Number(req.params.id))
  if (review === undefined) next()
  res.send(review)
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
router.delete('/:id', (req, res) => {
  const index = reviewsList.findIndex(review => review.id === Number(req.params.id))
  reviewsList.splice(index, 1)
  res.send({ message: `Room ${req.params.id} delete succesfully` })
})

export default router
