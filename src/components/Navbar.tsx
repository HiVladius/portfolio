import { useLocation, Link } from 'react-router-dom';
import { User, Code, Mail, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) return null;

  const shakeAnimation = {
    whileHover: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5},
    },
  };

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-white/10">
      <ul className="flex items-center gap-6">
        <li>
          <Link
            to="/"
            className="text-white/60 hover:text-white transition-colors"
            title="Home"
          >
            <motion.div {...shakeAnimation}>
              <Home size={24} />
            </motion.div>
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
            <motion.div {...shakeAnimation}>
              <User size={24} />
            </motion.div>
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
            <motion.div {...shakeAnimation}>
              <Code size={24} />
            </motion.div>
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
            <motion.div {...shakeAnimation}>
              <Mail size={24} />
            </motion.div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}