import express from 'express'
import * as db from '../db/db'
const router = express.Router()

// read
// GET /v1/posts
router.get('/', async (req, res) => {
  const result = await db.getAllPosts()
  // console.log(result)
  res.json(result)
})

// post/create
// POST /v1/posts
router.post('/', async (req, res) => {
  const newPost = req.body
  const addedPost = await db.addPost(newPost)
  // console.log(newPost)
  res.json(addedPost)
})

// update/patch
// PATCH /v1/posts/:id
router.patch('/:id', async (req, res) => {
  const postId = Number(req.params.id)
  const postPatch = req.body
  const update = await db.updatePost(postId, postPatch)
  console.log(update)
  res.json(update)
})
export default router

// delete
// DELETE /v1/posts/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  const result = await db.deletePost(id)
  console.log(result)
  res.json(result)
})

// read/get
// GET /v1/posts/:postId/comments

router.get('/:postId/comments', async (req, res) => {
  const id = Number(req.params.postId)
  const result = await db.getComments(id)

  console.log(result)
  res.json(result)
})

// post/create
// POST /v1/posts/:postId/comments

router.post('/:postId/comments', async (req, res) => {
  const newComment = req.body

  const addedComment = await db.addNewComment(newComment)
  console.log(addedComment)
  res.json(addedComment)
})
