'use client';

import React from 'react';
import { useState } from 'react';

export default function Home() {
  const [comments, setComments] = useState<any[]>([])
  const [comment, setComment] = useState("")

  const getComments = async () => {
    await fetch(`https://webhooks-black.vercel.app/api/webhook`)
    .then(async (response) => {
      let data = await response.json()
      console.log(data[0].text)
      setComments(data)
    })
  }

  const submitComment = async () => {
    const response = await fetch(`https://webhooks-black.vercel.app/api/webhook`, {
      method: 'POST',
      body: JSON.stringify({ comment: comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = response.json
    console.log(data)
    setComment('')
  }

  const deleteComment = async (commentId: number) => {
    const response = await fetch(`https://webhooks-black.vercel.app/api/webhook/${commentId}`, {
      method: 'DELETE',
    })
    const data = await response.json
    console.log(data)
    getComments()
  }

  return (
    <>
      <input 
        type='text'
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button onClick={submitComment}>Submit comment</button>
      <button onClick={getComments}>Load Comments</button>
      {
        comments.map(comment => {
          return (
            <div key={comment.id}>
              {comment.id} {comment.text}
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            </div>
          )
        })
      }
    </>
  )
}
