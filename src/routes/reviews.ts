import express from 'express'
import * as reviewsControllers from '../controllers/reviewsControllers'

const router = express.Router()

router.get('/', (_, res) => {
  const reviews = reviewsControllers.getReviews()
  res.send(reviews)
})
router.post('/', (req, res) => {
  const newEntry = reviewsControllers.createReview(req.body)
  res.send(newEntry)
})
router.get('/:id', (req, res, next) => {
  const review = reviewsControllers.getReview(Number(req.params.id))
  if (review === undefined) next()
  res.send(review)
})
router.patch('/:id', (req, res) => {
  const updateReview = reviewsControllers.updateReview(req.body)
  res.send(updateReview)
})

export default router
