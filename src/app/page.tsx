'use client';

import React from 'react';
import { useState } from 'react';

export default function Home() {
  const [comments, setComments] = useState<any[]>([])
  const [comment, setComment] = useState("")

  const getComments = async () => {
    await fetch('https://webhooks-black.vercel.app/api/webhook')
    .then(async (response) => {
      let data = await response.json()
      console.log(data[0].text)
      setComments(data)
    })
  }

  const submitComment = async () => {
    await fetch('https://webhooks-black.vercel.app/api/webhook', {
      method: 'POST',
      body: JSON.stringify({ comment: comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setComment('')
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
            </div>
          )
        })
      }
    </>
  )
}
