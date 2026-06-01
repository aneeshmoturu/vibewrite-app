"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown, ShieldCheck } from 'lucide-react';

export default function HeroOverlay({ isAuth }: { isAuth: boolean }) {
  return (
    <div className="relative z-10 w-full">
      
      {/* GLOBAL HEADER BAR (Makes it feel like a completed commercial platform) */}
      <header className="fixed top-0 inset-x-0 h-20 border-b border-white/5 backdrop-blur-md bg-black/10 z-50 px-6 sm:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-medium tracking-tight text-zinc-200">VibeWrite <span className="text-zinc-500 font-normal">Studio</span></span>
        </div>
        <div className="flex items-center gap-6">
          <Link href={isAuth ? "/dashboard" : "/sign-in"} className="text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
            {isAuth ? "Workspace" : "Sign In"}
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* PANEL 1: THE ELITE HERO (Snaps to full viewport) */}
      {/* ========================================================================= */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center text-center px-6 relative pointer-events-none">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Micro indicator badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-zinc-400 text-xs font-medium mb-8 backdrop-blur-sm shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Autonomous Intelligence Engine v2.5</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 mb-6 drop-shadow-2xl leading-none">
            Copywriting, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 tracking-tight font-medium">Elevated to Art.</span>
          </h1>
          
          <p className="text-zinc-400 max-w-lg mx-auto text-base md:text-lg leading-relaxed mb-4">
            Interact with the 3D space by dragging the background. One gentle scroll unlocks your generation deck.
          </p>
        </motion.div>

        {/* Bouncing Scroll Indicator Link (pointer-events-auto so they can click it too!) */}
        <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-2 pointer-events-auto">
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">Scroll to Begin</span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-zinc-400 backdrop-blur-sm"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* PANEL 2: THE CONVERSION GATEWAY (Snaps directly into view on scroll) */}
      {/* ========================================================================= */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center text-center px-6 bg-gradient-to-t from-[#020204] via-[#050508]/90 to-transparent pointer-events-auto">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-30%" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl bg-white/[0.01] border border-white/5 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          {/* Subtle decorative inner corner lighting */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-100">
            Ready to deploy?
          </h2>
          
          <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto mb-10 leading-relaxed">
            Gain instant access to our latency-optimized generation workspace. No complex setup required.
          </p>
          
          <Link 
            href={isAuth ? "/dashboard" : "/sign-up"}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold rounded-2xl transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
          >
            {isAuth ? "Enter Corporate Dashboard" : "Create Enterprise Account"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-zinc-600" />
          </Link>
        </motion.div>

      </section>

    </div>
  );
}