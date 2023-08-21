import express from 'express'
import * as db from '../db/db'
const router = express.Router()

// eslint-disable-next-line no-unused-vars

// update/patch
//PATCH /v1/comments/:commentId

router.patch('/:commentId', async (req, res) => {
  const commentId = Number(req.params.commentId)
  const commentPatch = req.body
  const update = await db.updateComments(commentId, commentPatch)
  console.log(update)
  res.json(update)
})
// DELETE /v1/comments/:commentId
router.delete('/:commentId', async (req, res) => {
  const commentId = Number(req.params.commentId)
  const delComment = await db.deleteComments(commentId)
  res.json(delComment)
})
export default router
