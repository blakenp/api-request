import axios from 'axios';

const sendData = async () => {
  try {
    const url = 'https://webhooks-black.vercel.app/api/route/webhooks.ts'; // Replace with your URL

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

sendData();
