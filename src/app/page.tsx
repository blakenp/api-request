'use client';

import React from 'react';
import axios from 'axios';

export default function Home() {
  const handleWebhookRequest = async () => {
    try {
      const url = 'https://webhooks-black.vercel.app/api/webhook/webhooks'; // Replace with your URL
  
      const data = {
        // The data you want to send in the POST request
        key1: 'value1',
        key2: 'value2',
      };
  
      const response = await axios.post(url, data);
  
      console.log(response.data); // Process the response data as needed
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div>
      <button onClick={handleWebhookRequest}>Send Webhook Request</button>
    </div>
  );
};
