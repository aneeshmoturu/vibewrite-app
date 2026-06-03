import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import InteractiveWireframe from "../../InteractiveWireframe"; 
import CopyButton from "./CopyButton";

export default async function HistoryPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Fetch all generations for this user, newest first!
  const generations = await prisma.generation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-50 font-sans">
      <InteractiveWireframe />
      
      <div className="relative z-10 p-6 sm:p-12 max-w-5xl mx-auto flex flex-col min-h-screen pointer-events-none">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 py-4 border-b border-white/10 backdrop-blur-md bg-black/20 px-6 rounded-2xl pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2">
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </Link>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Generation <span className="text-zinc-500 font-normal">Vault</span>
            </h1>
          </div>
        </header>

        {/* The Vault Content */}
        <div className="pointer-events-auto space-y-6">
          {generations.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-xl shadow-xl">
              <p className="text-zinc-400">Your vault is empty. Go generate some copy!</p>
            </div>
          ) : (
            generations.map((gen) => (
              <div key={gen.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col gap-4 transition-all hover:bg-white/[0.04]">
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div className="pr-4">
                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">Prompt Configuration</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{gen.prompt}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <span className="text-xs text-zinc-500 font-medium bg-black/30 px-2 py-1 rounded-md">
                      {new Date(gen.createdAt).toLocaleDateString()}
                    </span>
                    <CopyButton text={gen.content} />
                  </div>
                </div>
                <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {gen.content}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}