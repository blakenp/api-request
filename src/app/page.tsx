'use client';

import React from 'react';
import { useState } from 'react';

export default function Home() {
  const [comments, setComments] = useState<any[]>([])

  const getComments = async () => {
    await fetch('https://webhooks-black.vercel.app/api/webhook')
    .then(async (response) => {
      let data = await response.json()
      console.log(data[0].text)
      setComments(data)
    })
  }

  return (
    <>
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
