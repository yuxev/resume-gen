import { ResumeTheme } from '../types';

export const themes: ResumeTheme[] = [
  {
    id: 'purple',
    name: 'Professional Purple',
    headerClass: 'bg-gradient-to-r from-purple-700 to-indigo-800',
    accentClass: 'text-purple-600',
    buttonClass: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: 'blue',
    name: 'Corporate Blue',
    headerClass: 'bg-gradient-to-r from-blue-600 to-blue-800',
    accentClass: 'text-blue-600',
    buttonClass: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: 'green',
    name: 'Modern Green',
    headerClass: 'bg-gradient-to-r from-emerald-600 to-teal-800',
    accentClass: 'text-emerald-600',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    id: 'dark',
    name: 'Elegant Dark',
    headerClass: 'bg-gradient-to-r from-gray-800 to-gray-900',
    accentClass: 'text-gray-600',
    buttonClass: 'bg-gray-800 hover:bg-gray-900',
  },
];