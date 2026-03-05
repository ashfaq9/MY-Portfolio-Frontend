import { motion } from 'framer-motion';

const experiences = [
  { role: 'Full Stack Developer', company: 'Prowebic, Bangalore', period: 'Aug 2024 - Present', desc: 'Led backend for Shadi4India: JWT auth, Razorpay, DocuSign. Optimized MongoDB for 1k users.' },
  { role: 'MERN Stack Intern', company: 'DCT Academy, Bangalore', period: 'Dec 2023 - Jul 2024', desc: 'Built Job Portal & Laundry system with Stripe payments.' },
  { role: 'Frontend Intern', company: 'Cognitive Solutions, Mangalore', period: 'Nov 2022 - Feb 2023', desc: 'React UIs with Redux state management.' }
];

const Experience = () => (
  <motion.section id="experience" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-24 px-6 max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Experience</h2>
    <div className="relative">
      {experiences.map((exp, idx) => (
        <motion.div key={exp.role} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className={`flex mb-12 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse md:flex-row-reverse'}`}>
          <div className="w-1/2 pr-8 text-right">
            <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
            <p className="text-purple-400 mb-2">{exp.company}</p>
            <p className="text-sm text-slate-400 mb-4">{exp.period}</p>
            <p>{exp.desc}</p>
          </div>
          <div className="w-1/2"></div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default Experience;
