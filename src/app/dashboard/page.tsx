import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import GeneratorForm from "./GeneratorForm"; 
import { Zap, Clock } from "lucide-react";
import InteractiveWireframe from "../InteractiveWireframe";
import Link from "next/link";
import { ThemeToggle } from "../../components/ThemeToggle"; // Added the toggle!

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Find the user to check credits. If they don't exist, create them with 5 credits!
  let user = await prisma.user.findUnique({ where: { userId: userId } });
  if (!user) {
    user = await prisma.user.create({ data: { userId: userId, credits: 5 } });
  }

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-[#030303] text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
      <InteractiveWireframe />

      <div className="relative z-10 p-6 sm:p-12 max-w-7xl mx-auto flex flex-col min-h-screen pointer-events-none">
        
        <header className="flex justify-between items-center mb-12 py-4 border-b border-zinc-200 dark:border-white/10 backdrop-blur-md bg-white/50 dark:bg-black/20 px-6 rounded-2xl pointer-events-auto shadow-sm dark:shadow-2xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-indigo-200 dark:border-white/10">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white transition-colors">
              VibeWrite <span className="text-zinc-500 font-normal">Studio</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Added Theme Toggle so users can switch inside the app */}
            <ThemeToggle />

            {/* Link to History Vault */}
            <Link 
              href="/dashboard/history"
              className="flex items-center gap-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-colors pointer-events-auto"
            >
              <Clock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden sm:inline">Vault</span>
            </Link>

            {/* Existing Credit Badge */}
            <div className="flex items-center gap-2 bg-white/80 dark:bg-[#111]/80 border border-zinc-200 dark:border-white/10 px-5 py-2 rounded-full backdrop-blur-md shadow-sm dark:shadow-inner transition-colors">
              <Zap className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{user.credits} <span className="hidden sm:inline">Credits Left</span></span>
            </div>
            
            <div className="ring-2 ring-zinc-200 dark:ring-white/10 rounded-full shadow-lg transition-transform hover:scale-105 bg-white dark:bg-black flex items-center justify-center pointer-events-auto">
              <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center w-full pointer-events-auto">
          <GeneratorForm />
        </div>

      </div>
    </div>
  );
}