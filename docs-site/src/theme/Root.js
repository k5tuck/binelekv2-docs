import React from 'react';
import { Analytics } from '@vercel/analytics/react';

// Wrap the root component with Vercel Analytics
export default function Root({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
