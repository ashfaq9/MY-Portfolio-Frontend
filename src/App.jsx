import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { useState, useEffect, useRef } from 'react';
import { FaInstagram } from "react-icons/fa";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Experience', 'Projects', 'Skills', 'Achievements', 'Contact'];

const STATS = [
  { num: '1.5+', label: 'Years Exp.' },
  { num: '3+', label: 'Projects' },
  { num: '1K+', label: 'Users Served' },
  { num: '100%', label: 'Sprint Delivery' },
];

const SKILLS_BAR = [
  { name: 'JavaScript / ES6+', pct: 90 },
  { name: 'Node.js / Express.js', pct: 88 },
  { name: 'MongoDB / Mongoose', pct: 85 },
  { name: 'React.js / Redux', pct: 82 },
  { name: 'REST APIs / JWT / OAuth', pct: 87 },
  { name: 'Razorpay / Stripe / DocuSign', pct: 78 },
  { name: 'Tailwind CSS / MUI', pct: 80 },
];

const TECH_STACK = [
  { icon: '⚡', name: 'JavaScript' },
  { icon: '⚛️', name: 'React.js' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '🚂', name: 'Express.js' },
  { icon: '🍃', name: 'MongoDB' },
  { icon: '🔴', name: 'Redux' },
  { icon: '🔑', name: 'JWT / OAuth' },
  { icon: '💳', name: 'Razorpay' },
  { icon: '💵', name: 'Stripe' },
  { icon: '📄', name: 'DocuSign' },
  { icon: '☁️', name: 'Cloudinary' },
  { icon: '📡', name: 'Socket.io' },
  { icon: '🎨', name: 'Tailwind CSS' },
  { icon: '🧩', name: 'Material UI' },
  { icon: '🐙', name: 'Git / GitHub' },
  { icon: '📬', name: 'Postman' },
  { icon: '🔔', name: 'Twilio' },
  { icon: '📧', name: 'Nodemailer' },
];

const EXPERIENCE = [
  {
    date: 'Aug 2024 — Present',
    role: 'Full Stack Developer',
    company: 'Prowebic · Bangalore, India',
    points: [
      'Designed and developed backend architecture for Shadi4India, a large-scale matrimonial platform.',
      'Implemented multi-role auth & authorization (Admin, Sub-admin, Vendor, Event Manager, User).',
      'Integrated Razorpay (payments) and DocuSign (vendor contracts) — cutting onboarding from 3 days → 1 day.',
      'Built subscription & premium plans with expiry management and feature-based access.',
      'Automated Cloudinary uploads with watermarking, securing 1,000+ media files.',
      'Led a 2-member backend team, ensuring 100% sprint delivery on time.',
    ],
  },
  {
    date: 'Dec 2023 — Jul 2024',
    role: 'MERN Stack Intern',
    company: 'DCT Academy · Bangalore, India',
    points: [
      'Built real-world projects including a Job Portal and Laundry Management System.',
      'Integrated Stripe payment gateway, designed database schemas, and applied authentication.',
      'Designed MongoDB schemas and implemented React.js + Redux frontends.',
      'Collaborated with frontend workflows ensuring smooth API integration and UI responsiveness.',
    ],
  },
  {
    date: 'Nov 2022 — Feb 2023',
    role: 'Frontend Intern',
    company: 'Cognitive Solutions · Mangalore, India',
    points: [
      'Developed dynamic React.js frontends with responsive and interactive UI components.',
      'Applied Redux state management for smooth data handling.',
      'Collaborated with backend developers for API integrations.',
      'Delivered project features on time — leading to a permanent Software Developer offer.',
    ],
  },
];

const PROJECTS = [
  {
    emoji: '💍',
    name: 'Shadi4India',
    subtitle: 'Matrimonial Platform — Client Project',
    desc: 'Large-scale matrimonial platform with multi-role authentication, subscription plans, real-time chat via Socket.io, Razorpay payments, DocuSign vendor contracts, and Cloudinary media management. Supports 1,000+ concurrent users.',
    tags: ['Node.js', 'React.js', 'MongoDB', 'Razorpay', 'DocuSign', 'Socket.io', 'JWT', 'Cloudinary', 'OTP Login', 'RBAC'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    emoji: '💼',
    name: 'Job Portal',
    subtitle: 'Full Stack — Intern Project',
    desc: 'Full-featured job portal with employer/candidate roles, job listings, application management, JWT authentication, and Stripe payment integration for premium job postings.',
    tags: ['React.js', 'Redux', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Express.js'],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    emoji: '👕',
    name: 'Laundry Management System',
    subtitle: 'Full Stack — Intern Project',
    desc: 'End-to-end laundry service platform with order tracking, customer management, admin panel, service scheduling, SMS notifications via Twilio, and Nodemailer email alerts.',
    tags: ['React.js', 'Express.js', 'MongoDB', 'Twilio', 'Nodemailer', 'Multer', 'Sharp'],
    color: 'from-purple-500 to-violet-600',
  },
];

const ACHIEVEMENTS = [
  { icon: '🏆', title: '100% Sprint Delivery', desc: 'Led 2-member backend team at Prowebic — delivered every sprint on time, every time.' },
  { icon: '⚡', title: '3× Faster Onboarding', desc: 'Slashed vendor onboarding from 3 days to 1 day using DocuSign automation.' },
  { icon: '📈', title: '1K+ Concurrent Users', desc: 'Optimized MongoDB schemas & queries to support 1,000+ concurrent users at scale.' },
  { icon: '🔒', title: 'Media Security at Scale', desc: 'Automated Cloudinary watermarking securing 1,000+ media files on a live platform.' },
  { icon: '🎓', title: 'MERN Certified', desc: 'Completed MERN Stack certification from DCT Academy. Pursuing AWS Cloud Practitioner.' },
  { icon: '⭐', title: 'Client Recognition', desc: 'Praised by mentors and clients for delivering scalable, secure backend solutions.' },
];

const CERTS = [
  { title: 'MERN Stack Development', by: 'DCT Academy · Nov 2024', status: 'done' },
  { title: 'JavaScript Algorithms & Data Structures', by: 'FreeCodeCamp · 2025', status: 'done' },
  { title: 'AWS Certified Cloud Practitioner', by: 'Amazon Web Services', status: 'progress' },
  { title: 'MongoDB Certified Developer Associate', by: 'MongoDB University · Planned 2025', status: 'planned' },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// ─── REVEAL WRAPPER ──────────────────────────────────────────────────────────

const Reveal = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const variants = direction === 'left' ? fadeLeft : fadeUp;
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── SECTION HEADER ──────────────────────────────────────────────────────────

const SectionHeader = ({ num, title, highlight }) => (
  <Reveal className="mb-10 lg:mb-16">
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 dark:text-emerald-400 mb-3">
      {num}
    </p>
    <h2 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-none">
      {title}{' '}
      <span className="bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
        {highlight}
      </span>
    </h2>
  </Reveal>
);

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

const Navbar = ({ dark, setDark }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-4 transition-all duration-500
          ${scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-900/5'
            : 'bg-transparent'
          }`}
      >
        <Link to="hero" smooth duration={600} className="cursor-pointer flex-shrink-0">
          <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white">
            MH<span className="text-emerald-500">.</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map(link => (
            <Link key={link} to={link.toLowerCase()} smooth duration={700} offset={-80}
              className="text-xs font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400
                         hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 cursor-pointer">
              {link}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setDark(!dark)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border border-slate-200/60 dark:border-slate-700/60
                       bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl text-slate-700 dark:text-slate-300
                       text-xs font-semibold transition-all duration-300 hover:border-emerald-400 hover:text-emerald-500">
            <span>{dark ? '☀️' : '🌙'}</span>
            <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
          </motion.button>
          <button onClick={() => setMenuOpen(true)} className="lg:hidden text-slate-700 dark:text-slate-300 text-2xl p-1">☰</button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div key="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 sm:gap-8">
            <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 text-3xl text-slate-700 dark:text-slate-300">✕</button>
            {NAV_LINKS.map((link, i) => (
              <motion.div key={link} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={link.toLowerCase()} smooth duration={700} offset={-80} onClick={() => setMenuOpen(false)}
                  className="font-black text-2xl sm:text-3xl text-slate-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer">
                  {link}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── HERO ────────────────────────────────────────────────────────────────────

const Hero = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const onMove = e => setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.section id="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className="relative min-h-[100svh] flex flex-col lg:flex-row items-center justify-center
                 px-4 sm:px-8 lg:px-16 xl:px-24 pt-24 sm:pt-28 pb-16 lg:py-0 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-emerald-50/30
                        dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/50" />
        <motion.div className="absolute inset-0 opacity-25 dark:opacity-40"
          style={{ background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(16,185,129,0.4) 0%, rgba(59,130,246,0.25) 40%, transparent 70%)` }} />
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/40 dark:bg-emerald-400/50"
            style={{ left: `${8 + i * 7.5}%`, top: `${12 + i * 6}%` }}
            animate={{ y: [0, -18, 0], scale: [1, 1.3, 1], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }} />
        ))}
        <motion.div className="absolute -top-40 -right-40 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-emerald-500/10 rounded-full blur-3xl"
          animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-emerald-500/10 via-blue-500/5 to-purple-500/10 rounded-full blur-3xl"
          animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} />
      </div>

      {/* LEFT */}
      <div className="relative z-10 w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 mt-8 lg:mt-0">

        {/* Badge */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="group relative mb-5 sm:mb-8 max-w-sm sm:max-w-lg mx-auto lg:mx-0 p-3 sm:p-5
             bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl
             border border-white/60 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500"
        >

          {/* FIX: pointer-events-none added */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm">

            <span className="flex items-center justify-center sm:justify-start gap-2 text-slate-600 dark:text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex-shrink-0" />
              Bangalore, India
            </span>

            <a
              href="mailto:asbaq0@gmail.com"
              className="font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors text-center sm:text-left"
            >
              ✉ asbaq0@gmail.com
            </a>

            <a
              href="tel:+917618764731"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-emerald-400 transition-colors text-center sm:text-left"
            >
              +91 76187 64731
            </a>

          </div>

          <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100/60 dark:border-slate-700/50 justify-center sm:justify-start">

            {[
              {
                href: "https://linkedin.com/in/asbaq", icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )
              },

              {
                href: "https://github.com/ashfaq9", icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.176 2.873.171 3.177.768.84 1.236 1.911 1.236 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                )
              },

              {
                href: "https://instagram.com/ashfaq_muhmd",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5z" />
                    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z" />
                    <circle cx="17.5" cy="6.5" r="1.2" />
                  </svg>
                )
              },
              {
                href: "https://wa.me/917618764731",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.55 2 2.08 6.47 2.08 11.96c0 1.92.5 3.73 1.46 5.32L2 22l4.89-1.28c1.51.83 3.22 1.27 4.99 1.27h.01c5.49 0 9.96-4.47 9.96-9.96S17.53 2 12.04 2zm0 18.17c-1.53 0-3.02-.41-4.32-1.19l-.31-.18-2.9.76.77-2.83-.2-.33a7.93 7.93 0 0 1-1.21-4.24c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8.01-8 8.01zm4.39-6.02c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.43-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.01.39 1.36.5.57.18 1.09.15 1.5.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                  </svg>
                )
              }
            ].map(({ href, icon }) => (

              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl
                   border border-slate-200/60 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70
                   text-slate-600 dark:text-slate-300 hover:border-blue-400 dark:hover:border-emerald-400
                   hover:text-blue-600 dark:hover:text-emerald-400 hover:shadow-lg transition-all duration-300"
              >
                {icon}
              </motion.a>

            ))}

          </div>

        </motion.div>

        {/* Name */}
        <div className="relative mb-4 sm:mb-6">
          <motion.h1
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-[0.9] tracking-tight mb-4
                       text-[2.6rem] sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl
                       bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-700
                       dark:from-white dark:via-blue-200 dark:to-emerald-400 bg-clip-text text-transparent">
            Mahammad<br />Hasbak
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0
                       h-1 w-24 sm:w-28 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 blur-sm" />
        </div>

        {/* Role */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-6 sm:mb-8">
          <h2 className="font-black text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-2 tracking-tight
                         bg-gradient-to-r from-slate-700 via-blue-700 to-emerald-600
                         dark:from-emerald-300 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
            MERN Stack Developer
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm sm:text-base">
            Fullstack Engineer &nbsp;·&nbsp; Bangalore, India
          </p>
        </motion.div>

        {/* Mobile stats strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}
          className="grid grid-cols-4 gap-2 mb-6 sm:mb-8 md:hidden">
          {STATS.map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center text-center p-2 rounded-xl
                                        bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-700/50">
              <span className="font-black text-sm sm:text-base bg-gradient-to-r from-blue-600 to-emerald-500
                               dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">{num}</span>
              <span className="text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm mx-auto sm:max-w-none lg:mx-0">
          <Link to="projects" smooth duration={800} className="flex-1 sm:flex-none">
            <motion.button whileHover={{ scale: 1.04, y: -4 }} whileTap={{ scale: 0.97 }}
              className="relative w-full group overflow-hidden px-8 py-4 text-sm sm:text-base font-black rounded-2xl
                         bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600
                         dark:from-emerald-500 dark:via-blue-500 dark:to-purple-600
                         text-white shadow-2xl shadow-blue-500/30 dark:shadow-emerald-500/30
                         hover:shadow-3xl transition-all duration-500 border border-white/20">
              <span className="relative z-10 flex items-center justify-center gap-2">
                View My Work
                <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20
                              -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </Link>
          <Link to="contact" smooth duration={800} className="flex-1 sm:flex-none">
            <motion.button whileHover={{ scale: 1.04, y: -4 }} whileTap={{ scale: 0.97 }}
              className="w-full px-8 py-4 text-sm sm:text-base font-black rounded-2xl
                         bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl
                         border-2 border-slate-200/60 dark:border-slate-600/60
                         hover:border-blue-400 dark:hover:border-emerald-400
                         text-slate-900 dark:text-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500">
              Let's Talk
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* RIGHT: Profile card — tablet/desktop only */}
      <motion.div initial={{ x: 80, opacity: 0, rotateY: 20 }} animate={{ x: 0, opacity: 1, rotateY: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex lg:w-1/2 justify-center lg:justify-end items-center order-1 lg:order-2">
        <div className="relative group w-[290px] lg:w-[360px] xl:w-[420px]">
          <motion.div whileHover={{ rotateY: 6, rotateX: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-3xl
                       border border-white/70 dark:border-slate-600/50 shadow-2xl overflow-hidden cursor-pointer">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
            <div className="relative z-10 p-6 xl:p-8 flex flex-col items-center text-center">
              <motion.div className="mb-5 relative" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl blur-md opacity-60 scale-110" />
                <div className="relative w-24 h-24 xl:w-28 xl:h-28 bg-gradient-to-br from-slate-900 to-slate-700
                                dark:from-slate-100 dark:to-slate-300 rounded-2xl flex items-center justify-center
                                text-3xl xl:text-4xl font-black text-white dark:text-slate-900
                                border-4 border-white/30 dark:border-slate-800/50 shadow-2xl">
                  MH
                </div>
              </motion.div>
              {/* // <img src="/my.jpeg" alt="" style={{width:"150px",borderRadius:"40px"}} /> */}
              <motion.h3 whileHover={{ scale: 1.04 }}
                className="font-black text-xl xl:text-2xl text-slate-900 dark:text-white mb-2">
                Mahammad Hasbak
              </motion.h3>
              <motion.div whileHover={{ y: -3 }}
                className="px-5 py-2 mb-5 font-bold text-sm text-slate-600 dark:text-slate-200
                           bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-600/50">
                MERN Stack Developer
              </motion.div>
              <div className="grid grid-cols-2 gap-2.5 w-full mb-5">
                {STATS.map(({ num, label }, i) => (
                  <motion.div key={label}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }} whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-slate-50/80 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200/50 dark:border-slate-700/50">
                    <p className="font-black text-lg bg-gradient-to-r from-blue-600 to-emerald-500
                                  dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">{num}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center bg-slate-50/80 dark:bg-slate-800/70
                              p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 w-full">
                {['React', 'Node.js', 'MongoDB', 'Express', 'Razorpay', 'JWT'].map((t, i) => (
                  <motion.span key={t}
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.08 }} whileHover={{ scale: 1.1 }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold
                      ${i % 3 === 0 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' :
                        i % 3 === 1 ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
                          'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'}`}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-emerald-500" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// ─── ABOUT ───────────────────────────────────────────────────────────────────

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 xl:px-24 bg-slate-50/70 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader num="01 / About" title="Who I" highlight="Am" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <Reveal>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-5">
              I'm <span className="font-bold text-slate-900 dark:text-white">Mahammad Hasbak</span>, a passionate MERN Stack Developer
              based in <span className="font-bold text-slate-900 dark:text-white">Bangalore, India</span> with 1.5+ years of
              hands-on experience designing and shipping{' '}
              <span className="font-bold text-slate-900 dark:text-white">production-ready web applications</span>.
            </p>
            <div className="relative pl-4 sm:pl-5 border-l-2 border-emerald-500 mb-5 py-2">
              <p className="text-slate-500 dark:text-slate-400 italic text-xs sm:text-sm leading-relaxed">
                "I led a 2-member backend team at Prowebic delivering 100% of sprints on time — and reduced
                vendor onboarding from 3 days to 1 day through DocuSign automation."
              </p>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Core expertise in <span className="font-bold text-slate-900 dark:text-white">backend architecture</span>, multi-role auth systems,
              payment gateway integrations (Razorpay, Stripe), MongoDB optimization, and Agile / CI-CD workflows.
              Holds a <span className="font-bold text-slate-900 dark:text-white">BCA from St. Philomena College</span> and
              actively pursuing AWS and MongoDB certifications.
            </p>
          </Reveal>
          <div ref={ref} className="space-y-4 sm:space-y-5">
            {SKILLS_BAR.map(({ name, pct }, i) => (
              <Reveal key={name} delay={i * 0.07}>
                <div className="flex justify-between mb-1.5 text-xs sm:text-sm">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{name}</span>
                  <span className="font-bold text-emerald-500 dark:text-emerald-400">{pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-slate-700/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

const Experience = () => (
  <section id="experience" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 xl:px-24">
    <div className="max-w-4xl mx-auto">
      <SectionHeader num="02 / Experience" title="Work" highlight="History" />
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-700/80 space-y-10 sm:space-y-12">
        {EXPERIENCE.map(({ date, role, company, points }, idx) => (
          <Reveal key={role} delay={idx * 0.1}>
            <div className="relative">
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.2, type: 'spring' }}
                className="absolute -left-[1.85rem] sm:-left-[2.65rem] top-1 w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full
                           bg-gradient-to-r from-blue-500 to-emerald-500
                           border-4 border-white dark:border-slate-900 shadow-lg shadow-emerald-500/30" />
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-emerald-500 dark:text-emerald-400 mb-1">{date}</p>
              <h3 className="font-black text-lg sm:text-xl md:text-2xl text-slate-900 dark:text-white mb-1">{role}</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">{company}</p>
              <ul className="space-y-2">
                {points.map((p, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.1 + i * 0.06 }}
                    className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="mt-0.5 flex-shrink-0 text-emerald-500 dark:text-emerald-400 font-bold">→</span>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── PROJECTS ────────────────────────────────────────────────────────────────

const Projects = () => (
  <section id="projects" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 xl:px-24 bg-slate-50/70 dark:bg-slate-900/50">
    <div className="max-w-6xl mx-auto">
      <SectionHeader num="03 / Projects" title="What I've" highlight="Built" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {PROJECTS.map(({ emoji, name, subtitle, desc, tags, color }, i) => (
          <Reveal key={name} delay={i * 0.12}>
            <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60
                         dark:border-slate-700/60 overflow-hidden shadow-sm hover:shadow-2xl
                         hover:shadow-slate-900/10 dark:hover:shadow-black/30 transition-shadow duration-500 h-full flex flex-col">
              <div className={`h-1.5 sm:h-2 w-full bg-gradient-to-r ${color} opacity-80`} />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 p-5 sm:p-7 flex flex-col flex-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-xl sm:text-2xl mb-4 shadow-lg`}>
                  {emoji}
                </div>
                <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white mb-1">{name}</h3>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">{subtitle}</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">{desc}</p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {tags.map(tag => (
                    <span key={tag} className="text-xs px-2 sm:px-2.5 py-1 rounded-md font-medium
                                               bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400
                                               border border-slate-200/60 dark:border-slate-700/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── SKILLS ──────────────────────────────────────────────────────────────────

const Skills = () => (
  <section id="skills" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 xl:px-24">
    <div className="max-w-6xl mx-auto">
      <SectionHeader num="04 / Skills" title="Tech" highlight="Stack" />
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-3">
        {TECH_STACK.map(({ icon, name }) => (
          <motion.div key={name} variants={fadeUp} whileHover={{ y: -5, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="group flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl sm:rounded-2xl
                       bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60
                       hover:border-emerald-400/60 dark:hover:border-emerald-500/60
                       hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20
                       hover:shadow-lg hover:shadow-emerald-500/10 transition-colors duration-200 cursor-default">
            <span className="text-xl sm:text-2xl">{icon}</span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 text-center leading-tight
                             group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────────

const Achievements = () => (
  <section id="achievements" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 xl:px-24 bg-slate-50/70 dark:bg-slate-900/50">
    <div className="max-w-6xl mx-auto">
      <SectionHeader num="05 / Achievements" title="Key" highlight="Wins" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-14 sm:mb-20">
        {ACHIEVEMENTS.map(({ icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="group relative p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl
                         border border-slate-200/60 dark:border-slate-700/60
                         hover:border-emerald-400/60 dark:hover:border-emerald-500/60
                         hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <p className="text-2xl sm:text-3xl mb-3">{icon}</p>
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <SectionHeader num="06 / Certifications" title="Certs &" highlight="Learning" />
      <div className="space-y-3 ">
        {CERTS.map(({ title, by, status }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-3 sm:gap-5 p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl
                         border border-slate-200/60 dark:border-slate-700/60
                         hover:border-blue-400/60 dark:hover:border-blue-500/60 transition-colors duration-200">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 shadow-lg ${status === 'done' ? 'bg-emerald-500 shadow-emerald-400/50' :
                status === 'progress' ? 'bg-blue-500 shadow-blue-400/50' : 'bg-slate-400'}`} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs sm:text-sm md:text-base text-slate-900 dark:text-white truncate">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{by}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${status === 'done'
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                : status === 'progress'
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-600'
                }`}>
                {status === 'done' ? '✓ Done' : status === 'progress' ? 'In Progress' : 'Planned'}
              </span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── CONTACT ─────────────────────────────────────────────────────────────────

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const form = e.target;
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success'); form.reset(); setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error'); setErrorMsg(data.error || 'Something went wrong.'); setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error'); setErrorMsg('Could not reach server. Please try again.'); setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16 xl:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader num="07 / Contact" title="Let's" highlight="Connect" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Info */}
          <Reveal>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              I'm currently open to new opportunities. Whether you have a project in mind,
              want to collaborate, or just want to say hi — my inbox is always open!
            </p>
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: '✉', label: 'Email', value: 'asbaq0@gmail.com', href: 'mailto:asbaq0@gmail.com' },
                { icon: '📞', label: 'Phone', value: '+91 76187 64731', href: 'tel:+917618764731' },
                { icon: '📍', label: 'Location', value: 'Bangalore, India', href: null },
              ].map(({ icon, label, value, href }) => (
                <motion.a key={label} href={href || undefined} whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`flex items-center gap-4 p-4 sm:p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl
                             border border-slate-200/60 dark:border-slate-700/60 transition-colors duration-200
                             ${href ? 'hover:border-emerald-400/60 dark:hover:border-emerald-500/60 cursor-pointer' : ''}`}>
                  <span className="text-xl sm:text-2xl flex-shrink-0">{icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{label}</p>
                    <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white truncate">{value}</p>
                  </div>
                </motion.a>
              ))}

              <div className="flex gap-2 sm:gap-3 pt-2 flex-wrap">
                {[
                  {
                    href: 'https://linkedin.com/in/asbaq', label: 'LinkedIn',
                    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  },
                  {
                    href: 'https://github.com/ashfaq9', label: 'GitHub',
                    icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.176 2.873.171 3.177.768.84 1.236 1.911 1.236 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  },
                  {
                    href: 'https://instagram.com/ashfaq_muhmd', label: 'Instagram',
                    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  },
                  {
                    href: 'https://wa.me/917618764731',
                    label: 'WhatsApp',
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.04 2C6.55 2 2.08 6.47 2.08 11.96c0 1.92.5 3.73 1.46 5.32L2 22l4.89-1.28c1.51.83 3.22 1.27 4.99 1.27h.01c5.49 0 9.96-4.47 9.96-9.96S17.53 2 12.04 2zm0 18.17c-1.53 0-3.02-.41-4.32-1.19l-.31-.18-2.9.76.77-2.83-.2-.33a7.93 7.93 0 0 1-1.21-4.24c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8.01-8 8.01zm4.39-6.02c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.43-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.01.39 1.36.5.57.18 1.09.15 1.5.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                      </svg>
                    )
                  },

                ].map(({ href, label, icon }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm
                               border border-slate-200/60 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900
                               text-slate-700 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-500
                               hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20
                               transition-all duration-200">
                    {icon} {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Your Name', type: 'text', placeholder: 'John Doe', fieldName: 'name' },
                  { label: 'Your Email', type: 'email', placeholder: 'john@example.com', fieldName: 'email' },
                ].map(({ label, type, placeholder, fieldName }) => (
                  <div key={label} className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</label>
                    <input type={type} name={fieldName} placeholder={placeholder} required
                      className="px-3 sm:px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900
                                 border border-slate-200/60 dark:border-slate-700/60
                                 text-slate-900 dark:text-white placeholder-slate-400 text-sm
                                 focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 transition-colors duration-200" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Subject</label>
                <input type="text" name="subject" placeholder="What's it about?" required
                  className="px-3 sm:px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900
                             border border-slate-200/60 dark:border-slate-700/60
                             text-slate-900 dark:text-white placeholder-slate-400 text-sm
                             focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 transition-colors duration-200" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Message</label>
                <textarea rows={5} name="message" placeholder="Your message here..." required
                  className="px-3 sm:px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900
                             border border-slate-200/60 dark:border-slate-700/60
                             text-slate-900 dark:text-white placeholder-slate-400 text-sm
                             focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 transition-colors duration-200 resize-none" />
              </div>
              <motion.button type="submit" disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.02, y: -3 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
                className={`relative w-full overflow-hidden px-8 py-4 rounded-xl font-black text-sm sm:text-base
                           text-white shadow-xl transition-all duration-300 border border-white/20
                           ${status === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/25'
                    : status === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-500 shadow-red-500/25'
                      : status === 'loading' ? 'bg-gradient-to-r from-slate-500 to-slate-600 cursor-not-allowed opacity-80'
                        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-emerald-500 dark:via-blue-500 dark:to-purple-600 shadow-blue-500/25 hover:shadow-2xl'}`}>
                <AnimatePresence mode="wait">
                  {status === 'loading' && (
                    <motion.span key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-3">
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Message Sent! Check your inbox ✓
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2">
                      ✕ {errorMsg || 'Failed to send'}
                    </motion.span>
                  )}
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2">
                      Send Message →
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 py-6 sm:py-8 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} <span className="font-bold text-slate-700 dark:text-slate-200">Mahammad Hasbak</span>. All rights reserved.
      </p>
      {/* <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <span>Built with</span><span className="text-red-500">♥</span><span>using React + Framer Motion</span>
      </div> */}
    </div>
  </footer>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────

const Portfolio = () => {
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 min-h-screen">
        <Navbar dark={dark} setDark={setDark} />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;