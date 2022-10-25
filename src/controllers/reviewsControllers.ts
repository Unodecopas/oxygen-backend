import reviewsData from '../data/reviews.json'

const getReviews = (_, res) => {
  res.send(reviewsData)
}
const getReview = (req, res) => {
  const [review] = reviewsData.filter(review => review.id === Number(req.params.id))
  if (!review) return res.status(404).json({ message: 'Not Found' })
  res.send(review)
}

const createReview = (req, res) => {
  const id = Math.max(...reviewsData.map(review => review.id)) + 1
  res.send({ id, ...req.body })
}
const updateReview = (req, res) => {
  res.send({ id: req.params.id, ...req.body })
}

export { getReviews, getReview, updateReview, createReview }
