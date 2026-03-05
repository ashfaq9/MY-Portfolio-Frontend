import { motion } from 'framer-motion';

const skills = [
  { name: 'React.js', level: 95 },
  { name: 'Node.js', level: 90 },
  { name: 'MongoDB', level: 85 },
  { name: 'Tailwind CSS', level: 90 },
  { name: 'Express.js', level: 88 },
  { name: 'JavaScript', level: 95 }
];

const Skills = () => (
  <motion.section id="skills" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-24 px-6 bg-slate-900/50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Skills</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skill, idx) => (
          <motion.div key={skill.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <div className="flex justify-between mb-2">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="bg-slate-800 rounded-full h-3">
              <motion.div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1.5 }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default Skills;
