import reviewsData from '../data/reviews.json'
import { NewReview, Review } from '../types'

const reviews: Review[] = reviewsData as Review[]

export const getReviews = (): Review[] => reviews

export const getReview = (id: number): Review | undefined => {
  const reviewEntry = reviews.find(review => review.id === id)
  return reviewEntry
}

export const createReview = (object: NewReview): Review => {
  const id = Math.max(...reviewsData.map(review => review.id)) + 1
  return ({ id, ...object })
}

export const updateReview = (object: Review): Review => object
