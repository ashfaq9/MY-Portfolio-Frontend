import { motion } from 'framer-motion';

const About = () => (
  <motion.section id="about" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-24 px-6 max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">About Me</h2>
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}>
        <p className="text-lg mb-6 leading-relaxed">Results-driven MERN Stack Developer with 1.5+ years experience building scalable web apps. Specialized in backend architecture, JWT auth, Razorpay payments, and MongoDB optimization. Currently at Prowebic, led backend for Shadi4India matrimonial platform.</p>
        <p className="text-lg">Passionate about Agile, CI/CD, and delivering high-performance solutions on time.</p>
      </motion.div>
      <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="text-center">
        <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl">
          <p className="text-5xl font-bold text-purple-400 mb-4">1.5+</p>
          <p>Years Experience</p>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

export default About;
