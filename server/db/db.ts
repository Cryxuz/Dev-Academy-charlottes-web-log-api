import connection from './connection.ts'
import { Post, PostData } from '../../models/post.ts'
const db = connection
// read post
export function getAllPosts() {
  return db('Posts').select(
    'id',
    'title',
    'date_created as dateCreated',
    'text'
  )
}
// add post
export async function addPost(newPost: any) {
  const date_created = Date.now()
  return await db('Posts')
    // ...newPost is from the req.body @ posts.ts
    .insert({ ...newPost, date_created })
    .returning(['date_created as dateCreated', 'text', 'id', 'title'])
  // returning is like select()
}
// update post
export async function updatePost(id: number, postPatch: object) {
  // const date_updated = Date.now()

  console.log()
  return await db('Posts')
    .where('id', id)
    .update(postPatch)
    .returning(['date_created as dateCreated', 'text', 'id', 'title'])
}
// delete post
export async function deletePost(id: number) {
  return await db('Posts').where('id', id).delete()
}
// read specific comments
export async function getComments(postId: number) {
  return db('Comments')
    .select('id', 'post_id as postId', 'date_posted as datePosted', 'comment')
    .where('post_id', postId)
}

// add new comments
// Ask Facilitator, New comment doesnt have post_id and date_posted

export async function addNewComment(newComment: any) {
  return await db('Comments')
    .insert({ ...newComment })
    .returning([
      'id',
      'post_id as postId',
      'date_posted as datePosted',
      'comment',
    ])
}

// update/edit comments
export async function updateComments(commentId: number, commentPatch: object) {
  return await db('Comments')
    .update(commentPatch)
    .where('id', commentId)
    .returning([
      'id',
      'post_id as postId',
      'date_posted as datePosted',
      'comment',
    ])
}

// delete comments
export async function deleteComments(commentId: number) {
  return await db('Comments').where('id', commentId).delete()
}
