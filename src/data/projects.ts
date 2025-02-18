import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management',
    thumbnail: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/yourusername/project',
    longDescription: 'A comprehensive e-commerce platform built with modern technologies...',
    images: [
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    ]
  },
  // Add more projects as needed
];