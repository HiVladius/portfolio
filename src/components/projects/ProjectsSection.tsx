import { useState, useEffect } from 'react';
import { Octokit } from 'octokit';
import { ExternalLink, Star, GitFork, Clock } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string | null;
  topics: string[];
}

export function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const octokit = new Octokit({
          auth: import.meta.env.VITE_GITHUB_KEY // You'll need to add this to your .env file
        });

        const response = await octokit.request('GET /user/repos', {
          sort: 'updated',
          per_page: 20,
          visibility: 'public'
        });

        const reposWithTopics = await Promise.all(
          response.data.map(async (repo) => {
            const topicsResponse = await octokit.request('GET /repos/{owner}/{repo}/topics', {
              owner: repo.owner.login,
              repo: repo.name,
              headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
            });
            return { ...repo, topics: topicsResponse.data.names, description: repo.description ?? '' };
          })
        );

        setRepos(reposWithTopics);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch GitHub repositories');
        setLoading(false);
        console.error('Error fetching repos:', err);
      }
    };

    fetchRepos();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-12 animate-fade-in">My GitHub Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.map((repo) => (
          <div 
            key={repo.id}
            className="bg-zinc-900/50 rounded-xl overflow-hidden shadow-xl hover:shadow-red-500/20 transition-all duration-300 flex flex-col"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">{repo.name}</h3>
                <a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              <p className="text-gray-400 mb-4 line-clamp-2">{repo.description || 'No description available'}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics.map((topic) => (
                  <span 
                    key={topic}
                    className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {repo.language && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-400">
                    Main language: <span className="text-white">{repo.language}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-800 p-4 bg-black/20">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star size={16} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={16} />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}