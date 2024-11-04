import React, { useState } from 'react';
import { Edit2, Check, X, Plus, Trash2 } from 'lucide-react';

interface Props {
  title: string;
  content: string;
  suggestions?: string[];
  onUpdate: (content: string) => void;
  onDelete?: () => void;
  isCustomSection?: boolean;
}

export default function EditableSection({ 
  title, 
  content, 
  suggestions, 
  onUpdate,
  onDelete,
  isCustomSection 
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSave = () => {
    onUpdate(editedContent);
    setIsEditing(false);
    setShowSuggestions(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
    setShowSuggestions(false);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowSuggestions(true);
                }}
                className="p-1 text-gray-600 hover:bg-gray-50 rounded"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              {isCustomSection && onDelete && (
                <button
                  onClick={onDelete}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
          />
          {showSuggestions && suggestions && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Suggestions:</h3>
              <ul className="list-disc ml-4 space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-600">{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div 
          className="prose max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </section>
  );
}