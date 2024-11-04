import React, { useState } from 'react';
import Header from './components/Header';
import GithubForm from './components/GithubForm';
import Resume from './components/Resume';
import { fetchGitHubData, generateResume } from './services/github';
import { GitHubUser, GeneratedResume } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [resume, setResume] = useState<GeneratedResume | null>(null);

  const handleSubmit = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, repos } = await fetchGitHubData(username);
      const generatedResume = generateResume(user, repos);
      setUser(user);
      setResume(generatedResume);
    } catch (err) {
      setError('Failed to fetch GitHub data. Please check the username and try again.');
      setUser(null);
      setResume(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8">
        <GithubForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        {error && (
          <div className="max-w-xl mx-auto mt-4 px-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}

        {user && resume && <Resume user={user} resume={resume} />}

        {!user && !error && (
          <div className="max-w-xl mx-auto mt-16 text-center px-4">
            <img
              src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800"
              alt="GitHub Illustration"
              className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Generate Your Professional Resume
            </h2>
            <p className="text-gray-600">
              Enter your GitHub username above to automatically generate a beautiful resume based on your GitHub profile, repositories, and contributions.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;