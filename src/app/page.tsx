import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Sparkles, Zap, Shield, Layers, MessageSquare } from "lucide-react";
import InteractiveWireframe from "@/app/InteractiveWireframe";

export default async function LandingPage() {
  const { userId } = await auth();

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-50 font-sans overflow-x-hidden">
      {/* Background Grid Pattern */}
      <InteractiveWireframe />

      {/* Decorative Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-sm bg-black/5 m-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-white/10">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">
            VibeWrite <span className="text-zinc-500 font-normal">Studio</span>
          </span>
        </div>

        {/* Updated Navigation Bar (Fixed Redundancy) */}
        <nav className="flex items-center gap-6">
          <Link 
            href={userId ? "/dashboard/history" : "/sign-in"}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {userId ? "Vault" : "Sign In"}
          </Link>
          <Link
            href={userId ? "/dashboard" : "/sign-up"}
            className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-all shadow-md"
          >
            {userId ? "Go to App" : "Get Started"}
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-xs font-medium text-indigo-400 mb-6 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Copywriting Workspace</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.1] mb-6">
          Write content with the perfect <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">vibe</span>, every single time.
        </h1>

        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          VibeWrite Studio combines predictive logic and elite AI engineering to craft high-conversion copy, tailored perfectly to your creative direction.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href={userId ? "/dashboard" : "/sign-up"}
            className="group flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-8 py-4 rounded-full font-medium text-base transition-all shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:scale-[1.02]"
          >
            <span>Start Building for Free</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <hr className="border-white/5 max-w-7xl mx-auto my-12" />

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
            Engineered for high-speed content deployment
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm sm:text-base">
            Skip the artistic block. Harness structured templates optimized for immediate performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-md hover:border-white/10 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-6 group-hover:bg-indigo-500/20 transition-colors">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Instant Generation</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Generate fully realized hooks, copy frameworks, and taglines in under three seconds with our tuned model paths.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-md hover:border-white/10 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-6 group-hover:bg-purple-500/20 transition-colors">
              <Layers className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">The Vault Structure</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Never lose your high-performing outputs. Automatically sync, store, and categorize every single variant you create.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-md hover:border-white/10 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 mb-6 group-hover:bg-pink-500/20 transition-colors">
              <MessageSquare className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Tone Customization</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              From professional engineering breakdowns to dynamic, high-energy marketing campaigns, fine-tune the exact tone profile.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 mt-20 border-t border-white/5 text-center text-zinc-600 text-xs">
        <p>&copy; {new Date().getFullYear()} VibeWrite Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}