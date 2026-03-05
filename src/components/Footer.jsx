import { Github, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="py-12 px-6 bg-slate-900/80 backdrop-blur-md border-t border-slate-800">
    <div className="max-w-7xl mx-auto text-center">
      <div className="flex justify-center space-x-6 mb-6">
        <a href="https://github.com/asbaq9" className="p-3 bg-slate-800 rounded-full hover:bg-purple-600 transition"><Github size={24} /></a>
        <a href="https://linkedin.com/in/asbaq" className="p-3 bg-slate-800 rounded-full hover:bg-purple-600 transition"><Linkedin size={24} /></a>
      </div>
      <p>&copy; 2026 Mahammad Hasbak. Built with React & Tailwind.</p>
    </div>
  </footer>
);

export default Footer;

