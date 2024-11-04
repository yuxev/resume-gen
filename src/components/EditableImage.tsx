import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  onUpdate: (newSrc: string) => void;
  onRemove: () => void;
}

export default function EditableImage({ src, alt, className, onUpdate, onRemove }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(src);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(newUrl);
    setIsEditing(false);
  };

  return (
    <div className="relative group">
      {src ? (
        <>
          <img src={src} alt={alt} className={className} />
          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 bg-white rounded-full shadow-md m-1"
            >
              <Upload className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={onRemove}
              className="p-1 bg-white rounded-full shadow-md m-1"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center"
        >
          <Upload className="w-6 h-6 text-gray-400" />
        </button>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Update Image</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}