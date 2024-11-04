export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  blog: string;
  location: string;
  email: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

export interface GeneratedResume {
  summary: string;
  skills: string[];
  experience: string;
  projects: string;
  education: string;
}

export interface ResumeTheme {
  id: string;
  name: string;
  headerClass: string;
  accentClass: string;
  buttonClass: string;
}

export interface ResumeSection {
  id: string;
  title: string;
  content: string;
  suggestions: string[];
  isEditing: boolean;
}