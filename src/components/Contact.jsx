import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => (
  <motion.section id="contact" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-24 px-6 max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Get In Touch</h2>
    <div className="grid md:grid-cols-2 gap-12">
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
        <div className="space-y-6">
          <div className="flex items-start space-x-4 p-6 bg-slate-800/50 rounded-xl">
            <Mail size={24} className="text-purple-400 mt-1" />
            <div>
              <p className="font-semibold">Email</p>
              <p>asbaq@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-6 bg-slate-800/50 rounded-xl">
            <Phone size={24} className="text-purple-400 mt-1" />
            <div>
              <p className="font-semibold">Phone</p>
              <p>+91 7618764731</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-6 bg-slate-800/50 rounded-xl">
            <MapPin size={24} className="text-purple-400 mt-1" />
            <div>
              <p className="font-semibold">Location</p>
              <p>Bangalore, Karnataka, India</p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
        <form className="space-y-4 p-8 bg-slate-800/50 backdrop-blur-md rounded-2xl">
          <input type="text" placeholder="Your Name" className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:border-purple-500 focus:outline-none" />
          <input type="email" placeholder="Your Email" className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:border-purple-500 focus:outline-none" />
          <textarea placeholder="Your Message" rows={5} className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:border-purple-500 focus:outline-none" />
          <button type="submit" className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold text-lg">Send Message</button>
        </form>
      </motion.div>
    </div>
  </motion.section>
);

export default Contact;
