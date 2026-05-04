/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, Loader2, ScanFace } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  Terminal,
  Network,
  Activity,
  Briefcase,
  GraduationCap,
  FlaskConical,
  Check,
  ArrowRight,
  ArrowDown,
  Users,
  ChartLine,
  Clock,
  ShieldCheck,
  Telescope,
  Binary,
  Sparkles,
  Eye,
  Focus,
  Target,
  Orbit,
  Fingerprint,
  View,
  Rocket,
  Search,
  Calendar,
  Smile,
  Brain,
  Bot,
  BarChart3,
  X,
  Menu,
  Github,
  Twitter,
  Disc,
  Cpu,
  Zap,
  Hexagon
} from 'lucide-react';

// --- Components ---

const FloatingIcon = ({ icon: Icon, color, x, y, rotate, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, rotate }}
    animate={{
      opacity: 1,
      scale: 1,
      y: [0, -20, 0],
      rotate: [rotate, rotate + 5, rotate - 5, rotate]
    }}
    transition={{
      opacity: { duration: 0.5, delay },
      scale: { duration: 0.5, delay },
      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay }
    }}
    style={{ left: x, top: y }}
    className="absolute hidden lg:flex w-24 h-24 glass-card rounded-3xl items-center justify-center shadow-2xl z-10 border-white/40"
  >
    <div className="w-12 h-12 flex items-center justify-center">
      <Icon className="w-full h-full" style={{ color }} strokeWidth={2.5} />
    </div>
  </motion.div>
);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button') ||
        target.closest('a') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.classList.contains('cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-[#8b5cf6]/30 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(139,92,246,0.6)' : 'rgba(139,92,246,0.3)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#8b5cf6] rounded-full pointer-events-none z-[9999] shadow-[0_0_15px_#8b5cf6] hidden md:block"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.2 }}
      />
    </>
  );
};

const LoadingScreen = () => (
  <div className="fixed inset-0 z-[99999] bg-white flex items-center justify-center">
    <div className="flex flex-col items-center gap-12">
      <div className="relative w-32 h-32">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-8 border-[#8b5cf6]/10 border-t-[#8b5cf6] rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[18px] border-6 border-[#8b5cf6]/10 border-t-[#a78bfa] rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="w-16 h-16 flex items-center justify-center"
  >
    <img src="/logo.png" alt="Loading..." className="w-full h-full object-contain" />
  </motion.div>
</div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-[13px] font-black tracking-[0.3em] text-[#8b5cf6] uppercase">JAZARI</div>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full"
              />
            ))}
          </div>
        </div>
        <p className="text-[10px] font-bold text-[#8b5cf6]/60 tracking-[0.2em] uppercase">Curating your workspace...</p>
      </div>
    </div>
  </div>
);

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-black/5' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <div onClick={() => setActiveTab('home')} className="flex items-center gap-2 cursor-pointer group">
          <img
    src="/logo.png" 
    alt="JAZARI Logo"
    className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
  />
        </div>

        <nav className="hidden md:flex items-center gap-x-10 text-sm font-medium">
          {['home', 'plugins', 'installation'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`uppercase tracking-widest text-[11px] font-bold transition-colors ${activeTab === tab ? 'text-[#8b5cf6]' : 'text-[#09090b] hover:text-[#8b5cf6]'}`}
            >
              {tab}
            </button>
          ))}

          <button className="px-6 py-2.5 rounded-full bg-white border border-black/10 text-sm font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-2 active:scale-95">
            <a
              href="https://github.com/muhammad-asad-014/JAZARI/releases/download/v1.0.0/jazari-v1.1.tar.gz"
              download="jazari-v1.0.tar.gz"
            >
              Download Now
            </a>
            <ArrowDown className="w-4 h-4" />
          </button>
        </nav>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#09090b]">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b shadow-xl py-8 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-lg font-semibold">
              {['home', 'plugins', 'installation'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                  className="text-left capitalize"
                >
                  {tab}
                </button>
              ))}
              {/* === FIXED DOWNLOAD BUTTON === */}
<a
  href="https://github.com/muhammad-asad-014/JAZARI/releases/download/v1.0.0/jazari-v1.1.tar.gz"
  download="jazari-v1.0.tar.gz"
  className="mt-4 w-full py-4 bg-[#8b5cf6] text-white rounded-2xl font-bold inline-flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
>
  Download Now
</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
    {/* Floating Icons */}
    <FloatingIcon icon={Cpu} color="#3b82f6" x="8%" y="15%" rotate={-12} delay={0.2} />
    <FloatingIcon icon={Zap} color="#f97316" x="88%" y="12%" rotate={15} delay={0.4} />
    <FloatingIcon icon={Github} color="#09090b" x="12%" y="32%" rotate={10} delay={0.6} />
    <FloatingIcon icon={Hexagon} color="#8b5cf6" x="85%" y="35%" rotate={-15} delay={0.8} />

    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-bold mb-8 shadow-sm"
        >
          {/* <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <img 
                key={i} 
                src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                className="w-5 h-5 rounded-full border-2 border-white object-cover" 
                alt="User"
                referrerPolicy="no-referrer"
              />
            ))}
          </div> */}
          <span>Open Source & Secure</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter max-w-4xl"
        >
          Build Once.<br />Expand <span className="text-[#8b5cf6]">Forever.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-[#71717a] max-w-2xl mx-auto font-medium"
        >
          One flexible platform. Unlimited plugins. Turn any idea into a powerful AI-powered tool — without writing new code every time.
        </motion.p>

        {/* === HERO CTA + 3D DASHBOARD IMAGE === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4 w-full max-w-md mx-auto"
        >
          {/* DOWNLOAD BUTTON - now actually downloads the file */}
          <a
            href="https://github.com/muhammad-asad-014/JAZARI/releases/download/v1.0.0/jazari-v1.1.tar.gz"
            download="jazari-v1.0.tar.gz"
            className="w-full py-5 bg-[#2563eb] text-white rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            Download Now
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-20 relative max-w-6xl mx-auto group"
          style={{ perspective: 1400 }}
        >
          <div className="absolute -inset-10 bg-[#8b5cf6]/10 blur-3xl rounded-[4rem] opacity-30 group-hover:opacity-50 transition-opacity"></div>

          <motion.div
            initial={{
              rotateX: 66,
              scale: 1.3,
              boxShadow: "0 10px 25px -10px rgb(139 92 246 / 0.15)"
            }}
            whileInView={{
              rotateX: 0,
              scale: 1,
              boxShadow: "0 40px 70px -20px rgb(139 92 246 / 0.35)"
            }}
            transition={{
              duration: 1.1,
              ease: "easeOut"
            }}
            viewport={{ once: false, amount: 0.6 }}
            className="glass-card p-1 md:p-1 rounded-[1.5rem] shadow-xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="rounded-[1rem] overflow-hidden border border-black/5 bg-gray-100">
              <img
                src="/static/images/jazari-dashboard.png"
                alt="JAZARI Dashboard"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>

    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/5 blur-[150px] rounded-full animate-pulse-slow -z-10"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b5cf6]/5 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
  </section>
);

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[#8b5cf6] text-[11px] font-bold tracking-widest mb-2">ARCHITECTURE</div>
            <h2 className="text-5xl font-bold tracking-tighter leading-none">The Core of Your<br />Digital Workspace</h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md text-[#71717a] text-lg font-medium"
          >
            A modular ecosystem built for high-performance data curation and real-time collaboration.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: Terminal, title: "Native Python", desc: "Deploy complex algorithms directly into your workflow with our integrated Python runtime environment." },
            { icon: Network, title: "Flask Microservices", desc: "Modular by design. Our Flask-based architecture allows for rapid expansion and plugin development." },
            { icon: Activity, title: "Kinetic Data Streams", desc: "Live updates without refresh. Data flows through your UI like a living entity, always current." }
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass-card p-10 rounded-[2rem] hover:border-[#8b5cf6]/30 cursor-pointer glow-effect group"
            >
              <div className="w-14 h-14 bg-[#8b5cf6]/10 rounded-2xl flex items-center justify-center text-[#8b5cf6] mb-8 group-hover:scale-110 transition-transform">
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-[#71717a] font-medium leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 md:py-32 bg-white/60">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="text-[#8b5cf6] text-[11px] font-bold tracking-widest mb-4">VERSATILITY</div>
            <h2 className="text-5xl font-bold tracking-tighter leading-none">One System,<br />Infinite <span className="text-[#8b5cf6]">Environments</span></h2>
            <p className="mt-6 text-lg text-[#71717a] font-medium">Switch contexts seamlessly. JAZARI reconfigures its UI tokens and data views based on your current operational mode.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              {['Adaptive UI', 'Context Aware', 'Mode Switching'].map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded-full text-xs font-bold">{tag}</span>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[2rem] hover:border-[#8b5cf6]/30 glow-effect"
            >
              <div className="flex justify-between">
                <div className="w-12 h-12 bg-[#8b5cf6]/10 rounded-2xl flex items-center justify-center text-[#8b5cf6]"><Briefcase /></div>
                <span className="text-[10px] font-bold px-4 py-5 bg-black/5 rounded-full uppercase tracking-widest">Office Mode</span>
              </div>
              <h4 className="text-2xl font-bold mt-12">Enterprise Resource</h4>
              <p className="text-[#71717a] mt-3 font-medium">Focus on throughput, collaboration, and high-level KPI tracking with minimalist density.</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#8b5cf6] text-white p-8 rounded-[2rem] glow-effect shadow-xl shadow-[#8b5cf6]/20"
            >
              <div className="flex justify-between">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><GraduationCap /></div>
                <span className="text-[10px] font-bold px-4 py-5 bg-white/20 rounded-full uppercase tracking-widest">School Mode</span>
              </div>
              <h4 className="text-2xl font-bold mt-12">Educational Core</h4>
              <p className="opacity-80 mt-3 font-medium">Prioritize learning paths, student engagement metrics, and resource distribution.</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 glass-card p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 glow-effect"
            >
              <div className="flex-1">
                <div className="w-12 h-12 bg-[#8b5cf6]/10 rounded-2xl flex items-center justify-center text-[#8b5cf6]"><FlaskConical /></div>
                <h4 className="text-2xl font-bold mt-8">Laboratory Precision</h4>
                <p className="text-[#71717a] mt-3 font-medium">Unleash high-density data visualization, sensor logging, and automated experiment control.</p>
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden border border-black/10 bg-gray-50">
                <img
                  src="https://picsum.photos/seed/lab/800/600"
                  alt="Lab"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Plugins = () => {
  const [search, setSearch] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');

  const showAlert = (type, message) => {
    setStatus({ show: true, type, message });
    // Auto-hide after 4 seconds
    setTimeout(() => setStatus({ show: false, type: '', message: '' }), 4000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.target);
    // Replace with your Formspree ID
    const FORMSPREE_ID = "YOUR_ID_HERE"; 

    try {
      const response = await fetch(`https://formspree.io/f/xykbbdnz`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showAlert('success', 'Request sent! We’ll be in touch soon.');
        e.target.reset();
      } else {
        showAlert('error', 'Something went wrong. Try again?');
      }
    } catch (err) {
      showAlert('error', 'Network error. Please check your connection.');
    } finally {
      setIsSending(false);
    }
  };
  
  const plugins = [
    {
      icon: Calendar,
      title: "AERO 1.0.1",
      desc: "Automated Enrollment & Records Organizer. Streamlined check-ins with advanced analytics.",
      downloadUrl: "/static/files/AERO_1.0.1.zip"
    },
    {
      icon: ScanFace,
      title: "AERO 2.0.1",
      desc: "Facial recognition and predictive patterns to automate presence verification.",
      downloadUrl: "/static/files/AERO_2.0.1.zip"
    },
    {
      icon: Sparkles,
      title: "ZENITH 1.0.1",
      desc: "Dynamic question generation based on user performance and knowledge gaps.",
      downloadUrl: "/static/files/ZENITH_1.0.1.zip"
    },
    {
      icon: Bot,
      title: "JAZ 1.0.1",
      desc: "An intelligent assistant trained on your specific documentation to provide instant support.",
      wide: true,
      downloadUrl: "/static/files/JAZ_1.0.1.zip"
    },
    {
      icon: BarChart3,
      title: "IKARIS 1.0.1",
      desc: "Deeper insights and custom data visualization dashboards for every metric.",
      downloadUrl: "/static/files/IKARIS_1.0.1.zip"
    },
    {
      icon: View,
      title: "ROBERTA 1.0.1",
      desc: "Deeper insights and custom data visualization dashboards for every metric.",
      downloadUrl: "/static/files/ROBERTA_1.0.1.zip"
    }
  ];

  const handleDownload = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const filtered = plugins.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="py-24 md:py-32">
      <AnimatePresence>
        {status.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 bg-white border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl backdrop-blur-xl"
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="text-green-500 w-6 h-6" />
            ) : (
              <XCircle className="text-red-500 w-6 h-6" />
            )}
            <p className="font-bold text-sm tracking-tight text-[#18181b]">{status.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <div className="text-[#8b5cf6] text-[11px] font-bold tracking-widest mb-2">ECOSYSTEM</div>
            <h2 className="text-5xl font-bold tracking-tighter">Plugin Marketplace</h2>
          </div>

          <div className="relative w-full md:w-80 mt-8 md:mt-0">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#71717a] w-5 h-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search plugins..."
              className="w-full bg-white border border-black/10 rounded-2xl py-4 pl-14 pr-6 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/10 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`glass-card p-10 rounded-[2rem] glow-effect ${p.wide ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-[#8b5cf6]/10 rounded-2xl flex items-center justify-center text-[#8b5cf6]">
                  <p.icon className="w-8 h-8" />
                </div>
                <button onClick={() => handleDownload(p.downloadUrl, `${p.title}.zip`)}
                  className="px-6 py-2 rounded-full border text-[11px] font-bold hover:bg-[#8b5cf6] hover:text-white transition-all active:scale-95"
                >
                  INSTALL
                </button>              </div>
              <h4 className="font-bold text-2xl">{p.title}</h4>
              <p className="text-[#71717a] mt-4 font-medium leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Request Plugin Section */}
        <div className="mt-24 glass-card rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden border border-black/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8b5cf6]/5 to-transparent -z-10" />
          
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold tracking-tighter mb-6 text-balance">Can't find a specific tool?</h2>
            <p className="text-[#71717a] text-lg font-medium mb-10">Our developers can build a custom bridge for your specific workflow. Just drop the details below.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="Plugin" type="text" placeholder="Plugin Name" className="w-full px-6 py-5 bg-white/50 border border-black/10 rounded-2xl outline-none focus:border-[#8b5cf6] transition-all" required />
                <input name="Email" type="email" placeholder="Email Address" className="w-full px-6 py-5 bg-white/50 border border-black/10 rounded-2xl outline-none focus:border-[#8b5cf6] transition-all" required />
              </div>
              <textarea name="Message" placeholder="Tell us what the plugin should do..." rows={4} className="w-full px-6 py-5 bg-white/50 border border-black/10 rounded-2xl outline-none focus:border-[#8b5cf6] transition-all" required />
              
              <button 
                type="submit" 
                disabled={isSending}
                className="group flex items-center gap-3 px-10 py-5 bg-[#18181b] text-white rounded-2xl text-lg font-bold hover:bg-[#8b5cf6] transition-all disabled:opacity-50"
              >
                {isSending ? <Loader2 className="animate-spin w-5 h-5" /> : null}
                {isSending ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Installation = () => {
  const dockerCompose = `version: '3.8'

services:
  jazari:
    image: jazari:latest
    container_name: jazari-app
    ports:
      - "5000:5000"
    volumes:
      - ./instance:/app/instance
      - ./plugins:/app/core/plugins
    restart: unless-stopped
    environment:
      - FLASK_ENV=production`;

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <div className="text-[#8b5cf6] text-[11px] font-bold tracking-widest mb-4">DEPLOYMENT</div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">How to Install JAZARI<br /><span className="text-[#8b5cf6]">(Docker Version)</span></h1>
          <p className="mt-8 text-xl text-[#71717a] font-medium">No coding required. You only need to download the Docker image and run 4–5 simple commands.</p>
        </div>

        <div className="space-y-24">
          {/* What You Will Get */}
          <div className="glass-card rounded-[2.5rem] p-10 md:p-16">
            <h2 className="text-3xl font-bold mb-8">What You Will Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Complete System", desc: "A ready-to-use JAZARI system (Flask + all plugins support)" },
                { title: "Local Copy", desc: "Your own local copy that runs on your computer or server" },
                { title: "Plugin Support", desc: "Full plugin support (upload or drop new plugins anytime)" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6]"><Check className="w-5 h-5" /></div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-sm text-[#71717a] font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-6xl font-black text-[#8b5cf6]/10">01</div>
              <h3 className="text-2xl font-bold mt-2">Install Docker</h3>
              <p className="text-[#71717a] mt-4 font-medium">One-time setup for your operating system.</p>
            </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-[#71717a] font-medium">Go to the official Docker website: <a href="https://www.docker.com/products/docker-desktop/" target="_blank" className="text-[#8b5cf6] underline">docker.com/products/docker-desktop</a></p>
              <p className="text-[#71717a] font-medium">Download and install Docker Desktop for your operating system (Windows, macOS, or Linux). After installation, open Docker Desktop and make sure it is running (you should see the Docker whale icon in your taskbar/system tray).</p>
              <div className="p-6 bg-black/5 rounded-2xl border border-black/5">
                <p className="text-sm font-bold mb-2">OS SPECIFIC:</p>
                <ul className="text-sm text-[#71717a] space-y-2 font-medium">
                  <li>• Windows / macOS: Just use the graphical installer.</li>
                  <li>• Linux: Follow the official guide for your distribution.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-6xl font-black text-[#8b5cf6]/10">02</div>
              <h3 className="text-2xl font-bold mt-2">Download Files</h3>
              <p className="text-[#71717a] mt-4 font-medium">Get the core image and your plugins.</p>
            </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-[#71717a] font-medium">Download these two things from our website:</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 p-4 bg-white border border-black/10 rounded-2xl">
                  <div className="w-8 h-8 bg-[#8b5cf6]/10 rounded-lg flex items-center justify-center text-[#8b5cf6]"><Briefcase className="w-4 h-4" /></div>
                  <span className="font-bold">jazari-v1.0.tar.gz</span>
                  <span className="text-xs text-[#71717a] ml-auto">Main Application</span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-white border border-black/10 rounded-2xl">
                  <div className="w-8 h-8 bg-[#8b5cf6]/10 rounded-lg flex items-center justify-center text-[#8b5cf6]"><Hexagon className="w-4 h-4" /></div>
                  <span className="font-bold">Plugin .zip files</span>
                  <span className="text-xs text-[#71717a] ml-auto">Optional Add-ons</span>
                </li>
              </ul>
              <div className="p-6 bg-[#8b5cf6]/5 rounded-2xl border border-[#8b5cf6]/10">
                <p className="text-sm font-bold text-[#8b5cf6] mb-2">PRO TIP:</p>
                <p className="text-sm text-[#71717a] font-medium">Create a new empty folder on your computer and name it <span className="font-bold text-[#09090b]">Jazari</span> (e.g., C:\Jazari or ~/Jazari). Put all downloaded files inside this folder.</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-6xl font-black text-[#8b5cf6]/10">03</div>
              <h3 className="text-2xl font-bold mt-2">Create Folders</h3>
              <p className="text-[#71717a] mt-4 font-medium">Set up the internal structure.</p>
            </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-[#71717a] font-medium">Inside your Jazari folder, create two empty folders:</p>
              <div className="flex gap-4">
                <div className="flex-1 p-4 bg-white border border-black/10 rounded-2xl text-center font-bold">instance</div>
                <div className="flex-1 p-4 bg-white border border-black/10 rounded-2xl text-center font-bold">plugins</div>
              </div>
              <div className="bg-[#09090b] p-6 rounded-2xl text-white font-mono text-sm leading-relaxed">
                <div className="text-white/40 mb-2"># Your folder structure should look like this:</div>
                <div>Jazari/</div>
                <div>├── jazari-v1.0.tar.gz</div>
                <div>├── instance/ <span className="text-white/40">← empty folder</span></div>
                <div>└── plugins/ <span className="text-white/40">← empty folder</span></div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-6xl font-black text-[#8b5cf6]/10">04</div>
              <h3 className="text-2xl font-bold mt-2">Docker Compose</h3>
              <p className="text-[#71717a] mt-4 font-medium">Configure the orchestration.</p>
            </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-[#71717a] font-medium">Create a new file named <span className="font-bold text-[#09090b]">docker-compose.yml</span> and paste the following content inside it:</p>
              <div className="bg-[#09090b] p-6 rounded-2xl text-[#ffff] font-mono text-xs leading-relaxed overflow-x-auto">
                <pre>{dockerCompose}</pre>
              </div>
            </div>
          </div>

          {/* Step 5 & 6 */}
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-6xl font-black text-[#8b5cf6]/10">05</div>
              <h3 className="text-2xl font-bold mt-2">Load & Start</h3>
              <p className="text-[#71717a] mt-4 font-medium">Bring JAZARI to life.</p>
            </div>
            <div className="md:w-2/3 space-y-8">
              <div>
                <p className="text-sm font-bold mb-4 uppercase tracking-widest text-[#8b5cf6]">1. Load the Image</p>
                <div className="bg-[#09090b] p-6 rounded-2xl text-white font-mono text-sm mb-4">
                  <div className="text-white mb-2">$ docker load -i jazari-v1.0.tar.gz</div>
                </div>
                <p className="text-xs text-[#71717a] font-medium">This may take 2–5 minutes depending on your computer.</p>
              </div>

              <div>
                <p className="text-sm font-bold mb-4 uppercase tracking-widest text-[#8b5cf6]">2. Start JAZARI</p>
                <div className="bg-[#09090b] p-6 rounded-2xl text-white font-mono text-sm mb-4">
                  <div className="text-white mb-2">$ docker compose up -d</div>
                </div>
                <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0"><Check /></div>
                  <div>
                    <p className="font-bold text-green-900">That's it!</p>
                    <p className="text-sm text-green-700">Open your browser and go to: <a href="http://localhost:5000" className="underline font-bold">http://localhost:5000</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-[2rem]">
              <h4 className="text-xl font-bold mb-4">How to Add Plugins</h4>
              <ol className="text-sm text-[#71717a] space-y-3 font-medium list-decimal pl-4">
                <li>Download any plugin .zip file.</li>
                <li>Copy the .zip file into the <span className="font-bold text-[#09090b]">plugins</span> folder.</li>
                <li>Go to JAZARI web interface → Plugin Manager → Refresh.</li>
              </ol>
              <p className="mt-4 text-xs font-bold text-[#8b5cf6]">Tip: You can also upload directly from the web interface.</p>
            </div>

            <div className="glass-card p-8 rounded-[2rem]">
              <h4 className="text-xl font-bold mb-4">Stop or Restart</h4>
              <div className="bg-[#09090b] p-4 rounded-xl text-white font-mono text-xs space-y-2">
                <div className="text-white/40"># Stop the app</div>
                <div>docker compose down</div>
                <div className="text-white/40 mt-4"># Restart the app</div>
                <div>docker compose up -d</div>
              </div>
            </div>

            <div className="md:col-span-2 glass-card p-8 rounded-[2rem] border-[#8b5cf6]/20">
              <h4 className="text-xl font-bold mb-4">How to Update Later</h4>
              <p className="text-sm text-[#71717a] font-medium mb-4">When we release a new version, download the new <span className="font-bold text-[#09090b]">jazari-vX.X.tar.gz</span> and run:</p>
              <div className="bg-[#09090b] p-4 rounded-xl text-white font-mono text-xs space-y-1">
                <div>docker compose down</div>
                <div>docker load -i jazari-vX.X.tar.gz</div>
                <div>docker compose up -d</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="text-3xl font-bold tracking-tighter text-[#8b5cf6]">JAZARI</div>
          <p className="text-[#71717a] mt-6 max-w-xs font-medium">The kinetic curator for modern teams. Architecting the future of operational intelligence.</p>
          <div className="flex gap-6 mt-10 text-[#71717a]">
            <Twitter className="w-6 h-6 cursor-pointer hover:text-[#8b5cf6] transition-colors" />
            <Github className="w-6 h-6 cursor-pointer hover:text-[#8b5cf6] transition-colors" />
            <Disc className="w-6 h-6 cursor-pointer hover:text-[#8b5cf6] transition-colors" />
          </div>
        </div>

        <div>
          <h5 className="font-bold text-[#8b5cf6] text-[11px] tracking-widest uppercase">PLATFORM</h5>
          <ul className="mt-6 space-y-4 text-[#71717a] font-medium text-sm">
            <li className="hover:text-[#8b5cf6] cursor-pointer transition-colors">Features</li>
            <li className="hover:text-[#8b5cf6] cursor-pointer transition-colors">Plugins</li>
            <li className="hover:text-[#8b5cf6] cursor-pointer transition-colors">Security</li>
            <li className="hover:text-[#8b5cf6] cursor-pointer transition-colors">Enterprise</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-[#8b5cf6] text-[11px] tracking-widest uppercase">COMPANY</h5>
          <ul className="mt-6 space-y-4 text-[#71717a] font-medium text-sm">
            <li className="hover:text-[#8b5cf6] cursor-pointer transition-colors">About</li>
            <li className="hover:text-[#8b5cf6] cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-[#8b5cf6] cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-[#8b5cf6] cursor-pointer transition-colors">Legal</li>
          </ul>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t text-[10px] font-bold tracking-widest flex flex-col md:flex-row justify-between text-[#71717a]/60 uppercase">
        <p>© 2026 JAZARI. All rights reserved. </p>
        <div className="flex gap-8 mt-6 md:mt-0">
          <span className="" >Developed BY</span>
          <a
            href="https://muhammad-asad.netlify.app/"
            className="hover:text-[#8b5cf6] cursor-pointer"
          >
            Asad Muhammad Naeem
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen selection:bg-[#8b5cf6]/20 selection:text-[#8b5cf6]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#8b5cf6] z-[100] origin-left"
        style={{ scaleX }}
      />
      <CustomCursor />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <Features />
              <BentoGrid />

              <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <div className="glass-card rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-[#8b5cf6]/5 to-transparent -z-10"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className="text-[#8b5cf6] text-[11px] font-bold tracking-widest mb-2">MANAGEMENT</div>
                        <h2 className="text-5xl font-bold tracking-tighter leading-none mt-2">Classroom <span className="text-[#8b5cf6]">Manager</span></h2>
                        <p className="mt-6 text-lg text-[#71717a] font-medium">The ultimate tool for modern educators. Manage active sessions, monitor student progress, and deploy interactive assets with a single click.</p>

                        <ul className="mt-12 space-y-6">
                          {[
                            "Live Attendance & Engagement Tracking",
                            "Real-time Feedback Polling",
                            "Automated Grading Integration"
                          ].map((item, i) => (
                            <li key={i} className="flex gap-4 items-center">
                              <div className="w-8 h-8 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center flex-shrink-0 text-[#8b5cf6]"><Check className="w-4 h-4" /></div>
                              <span className="text-lg font-bold">{item}</span>
                            </li>
                          ))}
                        </ul>

                        <button className="mt-10 flex items-center gap-3 text-lg font-bold px-10 py-5 bg-[#8b5cf6] text-white rounded-2xl shadow-xl shadow-[#8b5cf6]/20 hover:scale-105 transition-transform active:scale-95">
                          Explore Classroom Tools
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {[
                          { icon: Users, val: "24", label: "Active Students" },
                          { icon: ChartLine, val: "92%", label: "Session Score" },
                          { icon: Clock, val: "14m", label: "Focus Duration" },
                          { icon: Rocket, val: "LIVE", label: "Broadcasting", primary: true }
                        ].map((stat, i) => (
                          <div key={i} className={`p-8 rounded-[2rem] text-center ${stat.primary ? 'bg-[#8b5cf6] text-white' : 'glass-card'}`}>
                            <stat.icon className={`w-10 h-10 mx-auto mb-6 ${stat.primary ? 'text-white' : 'text-[#8b5cf6]'}`} />
                            <div className="text-4xl font-bold">{stat.val}</div>
                            <div className={`text-[10px] uppercase tracking-widest mt-2 font-bold ${stat.primary ? 'opacity-70' : 'text-[#71717a]'}`}>{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="py-24 md:py-32">
                <div className="max-w-5xl mx-auto px-6">
                  <div className="glass-card rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-[#8b5cf6]/5 to-transparent"></div>
                    <div className="relative">
                      <div className="text-[#8b5cf6] text-[11px] font-bold tracking-widest">JOIN THE FUTURE</div>
                      <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mt-6 max-w-2xl mx-auto">Ready to curate your kinetic workspace?</h2>
                      <p className="text-[#71717a] text-xl mt-8 max-w-xl mx-auto font-medium">Join other developers to transform your operational efficiency with JAZARI.</p>

                      <div className="mt-12 max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                        <input type="email" placeholder="your@work.email"
                          className="flex-1 px-10 py-1 bg-white border border-black/10 rounded-2xl text-lg placeholder:text-[#71717a]/40 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/10 transition-all" />
                        <button className="px-10 py-5 bg-[#8b5cf6] text-white rounded-2xl text-small font-bold shadow-lg shadow-[#8b5cf6]/20 hover:scale-105 transition-transform active:scale-95">Subscribe</button>
                      </div>

                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'plugins' && (
            <motion.div
              key="plugins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Plugins />
            </motion.div>
          )}

          {activeTab === 'installation' && (
            <motion.div
              key="installation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Installation />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
