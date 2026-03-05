import { motion } from 'framer-motion';

const projects = [
  { title: 'Shadi4India', desc: 'Matrimonial platform with JWT/OTP auth, Razorpay, Socket.io chat. Backend lead.', tech: 'MERN, Cloudinary, DocuSign', link: 'https://github.com/asbaq9' },
  { title: 'Job Portal', desc: 'Full-stack job board with Stripe payments and auth.', tech: 'React, Node, MongoDB', link: '#' },
  { title: 'Laundry Management', desc: 'System with database schemas and responsive UI.', tech: 'MERN Stack', link: '#' }
];

const Projects = () => (
  <motion.section id="projects" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-24 px-6 bg-slate-900/50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((proj, idx) => (
          <motion.div key={proj.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -10 }} className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl hover:bg-slate-700/50 transition-all border border-slate-700 hover:border-purple-500">
            <h3 className="text-2xl font-bold mb-4">{proj.title}</h3>
            <p className="mb-4">{proj.desc}</p>
            <p className="text-purple-400 text-sm mb-6">{proj.tech}</p>
            <a href={proj.link} className="text-purple-400 hover:text-purple-300 font-semibold">View Project →</a>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default Projects;
