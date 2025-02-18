import { useLocation, Link } from 'react-router-dom';
import { User, Code, Mail, Home } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) return null;

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-white/10">
      <ul className="flex items-center gap-6">
        <li>
          <Link
            to="/"
            className="text-white/60 hover:text-white transition-colors"
            title="Home"
          >
            <Home size={24} />
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`transition-colors ${
              location.pathname === '/about' ? 'text-red-500' : 'text-white/60 hover:text-white'
            }`}
            title="About"
          >
            <User size={24} />
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={`transition-colors ${
              location.pathname === '/projects' ? 'text-red-500' : 'text-white/60 hover:text-white'
            }`}
            title="Projects"
          >
            <Code size={24} />
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`transition-colors ${
              location.pathname === '/contact' ? 'text-red-500' : 'text-white/60 hover:text-white'
            }`}
            title="Contact"
          >
            <Mail size={24} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}