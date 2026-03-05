import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section 
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[100svh] flex flex-col lg:flex-row justify-center items-center px-3 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16 xl:py-20 overflow-hidden relative"
    >
      {/* Dynamic 3D Background - Optimized */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br 
          from-slate-50 via-blue-50/40 to-emerald-50/30
          dark:from-slate-900/95 dark:via-slate-800/80 dark:to-emerald-900/40" />
        
        <motion.div 
          className="absolute inset-0 opacity-20 dark:opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                         rgba(59, 130, 246, 0.3) 0%, 
                         rgba(16, 185, 129, 0.2) 50%, 
                         transparent 70%)`
          }}
        />
        
        <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400/40 dark:bg-emerald-400/50 rounded-full absolute"
            style={{
              left: `${10 + i * 7}%`,
              top: `${10 + i * 6}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        </div>

        <motion.div 
          className="absolute -top-40 -right-32 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-r 
                     from-blue-500/10 via-purple-500/5 to-emerald-500/10 rounded-3xl blur-3xl hidden xl:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-32 w-64 h-64 lg:w-80 lg:h-80 
                     bg-gradient-to-r from-emerald-500/10 via-blue-500/5 to-purple-500/10 
                     rounded-full blur-3xl hidden xl:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* LEFT CONTENT - PERFECT MOBILE STACK */}
      <motion.div className="w-full lg:w-1/2 text-center lg:text-left relative z-20 order-2 lg:order-1 px-2 sm:px-0 mb-6 sm:mb-8 lg:mb-0">
        {/* Tighter Contact Bar - Perfect Mobile Centering */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto w-full max-w-md group relative mb-6 sm:mb-8 p-3 sm:p-5 lg:p-8 bg-gradient-to-r from-white/90 to-slate-50/80 
                     dark:from-slate-900/90 dark:to-slate-800/80 backdrop-blur-3xl 
                     rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/40 dark:border-slate-700/50 
                     shadow-xl hover:shadow-2xl transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent 
                           to-emerald-500/5 rounded-xl sm:rounded-2xl lg:rounded-3xl -skew-x-3 opacity-0 group-hover:opacity-100 
                           transition-opacity duration-500" />
          
          <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 dark:text-slate-300 font-medium">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex-shrink-0" />
              <span className="text-center sm:text-left">Bangalore, India</span>
            </div>
            <div className="flex flex-col xs:flex-row items-center gap-2 sm:gap-3 text-slate-600 dark:text-slate-300 mx-auto sm:mx-0">
              <a href="mailto:asbaq0@gmail.com" 
                 className="group/link flex items-center gap-1 hover:text-blue-600 
                            dark:hover:text-emerald-400 transition-all duration-300 
                            hover:-translate-y-1 font-semibold text-xs sm:text-sm truncate max-w-[140px] sm:max-w-none">
                <span>✉</span>
                <span>asbaq0@gmail.com</span>
              </a>
              <a href="tel:+917618764731" 
                 className="hover:text-blue-600 dark:hover:text-emerald-400 
                            transition-all duration-300 hover:-translate-y-1 text-xs sm:text-sm whitespace-nowrap">
                +91 7618764731
              </a>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/30 dark:border-slate-700/50 justify-center sm:justify-start">
            <a href="https://linkedin.com/in/asbaq" 
               className="group p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50 
                          backdrop-blur-xl border border-white/30 hover:border-blue-300 
                          dark:hover:border-emerald-400 hover:bg-white hover:shadow-xl 
                          transition-all duration-400 hover:-translate-y-2 flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center"
               target="_blank" rel="noopener noreferrer">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-700 dark:text-slate-300 
                               group-hover:text-blue-600 dark:group-hover:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/ashfaq9" 
               className="group p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50 
                          backdrop-blur-xl border border-white/30 hover:border-blue-300 
                          dark:hover:border-emerald-400 hover:bg-white hover:shadow-xl 
                          transition-all duration-400 hover:-translate-y-2 flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center"
               target="_blank" rel="noopener noreferrer">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-700 dark:text-slate-300 
                               group-hover:text-blue-600 dark:group-hover:text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.176 2.873.171 3.177.768.84 1.236 1.911 1.236 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Tighter Hero Title - Better Mobile Scaling */}
        <motion.div className="relative mb-4 sm:mb-6 lg:mb-8">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black mb-3 sm:mb-4 lg:mb-6 leading-tight
                       bg-gradient-to-r from-slate-900 via-blue-900/80 to-emerald-600/90
                       dark:from-emerald-400/90 dark:via-blue-400/80 dark:to-purple-500/90
                       bg-clip-text text-transparent drop-shadow-2xl"
          >
            Mahammad
            <br className="sm:hidden lg:block" />
            <span className="bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text -webkit-bg-clip-text">
              Hasbak
            </span>
          </motion.h1>
          
          <div className="absolute -bottom-3 sm:-bottom-4 lg:-bottom-6 left-1/2 -translate-x-1/2 w-20 sm:w-24 lg:w-32 h-0.5 sm:h-1 bg-gradient-to-r 
                           from-blue-500 via-purple-500 to-emerald-500 rounded-full 
                           blur opacity-75" />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-6 sm:mb-8 lg:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r 
                         from-slate-700 via-blue-700 to-emerald-600 text-transparent 
                         bg-clip-text dark:from-emerald-300 dark:via-blue-300 dark:to-purple-400
                         drop-shadow-lg">
            MERN Stack Developer
          </h2>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-semibold justify-center lg:justify-start">
            <span>Fullstack Engineer</span>
            <span className="hidden sm:inline mx-1 text-slate-400 dark:text-slate-500">•</span>
            <span>Bangalore</span>
          </div>
        </motion.div>

        {/* Perfect Button Alignment - Full Width Mobile, Auto Desktop */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col xs:flex-row gap-3 sm:gap-4 lg:gap-6 w-full max-w-md sm:max-w-none mx-auto lg:mx-0"
        >
          <Link to="projects" smooth duration={800} className="group flex-1 xs:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-xl font-black rounded-xl sm:rounded-2xl lg:rounded-3xl 
                         bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600
                         dark:from-emerald-600 dark:via-blue-600 dark:to-purple-600
                         hover:from-blue-700 hover:via-purple-700 hover:to-emerald-700
                         shadow-2xl hover:shadow-3xl hover:shadow-blue-500/30 
                         dark:hover:shadow-emerald-500/30 border border-white/30 
                         backdrop-blur-xl overflow-hidden transition-all duration-500 w-full xs:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 lg:gap-3">
                View My Work
                <motion.div 
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-white/50"
                  animate={{ x: [0, 10, 20], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r 
                              from-white/20 via-transparent to-white/20 
                              -skew-x-12 opacity-0 group-hover:opacity-100 
                              transform -translate-x-4 group-hover:translate-x-4 
                              transition-transform duration-700" />
            </motion.button>
          </Link>
          
          <Link to="contact" smooth duration={800} className="flex-1 xs:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-xl font-black rounded-xl sm:rounded-2xl lg:rounded-3xl 
                         bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800/90
                         backdrop-blur-2xl border-2 border-slate-200/50 
                         dark:border-slate-600/50 hover:border-blue-300 
                         dark:hover:border-emerald-400 shadow-2xl hover:shadow-3xl 
                         text-slate-900 dark:text-slate-100 transition-all duration-500 w-full xs:w-auto"
            >
              Let's Talk
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* RESPONSIVE Profile Card - Tablet/Desktop Optimized */}
      <motion.div 
        initial={{ x: 80, opacity: 0, rotateY: 20 }}
        animate={{ x: 0, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="hidden md:flex lg:w-1/2 xl:w-auto justify-center lg:justify-end items-center order-1 lg:order-2 mb-6 lg:mb-0 px-4 sm:px-0"
      >
        <div className="relative group w-[320px] sm:w-[360px] md:w-[380px] lg:w-[420px] xl:w-[450px] 2xl:w-[480px] 
                        h-[380px] sm:h-[420px] md:h-[450px] lg:h-[480px] xl:h-[520px] 2xl:h-[560px] 
                        perspective-1000 mx-auto lg:mx-0">
          <motion.div 
            className="relative w-full h-full bg-gradient-to-b 
                       from-white/95 via-slate-50/80 to-blue-50/60
                       dark:from-slate-900/98 dark:via-slate-800/90 dark:to-emerald-900/50
                       rounded-2xl lg:rounded-3xl backdrop-blur-3xl border border-white/60 
                       dark:border-slate-500/50 shadow-3xl overflow-hidden cursor-pointer
                       group-hover:shadow-4xl transition-all duration-700"
            whileHover={{ rotateY: 5, rotateX: -2, scale: 1.02 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent 
                         via-white/20 to-transparent rounded-2xl lg:rounded-3xl -skew-x-12 opacity-0 
                         group-hover:opacity-100 transition-opacity duration-700"
              style={{
                transform: `translateX(${mousePosition.x * 0.02}%) translateY(${mousePosition.y * 0.02}%)`
              }}
            />
            
            <div className="relative z-20 h-full p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col items-center justify-center text-center">
              <motion.div 
                className="w-24 sm:w-28 lg:w-32 xl:w-36 2xl:w-44 h-24 sm:h-28 lg:h-32 xl:h-36 2xl:h-44 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 relative group-hover:scale-110 transition-all duration-700"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r 
                                from-blue-500 via-purple-500 to-emerald-600
                                dark:from-emerald-600 dark:via-blue-500 dark:to-purple-600
                                rounded-2xl lg:rounded-3xl shadow-3xl blur-sm opacity-50" />
                <div className="absolute inset-2 sm:inset-2.5 lg:inset-3 xl:inset-4 bg-gradient-to-br 
                                from-slate-900 via-slate-800 to-slate-700
                                dark:from-slate-50 dark:via-slate-100 dark:to-slate-200
                                rounded-xl lg:rounded-2xl shadow-2xl flex items-center justify-center 
                                text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white dark:text-slate-900 
                                border-3 sm:border-4 border-white/30 dark:border-slate-900/50">
                  MH
                </div>
              </motion.div>
              
              <motion.h3 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-3 sm:mb-4 lg:mb-6 
                           text-slate-900 dark:text-slate-50 drop-shadow-lg"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                Mahammad Hasbak
              </motion.h3>
              
              <motion.div 
                className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl xl:text-2xl font-bold 
                           text-slate-600 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 
                           rounded-xl lg:rounded-2xl xl:rounded-3xl backdrop-blur-xl border border-white/40 
                           dark:border-slate-600/50 shadow-2xl hover:shadow-3xl 
                           transition-all duration-500 cursor-default"
                whileHover={{ y: -4 }}
              >
                MERN Stack Developer
              </motion.div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 bg-white/70 dark:bg-slate-800/70 
                              px-4 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-5 lg:py-6 xl:py-8 rounded-xl lg:rounded-2xl xl:rounded-3xl 
                              backdrop-blur-xl border border-white/50 dark:border-slate-600/50 
                              shadow-xl hover:shadow-2xl transition-all duration-500 w-full">
                <motion.span 
                  className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 
                             text-blue-700 font-bold rounded-lg sm:rounded-xl backdrop-blur-sm 
                             hover:bg-blue-500/30 dark:text-emerald-300 transition-all flex-1 sm:flex-none text-xs sm:text-sm lg:text-base"
                  whileHover={{ scale: 1.05 }}
                >
                  React
                </motion.span>
                <motion.span 
                  className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 
                             text-emerald-700 font-bold rounded-lg sm:rounded-xl backdrop-blur-sm 
                             hover:bg-emerald-500/30 dark:text-emerald-300 transition-all flex-1 sm:flex-none text-xs sm:text-sm lg:text-base"
                  whileHover={{ scale: 1.05 }}
                >
                  Node.js
                </motion.span>
                <motion.span 
                  className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-purple-500/20 to-purple-600/20 
                             text-purple-700 font-bold rounded-lg sm:rounded-xl backdrop-blur-sm 
                             hover:bg-purple-500/30 dark:text-purple-300 transition-all flex-1 sm:flex-none text-xs sm:text-sm lg:text-base"
                  whileHover={{ scale: 1.05 }}
                >
                  MongoDB
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
