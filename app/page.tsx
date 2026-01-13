'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Link as LinkIcon,
  ArrowRight,
  Play,
  Minus,
  X,
  ArrowUpRight,
  Blocks,
  FileCheck,
  ArrowLeftRight,
  Leaf,
  ChevronRight
} from "lucide-react";

// --- Icons & Graphics Components ---

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-white select-none cursor-pointer">
    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]">
      <LinkIcon className="w-4 h-4" />
    </div>
    <span>VERDICT</span>
  </div>
);



// Hero Illustration using provided image
const FloatingTokens = () => (
  <div
    className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center z-20 pointer-events-none"
  >
    {/* Token Image */}
    <img
      src="/Generated_Image_January_13__2026_-_3_21PM-removebg-preview.png"
      alt="Crypto tokens illustration"
      className="w-[320px] md:w-[450px] lg:w-[600px] xl:w-[650px] h-auto object-contain animate-float-slow drop-shadow-[0_30px_80px_rgba(16,185,129,0.6)]"
    />
  </div>
);

// --- Main Layout Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: isOpen ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0)",
        backdropFilter: isOpen ? "blur(24px)" : "blur(0px)",
      }}
      transition={{
        y: { duration: 0.5, ease: "easeOut" },
        opacity: { duration: 0.5 },
        backgroundColor: { duration: 0.3 },
        backdropFilter: { duration: 0.3 }
      }}
      className={`fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 py-4 md:py-5 mx-auto w-full z-[100] ${!isOpen ? 'lg:bg-transparent lg:backdrop-blur-none lg:border-none border-b border-white/5 bg-black/50 backdrop-blur-xl' : 'border-b border-white/10'}`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-[110]">
        <Logo />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/5">
          {[
            { name: 'Home', href: '#' },
            { name: 'Features', href: '#features' },
            { name: 'Numbers', href: '#numbers' },
            { name: 'Docs', href: '#' }
          ].map((item, i) => (
            <a key={item.name} href={item.href} className="relative px-6 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-white transition-colors group">
              {item.name}
              {i === 0 && (
                <>
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="absolute inset-0 bg-white/5 rounded-full -z-10" />
                </>
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/10 hover:text-white text-white hover:border-white/40 bg-transparent">
            Launch App
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <ChevronRight className="w-6 h-6 rotate-90" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-black/50 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 md:hidden z-[100]"
        >
          {[
            { name: 'Home', href: '#' },
            { name: 'Features', href: '#features' },
            { name: 'Numbers', href: '#numbers' },
            { name: 'Docs', href: '#' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <Button className="w-full mt-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12">
            Launch App
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
};

const Hero = () => (
  <section className="relative pt-24 pb-16 px-6 w-full min-h-screen flex flex-col overflow-hidden">

    {/* --- Falling Green/Cyan Spotlight Beam Effect - Proportioned --- */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="hidden lg:block"
    >
      {/* Blinding White Hard Core - Shortened & On Top */}
      <div className="absolute top-[-200px] left-[85%] md:left-[72%] -translate-x-1/2 w-[150px] h-[900px] bg-white blur-[25px] pointer-events-none z-0 opacity-90" />

      {/* White/Cyan Core Beam - Fits Screen */}
      <div className="absolute top-[-150px] left-[85%] md:left-[72%] -translate-x-1/2 w-[250px] h-[800px] bg-gradient-to-b from-white via-cyan-100/50 to-transparent blur-[40px] pointer-events-none z-0" />

      {/* Inner Green Glow */}
      <div className="absolute top-[-100px] left-[85%] md:left-[72%] -translate-x-1/2 w-[400px] h-[750px] bg-gradient-to-b from-emerald-300/50 via-green-400/30 to-transparent blur-[60px] pointer-events-none z-0 mix-blend-screen" />

      {/* Outer Green Spread */}
      <div className="absolute top-[-50px] left-[85%] md:left-[72%] -translate-x-1/2 w-[800px] h-[700px] bg-gradient-to-b from-green-400/20 via-emerald-600/10 to-transparent blur-[80px] pointer-events-none z-0" />

      {/* Wide Ambient Green Glow */}
      <div className="absolute top-0 left-[85%] md:left-[72%] -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
    </motion.div>

    {/* Subtle Text Glow for Mobile/Tablet */}
    <div className="lg:hidden absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

    {/* --- 3D Floor Grid --- */}
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }} // target opacity
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 mix-blend-screen"
        style={{
          background: `
                  linear-gradient(transparent 99%, rgba(255, 255, 255, 0.15) 99%),
                  linear-gradient(90deg, transparent 99%, rgba(255, 255, 255, 0.15) 99%)
              `,
          backgroundSize: '80px 80px',
          transform: 'perspective(1200px) rotateX(60deg) translateY(200px) scale(2)',
        }}
      />
    </div>

    <div className="grid lg:grid-cols-2 gap-12 lg:gap-4 items-center relative z-10 flex-1 max-w-7xl mx-auto w-full mt-10 lg:-mt-20">
      <div className="space-y-6 pt-4 px-4 lg:pl-2 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
            <span className="text-emerald-400 font-bold tracking-tighter text-lg">///</span>
            <span className="text-emerald-400/90 font-medium tracking-wide text-xs md:text-sm">Powered by Quantum Markets</span>
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[32px] md:text-5xl lg:text-6xl font-bold leading-[1.2] lg:leading-[1.1] tracking-tighter text-white"
        >
          Markets Choose <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
            Winning RWA Agents
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-light"
        >
          Trade AI proposals on real-world assets with unified liquidity & TWAP-based resolution.
        </motion.p>

        {/* --- Primary Button --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-4"
        >
          <Button size="lg" className="group relative rounded-full font-bold text-black overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.4)] text-lg h-14 px-10 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-300 hover:to-green-400 border-none transition-all hover:scale-105 active:scale-95">
            Explore Markets
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      <div className="relative h-fit lg:h-full flex items-center justify-center mt-8 lg:mt-0">
        {/* Secondary Shine behind Tokens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] lg:w-[500px] h-[250px] md:h-[400px] lg:h-[500px] bg-emerald-600/10 blur-[90px] rounded-full pointer-events-none"
        />
        <div className="w-full flex justify-center">
          <FloatingTokens />
        </div>
      </div>
    </div>

    {/* Hero Features Footer */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="relative lg:absolute bottom-0 left-0 right-0 z-20 w-full mb-8 mt-12 lg:mt-0"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-8 px-6 md:px-8 max-w-7xl mx-auto w-full">
        {[
          {
            title: 'Quantum Market Design',
            desc: 'Deploy capital across every proposal without fragmenting liquidity.',
            icon: Play
          },
          {
            title: 'AI Agent Proposals',
            desc: 'Agents compete as tradable candidates and earn the right to launch.',
            icon: Minus
          },
          {
            title: 'TWAP Winner Selection',
            desc: 'Rounds resolve by highest TWAP, not last-minute price spikes.',
            icon: X
          }
        ].map((f, i) => (
          <div key={i} className="flex flex-col items-start text-left gap-2 group max-w-sm mx-auto lg:mx-0 w-fit">
            <div className="flex items-center gap-3 mb-1">
              <div className="relative flex items-center justify-center bg-white rounded-full p-1 shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-shadow">
                <f.icon className="w-3 h-3 text-black fill-black" />
              </div>
              <h4 className="font-bold text-lg text-white tracking-tight group-hover:text-emerald-400 transition-colors">{f.title}</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed pl-9">{f.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

const FeatureCard = ({ title, desc, wide = false, illustration, index }: { title: string, desc: string, wide?: boolean, illustration?: React.ReactNode, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    className={`${wide ? 'md:col-span-2' : 'md:col-span-1'} h-full`}
  >
    <Card className="h-full bg-[#0a0f0b] border-white/5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 border flex flex-col">
      <div className={`flex flex-col h-full ${wide ? 'md:flex-row' : 'p-4'}`}>
        {/* Illustration Area */}
        <div className={`
          relative flex items-center justify-center overflow-hidden
          ${wide ? 'md:w-[60%] h-[240px] md:h-auto self-stretch' : 'w-full aspect-[16/9] rounded-2xl'}
        `}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-full h-full"
          >
            {illustration}
          </motion.div>
        </div>

        <div className={`flex flex-col justify-center flex-1 ${wide ? 'md:px-10 md:py-12 p-8' : 'px-3 pt-6 pb-2'}`}>
          <h3 className="text-2xl font-bold mb-4 text-white tracking-tight leading-tight">{title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed font-light mb-8">{desc}</p>

          {wide && (
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-emerald-500 text-sm font-semibold tracking-wide cursor-pointer hover:underline group/link w-fit"
            >
              Learn more
              <ArrowUpRight className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  </motion.div>
);

const FeaturesSection = () => (
  <section id="features" className="py-20 lg:py-32 px-6 max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-20 gap-8"
    >
      <div className="max-w-3xl">
        <span className="text-emerald-500 text-sm font-medium mb-4 block tracking-wider uppercase">WHY VERDICT?</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
          Redefining Markets: Scaling <br /> Futarchy with RWA Agents
        </h2>
      </div>
      <div className="lg:mb-4 w-full lg:w-auto">
        <p className="text-gray-400 text-base max-w-sm mb-8 text-left">
          Verdict bridges real-world assets with market-driven AI strategy selection.
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-fit">
          <Button className="bg-[#0f2819] hover:bg-[#143520] text-white h-14 px-8 rounded-2xl text-base font-semibold transition-colors flex items-center gap-2 border border-white/5 shadow-lg shadow-emerald-900/10">
            Launch a Proposal <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <FeatureCard
        index={0}
        title="Trading RWA Strategies as Markets"
        desc="Proposals compete on tokenized T-bills, commodities, and credit."
        illustration={
          <svg width="100%" height="100%" viewBox="0 0 240 100" fill="none">
            {/* Clean Chart Area */}
            <path d="M40 70 C 80 70, 100 20, 200 30" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M40 70 C 80 70, 100 20, 200 30" stroke="#10b981" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.1" />

            {/* Minimal Indicators */}
            <circle cx="200" cy="30" r="4" fill="#10b981" />
            <rect x="20" y="20" width="40" height="3" rx="1.5" fill="#ffffff10" />
            <rect x="20" y="28" width="20" height="3" rx="1.5" fill="#10b981" fillOpacity="0.3" />
          </svg>
        }
      />
      <FeatureCard
        index={1}
        title="Unified Liquidity, No Fragmentation"
        desc="Quantum Markets scale to thousands of proposals without thin order books."
        illustration={
          <svg width="100%" height="100%" viewBox="0 0 240 100" fill="none">
            {/* Simple Connectivity */}
            <circle cx="120" cy="50" r="25" stroke="#10b98120" strokeWidth="1" fill="none" />
            <circle cx="120" cy="50" r="8" fill="#10b981" />

            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const x = 120 + 45 * Math.cos((angle * Math.PI) / 180);
              const y = 50 + 45 * Math.sin((angle * Math.PI) / 180);
              return (
                <g key={angle}>
                  <line x1="120" y1="50" x2={x} y2={y} stroke="#10b98130" strokeWidth="1.5" />
                  <circle cx={x} cy={y} r="4" fill="#050a06" stroke="#10b98140" strokeWidth="1" />
                </g>
              );
            })}
          </svg>
        }
      />
      <FeatureCard
        index={2}
        title="Transparent Settlement, Real Payouts"
        desc="Winning YES settles at $1, losers to $0 — enforced by on-chain collateral."
        illustration={
          <svg width="100%" height="100%" viewBox="0 0 240 100" fill="none">
            {/* Center Focus Checkmark */}
            <rect x="70" y="25" width="100" height="50" rx="12" fill="#10b98105" stroke="#10b98120" strokeWidth="1" />
            <path d="M105 50 L115 60 L135 40" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

            {/* Abstract Data Lines */}
            <rect x="85" y="38" width="30" height="2" rx="1" fill="#ffffff05" />
            <rect x="85" y="60" width="40" height="2" rx="1" fill="#ffffff05" />
          </svg>
        }
      />
      <FeatureCard
        index={3}
        wide
        title="Capital-Weighted Decisions, Not Votes"
        desc="Markets decide the winner through prices — not governance theater."
        illustration={
          <svg width="100%" height="100%" viewBox="0 0 540 300" fill="none">
            {/* Balanced Split View */}
            <g transform="translate(60, 50)">
              {/* Winner Card */}
              <rect x="0" y="0" width="180" height="200" rx="20" fill="#10b98108" stroke="#10b981" strokeWidth="2" />
              <rect x="30" y="30" width="80" height="8" rx="4" fill="#10b981" />
              <path d="M30 160 Q 90 120, 150 140" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="150" cy="140" r="6" fill="#10b981" />
            </g>

            <g transform="translate(300, 70)">
              {/* Loser Card */}
              <rect x="0" y="0" width="160" height="160" rx="20" fill="#ffffff02" stroke="#ffffff10" strokeWidth="1" />
              <rect x="25" y="25" width="60" height="6" rx="3" fill="#ffffff10" />
              <path d="M25 130 Q 80 135, 135 125" stroke="#ffffff10" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>

            {/* Decision Flow */}
            <path d="M250 150 L290 150" stroke="#10b98130" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
        }
      />
      <FeatureCard
        index={4}
        title="Oracle-Driven Agentic Memory"
        desc="Agents leverage historical context and trusted real-world data sources to sharpen adaptive strategies."
        illustration={
          <svg width="100%" height="100%" viewBox="0 0 240 100" fill="none">
            {/* Brain/Memory Node */}
            <rect x="100" y="30" width="40" height="40" rx="8" fill="#10b98105" stroke="#10b981" strokeWidth="1" />

            {/* Data Feeds (Oracles) */}
            <g opacity="0.4">
              <line x1="20" y1="20" x2="90" y2="40" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
              <line x1="20" y1="80" x2="90" y2="60" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
              <circle cx="20" cy="20" r="3" fill="#10b981" />
              <circle cx="20" cy="80" r="3" fill="#10b981" />
            </g>

            {/* Memory Blocks */}
            <g transform="translate(150, 40)">
              <rect x="0" y="0" width="10" height="10" rx="2" fill="#ffffff10" />
              <rect x="15" y="0" width="10" height="10" rx="2" fill="#ffffff10" opacity="0.6" />
              <rect x="0" y="15" width="10" height="10" rx="2" fill="#ffffff10" opacity="0.3" />
            </g>

            <circle cx="120" cy="50" r="4" fill="#10b981" />
          </svg>
        }
      />
    </div>
  </section>
);

const CountingNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    const unsubscribe = count.on("change", (latest) => {
      setDisplay(Math.round(latest).toLocaleString());
    });
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut", delay: 0.2 });
    }
    return () => unsubscribe();
  }, [isInView, value, count]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const StatsSection = () => (
  <section id="numbers" className="py-20 lg:py-24 px-6 border-t border-white/5 bg-[#010502]">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-left"
      >
        <span className="text-emerald-500 text-sm font-medium mb-4 block tracking-wide uppercase">VERDICT IN NUMBERS</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 lg:mb-8 leading-tight text-white">Future-Ready RWA <br /> Starts Here</h2>
        <p className="text-gray-400 text-lg">Built for the next generation of AI-driven RWA markets.</p>
      </motion.div>
      <div className="flex flex-col gap-10 justify-center">
        {[
          { label: 'TRUSTED DATA SOURCES', value: 22, suffix: '+' },
          { label: 'FAST ROUND ITERATIONS', value: 15, suffix: ' MIN' },
          { label: 'PROPOSALS / ROUND', value: 1000, suffix: '+' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="flex items-baseline justify-between border-b border-white/10 pb-6 group hover:border-emerald-500/50 transition-colors"
          >
            <span className="text-3xl md:text-5xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              <CountingNumber value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-gray-500 uppercase text-sm tracking-wider ml-4 text-right">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 border-t border-white/5 bg-[#010502]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Logo />
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Verdict. Built for the next generation of markets.
        </p>
      </div>
      <div className="flex items-center gap-8 text-sm text-gray-500">
        <a href="#" className="hover:text-white transition-colors font-medium">Twitter</a>
        <a href="#" className="hover:text-white transition-colors font-medium">Docs</a>
        <a href="#" className="hover:text-white transition-colors font-medium">Markets</a>
      </div>
    </div>
  </footer>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#010502] text-white font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden relative">
      {/* Global CSS for Animations */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-30px) rotate(0deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(5deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 7s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 6s ease-in-out infinite; }
        
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>

      <Navbar />
      <Hero />
      <FeaturesSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;