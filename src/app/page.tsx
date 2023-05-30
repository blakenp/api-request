'use client';

import React from 'react';
import { useState } from 'react';

export default function Home() {
  const [comments, setComments] = useState<any[]>([])
  const [commentSubmission, setCommentSubmission] = useState('')
  const [editedComments, setEditedComments] = useState<{ [commentId: number]: string }>({});

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
      body: JSON.stringify({ comment: commentSubmission }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json
    console.log(data)
    getComments()
    setCommentSubmission('')
  }

  const editComment = async (commentId: number) => {
    const editedText = editedComments[commentId];

    const response = await fetch(`https://webhooks-black.vercel.app/api/webhook/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ comment: editedText }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json
    console.log(data)
    getComments()

    const updatedEditedComments = {
      ...editedComments,
      [commentId]: ''
    };
    setEditedComments(updatedEditedComments);
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
                  setEditedComments(updatedEditedComments);
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
