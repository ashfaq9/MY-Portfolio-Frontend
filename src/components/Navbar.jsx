import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Sun, Moon, Menu, X, Github, Linkedin, Twitter, ChevronDown } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      for (let section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveLink(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: 'hero' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Experience', href: 'experience' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
      
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-[9999] px-4 sm:px-6 py-3 sm:py-4 transition-all duration-700 ease-out backdrop-blur-2xl
          ${scrolled 
            ? 'bg-white/95 dark:bg-slate-900/98 shadow-xl border-b border-slate-200/60 dark:border-slate-800/60' 
            : 'bg-white/90 dark:bg-slate-900/90'
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to="hero" smooth duration={800} className="flex items-center space-x-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-emerald-500 dark:via-blue-500 dark:to-purple-500 rounded-2xl shadow-xl flex items-center justify-center backdrop-blur-sm border border-white/20 flex-shrink-0">
                <span className="text-base sm:text-lg lg:text-xl font-black text-white drop-shadow-md">MH</span>
              </div>
              <div className="hidden xs:block sm:block">
                <div className="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-emerald-500 dark:via-blue-500 dark:to-purple-500 bg-clip-text text-transparent tracking-tight leading-tight">
                  Mahammad Hasbak
                </div>
                <div className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider hidden sm:block">
                  Full Stack Developer
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex lg:flex items-center space-x-1">
            <div className="flex items-center space-x-0.5">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  className="relative"
                  whileHover={{ y: -4 }}
                >
                  <Link 
                    to={item.href} 
                    smooth 
                    duration={800}
                    offset={-100}
                    className={`
                      flex items-center px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base font-semibold rounded-3xl transition-all duration-300 relative z-10 cursor-pointer whitespace-nowrap
                      ${activeLink === item.href 
                        ? 'text-blue-600 dark:text-emerald-400 bg-blue-50/50 dark:bg-emerald-500/10 shadow-md shadow-blue-100/50 dark:shadow-emerald-500/20' 
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-emerald-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                      }
                    `}
                    onClick={() => {
                      closeMobileMenu();
                      setActiveLink(item.href);
                    }}
                  >
                    {item.name}
                  </Link>
                  
                  {activeLink === item.href && (
                    <motion.div 
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 dark:bg-emerald-400 rounded-full shadow-lg"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center space-x-2 lg:space-x-3">
            <Link 
              to="projects" 
              smooth 
              duration={800}
              className="btn-primary text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 whitespace-nowrap px-4 py-2.5 text-sm sm:text-base hidden lg:inline-flex"
              onClick={closeMobileMenu}
            >
              Latest Work
            </Link>

            <div className="flex items-center gap-1 p-2 glass rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg backdrop-blur-xl">
              {[
                { href: 'https://github.com/yourusername', icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com/in/yourprofile', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://twitter.com/yourhandle', icon: Twitter, label: 'Twitter' }
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-emerald-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 shadow-md hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 hover:rotate-3"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-700 dark:hover:to-slate-600 shadow-lg hover:shadow-xl hover:shadow-slate-400/20 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl transition-all duration-300"
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`}
            >
              {darkMode ? (
                <Sun size={16} className="text-yellow-500" />
              ) : (
                <Moon size={16} className="text-slate-600 dark:text-slate-300" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-2xl bg-slate-100/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl hover:shadow-slate-400/20 transition-all duration-300 flex-shrink-0"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <X size={18} className="text-slate-700 dark:text-slate-300" />
            ) : (
              <Menu size={18} className="text-slate-700 dark:text-slate-300" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ 
            opacity: mobileOpen ? 1 : 0, 
            y: mobileOpen ? 0 : 20,
            scale: mobileOpen ? 1 : 0.95
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:hidden fixed top-20 left-4 right-4 z-[9997] max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain"
        >
          <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200/40 dark:border-slate-800/40 backdrop-blur-2xl max-h-full">
            <nav className="space-y-3 sm:space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Link 
                    to={item.href} 
                    smooth 
                    duration={800}
                    offset={-100}
                    className={`
                      group flex items-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-base sm:text-lg font-semibold transition-all duration-400 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-x-2 hover:-translate-y-1 whitespace-nowrap
                      ${activeLink === item.href
                        ? 'bg-gradient-to-r from-blue-500/15 to-emerald-500/15 text-blue-700 dark:text-emerald-400 shadow-xl shadow-blue-200/50 dark:shadow-emerald-500/30 ring-2 ring-blue-200/50 dark:ring-emerald-400/30'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-emerald-400 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-emerald-500/10'
                      }
                    `}
                    onClick={() => {
                      closeMobileMenu();
                      setActiveLink(item.href);
                    }}
                  >
                    <div className={`
                      w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-3 sm:mr-4 transition-all duration-300 flex-shrink-0
                      ${activeLink === item.href 
                        ? 'bg-gradient-to-r from-blue-600 to-emerald-400 scale-125 shadow-lg ring-1 ring-white/50' 
                        : 'bg-slate-300 dark:bg-slate-600 opacity-60 group-hover:opacity-100 group-hover:scale-125'
                      }
                    `} />
                    {item.name}
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:rotate-180" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA & Social */}
            <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-200/30 dark:border-slate-700/50 pb-4 sm:pb-6">
              <Link 
                to="projects" 
                smooth 
                duration={800}
                className="w-full btn-primary text-white text-base sm:text-lg font-bold py-4 sm:py-5 rounded-3xl shadow-2xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-400 mb-6 sm:mb-8 flex items-center justify-center whitespace-nowrap"
                onClick={closeMobileMenu}
              >
                View My Work
              </Link>
              
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {[
                  { href: 'https://github.com/yourusername', icon: Github, label: 'GitHub' },
                  { href: 'https://linkedin.com/in/yourprofile', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'https://twitter.com/yourhandle', icon: Twitter, label: 'Twitter' }
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 sm:p-4 glass rounded-xl sm:rounded-2xl text-center hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-400"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={16} className="mx-auto mb-1 sm:mb-2 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 block leading-tight">{label}</span>
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center justify-between p-4 glass rounded-2xl sm:rounded-3xl">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Theme Mode</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300 dark:hover:bg-slate-600 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {darkMode ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-slate-600" />}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;
