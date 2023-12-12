import React from 'react';
import Game from './components/Game'; // Adjust the path as necessary

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800">
      <Game />
    </main>
  );
}
