import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, FileText, Zap, Search } from "lucide-react";
import InteractiveWireframe from "@/app/InteractiveWireframe";
import { UserButton } from "@clerk/nextjs";
import prisma from "@/lib/prisma"; // <-- 1. Import Prisma

export default async function HistoryPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // 2 & 3. Fetch real data from the database, ordered by newest first!
  const pastGenerations = await prisma.generation.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-50 font-sans">
      <InteractiveWireframe />

      <div className="relative z-10 p-6 sm:p-12 max-w-5xl mx-auto flex flex-col min-h-screen pointer-events-none">
        
        {/* Simple Header */}
        <header className="flex justify-between items-center mb-12 py-4 border-b border-white/10 backdrop-blur-md bg-black/20 px-6 rounded-2xl pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="p-2 hover:bg-white/10 rounded-full transition-colors border border-transparent hover:border-white/10"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400 hover:text-white" />
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <h1 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              The Vault
            </h1>
          </div>
          
          <div className="ring-2 ring-white/10 rounded-full shadow-lg transition-transform hover:scale-105 bg-black flex items-center justify-center pointer-events-auto">
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </div>
        </header>

        {/* Search & Filter Bar */}
        <div className="mb-8 flex items-center justify-between pointer-events-auto">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search past generations..." 
              className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* History Grid */}
        <div className="grid grid-cols-1 gap-6 pointer-events-auto pb-12">
          {pastGenerations.map((gen) => (
            <div 
              key={gen.id} 
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-lg hover:border-white/10 transition-colors group flex flex-col sm:flex-row gap-6"
            >
              {/* Info Column */}
              <div className="sm:w-1/3 flex flex-col gap-3 border-b sm:border-b-0 sm:border-r border-white/5 pb-4 sm:pb-0 sm:pr-6">
                <div>
                  <h3 className="text-lg font-medium text-zinc-100">{gen.productName}</h3>
                  {/* 4. Format the Date perfectly */}
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
                <div className="inline-flex items-center gap-1.5 bg-[#111] border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-400 w-fit">
                  <FileText className="w-3 h-3" />
                  {gen.tone}
                </div>
              </div>

              {/* Content Column */}
              <div className="sm:w-2/3 flex flex-col justify-between">
                <div className="text-sm text-zinc-300 leading-relaxed mb-4 whitespace-pre-wrap">
                  {gen.content}
                </div>
                <div className="flex justify-end">
                  {/* Visual button placeholder - functionality can be added later! */}
                  <div className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 bg-indigo-500/10 px-3 py-1.5 rounded-lg cursor-pointer">
                    <Zap className="w-3 h-3" />
                    Saved
                  </div>
                </div>
              </div>
            </div>
          ))}

          {pastGenerations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 border border-white/5 rounded-2xl bg-white/[0.01] backdrop-blur-sm">
              <Clock className="w-10 h-10 mb-4 opacity-20" />
              <p>Your vault is currently empty. Go generate some copy!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}