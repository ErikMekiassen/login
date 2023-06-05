'use client';
import React, { useState } from 'react';
import axios from 'axios';
const SubmitMail = () => {
  const variables = {
    "SERVER_PORT": 8080,
    "URL_TO_BACKEND": "http://localhost:8080"
  }
  const [email, setEmail] = useState('');
  console.log(variables.URL_TO_BACKEND);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`${variables.URL_TO_BACKEND}/v1/deliverMail/${email}`)
      .then(response => {
        console.log('Email sent successfully:', response);
        // Additional actions after successful email submission
      })
      .catch(error => {
        console.error('Error sending email:', error);
        // Additional error handling if necessary
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        className='text-black'
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitMail;

