import React from 'react';
import { Github, FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Github className="w-8 h-8" />
            <h1 className="text-2xl font-bold">GitHub Resume Generator</h1>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6" />
            <span className="text-sm">AI-Powered Resume Builder</span>
          </div>
        </div>
      </div>
    </header>
  );
}