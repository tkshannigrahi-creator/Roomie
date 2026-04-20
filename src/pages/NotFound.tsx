import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <h1 className="text-9xl font-bold text-zinc-200 dark:text-zinc-800">404</h1>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mt-4 tracking-tight">Page not found</h2>
      <p className="text-zinc-500 mt-2 mb-8 text-center max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link to="/dashboard">
        <Button size="lg">Go back home</Button>
      </Link>
    </div>
  );
};
