import { User, Code, Mail } from 'lucide-react';
import {useNavigate} from 'react-router-dom';

interface ProfileOption {
  id: string;
  title: string;
  icon: JSX.Element;
}

const profiles: ProfileOption[] = [
  {
    id: 'about',
    title: 'About Me',
    icon: <User size={32} />
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Code size={32} />
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: <Mail size={32} />
  }
];



export function ProfileSelector() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl font-bold mb-12">Who's watching?</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {profiles.map((profile) => (
        <button
          key={profile.id}
          onClick={() => navigate(`/${profile.id}`)}
          className="group flex flex-col items-center transition-transform duration-200 hover:scale-110"
        >
          <div className="w-32 h-32 rounded bg-gray-800 flex items-center justify-center mb-4 group-hover:border-2 border-white">
            {profile.icon}
          </div>
          <span className="text-gray-400 group-hover:text-white">
            {profile.title}
          </span>
        </button>
      ))}
    </div>
  </div>
  );
}