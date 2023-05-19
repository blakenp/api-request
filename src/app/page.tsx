'use client';

import React from 'react';
import axios from 'axios';

export default function Home() {
  const handleWebhookRequest = () => {
    axios
      .post<{ message: string }>('https://webhooks-black.vercel.app/api/webhook', {
        event: 'user.created',
        data: {
          userId: '123',
        },
      })
      .then(response => {
        console.log('Webhook request successful');
        console.log(response.data);
      })
      .catch(error => {
        console.error('Webhook request failed wahhhh');
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={handleWebhookRequest}>Send Webhook Request</button>
    </div>
  );
};
