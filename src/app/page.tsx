'use client';

import React from 'react';
import { redirect } from "next/navigation";
import axios from 'axios';

export default function Redirect() {
  const getRedirect = async() => {
    redirect(`https://webhooks-black.vercel.app/api/webhook`);
  }

  return (
    <div>
      <button onClick={getRedirect}>Send Webhook Request</button>
    </div>
  );
};
