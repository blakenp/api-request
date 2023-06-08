'use client';

import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [comments, setComments] = useState<any[]>([])
  const [commentSubmission, setCommentSubmission] = useState('')
  const [editedComments, setEditedComments] = useState<{ [commentId: number]: string }>({})

  const getComments = async () => {
    try {
      const response = await axios.get('https://webhooks-black.vercel.app/api/webhook')
      const data = response.data
      console.log(data)
      setComments(data)
    } catch (error) {
      console.error(error)
    }
  }

  const submitComment = async () => {
    try {
      const response = await axios.post('https://webhooks-black.vercel.app/api/webhook', {
        comment: commentSubmission
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = response.data
      console.log(data)
      getComments()
      setCommentSubmission('')
    } catch (error) {
      console.error(error)
    }
  }

  const editComment = async (commentId: number) => {
    try {
      const editedText = editedComments[commentId]
      const response = await axios.put(`https://webhooks-black.vercel.app/api/webhook/${commentId}`, {
        comment: editedText
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = response.data
      console.log(data)
      getComments()
      const updatedEditedComments = {
        ...editedComments,
        [commentId]: ''
      }
      setEditedComments(updatedEditedComments)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteComment = async (commentId: number) => {
    try {
      const response = await axios.delete(`https://webhooks-black.vercel.app/api/webhook/${commentId}`)
      const data = response.data
      console.log(data)
      getComments()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <input 
        type='text'
        value={commentSubmission}
        onChange={(event) => setCommentSubmission(event.target.value)}
      />
      <button onClick={submitComment}>Submit comment</button>
      <button onClick={getComments}>Load Comments</button>
      {
        comments.map(comments => {
          return (
            <div key={comments.id}>
              {comments.id} {comments.text}
              <input
                type='text'
                value={editedComments[comments.id] || ''}
                onChange={(event) => {
                  const updatedEditedComments = {
                    ...editedComments,
                    [comments.id]: event.target.value
                  };
                  setEditedComments(updatedEditedComments)
                }}
              />
              <button onClick={() => editComment(comments.id)}>Edit</button>
              <button onClick={() => deleteComment(comments.id)}>Delete</button>
            </div>
          )
        })
      }
    </>
  )
}
