import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, FileText, Zap, Search } from "lucide-react";
import InteractiveWireframe from "@/app/InteractiveWireframe";
import { UserButton } from "@clerk/nextjs";
import prisma from "@/lib/prisma"; 
import { ThemeToggle } from "@/components/ThemeToggle"; // <-- Added Theme Toggle

export default async function HistoryPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Fetch real data from the database, ordered by newest first!
  const pastGenerations = await prisma.generation.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-[#030303] text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
      <InteractiveWireframe />

      <div className="relative z-10 p-6 sm:p-12 max-w-5xl mx-auto flex flex-col min-h-screen pointer-events-none">
        
        {/* Simple Header */}
        <header className="flex justify-between items-center mb-12 py-4 border-b border-zinc-200 dark:border-white/10 backdrop-blur-md bg-white/50 dark:bg-black/20 px-6 rounded-2xl pointer-events-auto shadow-sm dark:shadow-2xl transition-colors">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="p-2 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-full transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-white/10"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white" />
            </Link>
            <div className="h-6 w-px bg-zinc-300 dark:bg-white/10" />
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2 transition-colors">
              <Clock className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              The Vault
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="ring-2 ring-zinc-200 dark:ring-white/10 rounded-full shadow-lg transition-transform hover:scale-105 bg-white dark:bg-black flex items-center justify-center pointer-events-auto">
              <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
            </div>
          </div>
        </header>

        {/* Search & Filter Bar */}
        <div className="mb-8 flex items-center justify-between pointer-events-auto">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search past generations..." 
              className="w-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 backdrop-blur-sm shadow-sm dark:shadow-none"
            />
          </div>
        </div>

        {/* History Grid */}
        <div className="grid grid-cols-1 gap-6 pointer-events-auto pb-12">
          {pastGenerations.map((gen) => (
            <div 
              key={gen.id} 
              className="bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-sm dark:shadow-lg hover:border-zinc-300 dark:hover:border-white/10 transition-colors group flex flex-col sm:flex-row gap-6"
            >
              {/* Info Column */}
              <div className="sm:w-1/3 flex flex-col gap-3 border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-white/5 pb-4 sm:pb-0 sm:pr-6 transition-colors">
                <div>
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 transition-colors">{gen.productName}</h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {new Date(gen.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-white/10 px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-600 dark:text-zinc-400 w-fit transition-colors">
                  <FileText className="w-3 h-3" />
                  {gen.tone}
                </div>
              </div>

              {/* Content Column */}
              <div className="sm:w-2/3 flex flex-col justify-between">
                <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 whitespace-pre-wrap transition-colors">
                  {gen.content}
                </div>
                <div className="flex justify-end">
                  <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-lg cursor-pointer">
                    <Zap className="w-3 h-3" />
                    Saved
                  </div>
                </div>
              </div>
            </div>
          ))}

          {pastGenerations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 border border-zinc-200 dark:border-white/5 rounded-2xl bg-white dark:bg-white/[0.01] backdrop-blur-sm transition-colors shadow-sm dark:shadow-none">
              <Clock className="w-10 h-10 mb-4 opacity-40 dark:opacity-20" />
              <p>Your vault is currently empty. Go generate some copy!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}