import { Octokit } from 'octokit';
import { GitHubUser, Repository, GeneratedResume } from '../types';

const octokit = new Octokit();

export async function fetchGitHubData(username: string): Promise<{
  user: GitHubUser;
  repos: Repository[];
}> {
  const userResponse = await octokit.request('GET /users/{username}', {
    username,
  });

  const reposResponse = await octokit.request('GET /users/{username}/repos', {
    username,
    sort: 'stars',
    per_page: 10,
  });

  return {
    user: userResponse.data as GitHubUser,
    repos: reposResponse.data as Repository[],
  };
}

export function generateResume(user: GitHubUser, repos: Repository[]): GeneratedResume {
  // Extract languages and topics from repos
  const languages = new Set(repos.map(repo => repo.language).filter(Boolean));
  const topics = new Set(repos.flatMap(repo => repo.topics));
  
  // Generate skills list
  const skills = [...languages, ...topics].filter(Boolean);

  // Format projects section
  const topProjects = repos
    .filter(repo => repo.description)
    .slice(0, 5)
    .map(repo => `
      <div class="mb-4">
        <h3 class="font-semibold text-gray-800">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="hover:text-purple-600">
            ${repo.name}
          </a>
          ${repo.stargazers_count > 0 ? ` · ⭐ ${repo.stargazers_count}` : ''}
        </h3>
        <p>${repo.description}</p>
        ${repo.language ? `<span class="text-sm text-purple-600">${repo.language}</span>` : ''}
      </div>
    `).join('');

  return {
    summary: `Experienced software developer with a strong presence on GitHub, maintaining ${user.public_repos} public repositories and engaging with a community of ${user.followers} followers. Demonstrates expertise in ${Array.from(languages).slice(0, 3).join(', ')}, and other technologies. Committed to open-source development and collaborative problem-solving.`,
    skills,
    experience: `
      <div class="mb-4">
        <h3 class="font-semibold text-gray-800">Open Source Developer</h3>
        <p class="text-sm text-gray-600">GitHub · ${new Date(user.created_at).getFullYear()} - Present</p>
        <ul class="list-disc ml-4 mt-2">
          <li>Maintained and contributed to ${user.public_repos} public repositories</li>
          <li>Built a following of ${user.followers} developers on GitHub</li>
          <li>Collaborated with developers worldwide on open-source projects</li>
          <li>Implemented solutions using ${Array.from(languages).slice(0, 3).join(', ')}</li>
        </ul>
      </div>
    `,
    projects: topProjects,
    education: `
      <div class="mb-4">
        <p>Education information can be added manually or through integration with LinkedIn API</p>
      </div>
    `,
  };
}