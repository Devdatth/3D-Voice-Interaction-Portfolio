export interface GithubRepoItem {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

/**
 * Fetches public repositories directly from GitHub's REST API.
 * This guarantees that whenever you push code, create new repos, or edit descriptions on GitHub,
 * your portfolio will dynamically synchronize and display them in real time!
 */
export async function fetchLiveGithubRepos(username = 'devdatth-adik'): Promise<GithubRepoItem[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data: GithubRepoItem[] = await response.json();
    return data;
  } catch (error) {
    console.debug('GitHub Live Sync fetch fallback:', error);
    return [];
  }
}
