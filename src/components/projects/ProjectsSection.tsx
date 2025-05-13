import { useEffect, useRef, useState } from "react";
import { Octokit } from "octokit";
import { Clock, ExternalLink, GitFork, Star } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";

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

// Utilidad para mostrar el tiempo transcurrido desde la última actualización
function timeAgo(dateString: string | null) {
  if (!dateString) return "";
  const now = new Date();
  const updated = new Date(dateString);
  const seconds = Math.floor((now.getTime() - updated.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "segundo"],
    [60, "minuto"],
    [24, "hora"],
    [30, "día"],
    [12, "mes"],
    [Number.POSITIVE_INFINITY, "año"],
  ];

  let i = 0;
  let value = seconds;
  while (i < intervals.length - 1 && value >= intervals[i][0]) {
    value = Math.floor(value / intervals[i][0]);
    i++;
  }
  const label = intervals[i][1];
  return `hace ${value} ${label}${value !== 1 ? "s" : ""}`;
}

export const ProjectsSection = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const octokit = new Octokit({
          auth: import.meta.env.VITE_GITHUB_KEY,
        });

        const response = await octokit.request("GET /user/repos", {
          sort: "updated",
          per_page: 10,
          page,
          visibility: "public",
        });

        const reposWithTopics = await Promise.all(
          response.data.map(async (repo) => {
            const topicsResponse = await octokit.request(
              "GET /repos/{owner}/{repo}/topics",
              {
                owner: repo.owner.login,
                repo: repo.name,
                headers: {
                  "X-GitHub-Api-Version": "2022-11-28",
                },
              },
            );
            return {
              ...repo,
              topics: topicsResponse.data.names,
              description: repo.description ?? "",
            };
          }),
        );

        setRepos((prevRepos) => {
          const allRepos = [...prevRepos, ...reposWithTopics];
          const uniqueRepos = allRepos.filter(
            (repo, index, self) =>
              self.findIndex((r) => r.id === repo.id) === index,
          );
          return uniqueRepos;
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch GitHub repositories");
        setLoading(false);
        console.error("Error fetching repos:", err);
      }
    };

    fetchRepos();
  }, [page]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver);

    const element = document.querySelector("#load-more");
    if (element) observer.current.observe(element);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [repos]);

  const filteredRepos = selectedLanguage
    ? repos.filter((repo) => repo.language === selectedLanguage)
    : repos;

  if (loading && page === 1) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500">
        </div>
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
      <h1 className="text-4xl font-bold mb-12 animate-fade-in flex items-center gap-2">
        My GitHub Projects
      </h1>
      <div className="mb-4">
        <p>Solo se mostraran proyecto publicos</p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-400"
        >
          Filter by Language
        </label>
        <select
          id="language"
          name="language"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-black text-white"
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            setPage(1);
            setRepos([]);
          }}
        >
          <option value="">All Languages</option>
          {[...new Set(repos.map((repo) => repo.language).filter(Boolean))].map(
            (language) => (
              <option key={language} value={language || ""}>
                {language}
              </option>
            ),
          )}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredRepos.map((repo) => (
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
              <p className="text-gray-400 mb-4 line-clamp-2">
                {repo.description || "No description available"}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics.map((topic) => (
                  <span
                    key={`${repo.id}-${topic}`}
                    className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {repo.language && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-400">
                    Main language:{"  "}
                    <span className="text-white">{repo.language}</span>
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
                  <span>
                    {repo.updated_at
                      ? `Updated ${timeAgo(repo.updated_at)}`
                      : "No updates"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading ? <LoadingSpinner /> : null}
      <div id="load-more" className="h-10"></div>
    </div>
  );
};
