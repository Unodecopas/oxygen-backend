import express from 'express'
import { getReviews, getReview, updateReview, createReview } from '../controllers/reviewsControllers'
const router = express.Router()

router.get('/', getReviews)
router.get('/:id', getReview)
router.post('/', createReview)
router.patch('/:id', updateReview)

export default router
