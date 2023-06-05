'use client';
import { useRouter } from 'next/navigation';
import SubmitMail from './components/SubmitMail.js';
require('dotenv').config();

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h1>Submit Mail</h1>
      <SubmitMail router={router} />
    </div>
  );
}
