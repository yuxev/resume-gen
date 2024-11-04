import React, { useState } from 'react';
import { Download, Github, Globe, MapPin, Mail, Plus, Settings } from 'lucide-react';
import { GitHubUser, GeneratedResume, ResumeTheme } from '../types';
import { themes } from '../data/themes';
import { suggestions } from '../data/suggestions';
import html2pdf from 'html2pdf.js';
import EditableImage from './EditableImage';
import EditableSection from './EditableSection';

interface Props {
  user: GitHubUser;
  resume: GeneratedResume;
}

interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export default function Resume({ user, resume }: Props) {
  const [currentTheme, setCurrentTheme] = useState<ResumeTheme>(themes[0]);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url);
  const [showAvatar, setShowAvatar] = useState(true);
  const [sections, setSections] = useState({
    summary: resume.summary,
    experience: resume.experience,
    projects: resume.projects,
    education: resume.education,
  });
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [pdfOptions, setPdfOptions] = useState({
    pageSize: 'letter',
    maxPages: 2,
  });
  const [showSettings, setShowSettings] = useState(false);

  const downloadPDF = () => {
    const element = document.getElementById('resume');
    const opt = {
      margin: 1,
      filename: `${user.login}-resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { 
        unit: 'in', 
        format: pdfOptions.pageSize, 
        orientation: 'portrait',
        maxPages: pdfOptions.maxPages,
      }
    };
    html2pdf().set(opt).from(element).save();
  };

  const addCustomSection = () => {
    const id = `section-${Date.now()}`;
    const newSection: CustomSection = {
      id,
      title: 'New Section',
      content: 'Add your content here...',
    };
    setCustomSections([...customSections, newSection]);
  };

  const updateCustomSection = (id: string, field: 'title' | 'content', value: string) => {
    setCustomSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const deleteCustomSection = (id: string) => {
    setCustomSections(prev => prev.filter(section => section.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 mb-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={downloadPDF}
            className={`flex items-center gap-2 ${currentTheme.buttonClass} text-white px-4 py-2 rounded-lg transition-colors`}
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
          
          <select
            value={currentTheme.id}
            onChange={(e) => setCurrentTheme(themes.find(t => t.id === e.target.value) || themes[0])}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-600 outline-none"
          >
            {themes.map(theme => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={addCustomSection}
          className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
        >
          <Plus className="w-5 h-5" />
          Add Section
        </button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">PDF Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Size
                </label>
                <select
                  value={pdfOptions.pageSize}
                  onChange={(e) => setPdfOptions(prev => ({ ...prev, pageSize: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="letter">Letter</option>
                  <option value="a4">A4</option>
                  <option value="legal">Legal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Pages
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={pdfOptions.maxPages}
                  onChange={(e) => setPdfOptions(prev => ({ ...prev, maxPages: parseInt(e.target.value) }))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div id="resume" className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className={`${currentTheme.headerClass} text-white p-8`}>
          <div className="flex items-center gap-6">
            {showAvatar && (
              <EditableImage
                src={avatarUrl}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white"
                onUpdate={setAvatarUrl}
                onRemove={() => setShowAvatar(false)}
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-purple-200 mt-2">{user.bio}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                )}
                {user.blog && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a href={user.blog} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Portfolio
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  <a
                    href={`https://github.com/${user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {user.login}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {Object.entries(sections).map(([key, content]) => (
            <EditableSection
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              content={content}
              suggestions={suggestions[key as keyof typeof suggestions]}
              onUpdate={(newContent) => setSections(prev => ({ ...prev, [key]: newContent }))}
            />
          ))}

          {customSections.map(section => (
            <EditableSection
              key={section.id}
              title={section.title}
              content={section.content}
              onUpdate={(newContent) => updateCustomSection(section.id, 'content', newContent)}
              onDelete={() => deleteCustomSection(section.id)}
              isCustomSection
            />
          ))}
        </div>
      </div>
    </div>
  );
}