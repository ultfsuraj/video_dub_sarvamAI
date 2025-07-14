'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Global App Error:', error);
  }, [error]);

  return (
    <html>
      <body className="flex-center caption">
        <div className="p-12 bg-white border-2 border-svm-8 flex-center flex-col gap-6 heading-md rounded-md drop-shadow-lg">
          <p>Something went wrong !</p>
          <button
            className="bg-svm-9 text-white px-4 py-1 rounded-md "
            onClick={() => {
              reset();
            }}
          >
            Try again
          </button>
          <p className="body-xs">or Refresh the Page.</p>
        </div>
      </body>
    </html>
  );
}
