import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Props {
  onSubmit: (username: string) => void;
  isLoading: boolean;
}

export default function GithubForm({ onSubmit, isLoading }: Props) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-400"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </button>
      </form>
    </div>
  );
}