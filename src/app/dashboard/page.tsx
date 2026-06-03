import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import GeneratorForm from "./GeneratorForm"; 
import { Zap } from "lucide-react";
import InteractiveWireframe from "../InteractiveWireframe";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Find the user to check credits. If they don't exist, create them with 5 credits!
  let user = await prisma.user.findUnique({ where: { userId: userId } });
  if (!user) {
    user = await prisma.user.create({ data: { userId: userId, credits: 5 } });
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-50 font-sans">
      <InteractiveWireframe />

      <div className="relative z-10 p-6 sm:p-12 max-w-7xl mx-auto flex flex-col min-h-screen pointer-events-none">
        
        <header className="flex justify-between items-center mb-12 py-4 border-b border-white/10 backdrop-blur-md bg-black/20 px-6 rounded-2xl pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-white/10">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              VibeWrite <span className="text-zinc-500 font-normal">Studio</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-[#111]/80 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md shadow-inner">
              <Zap className="w-4 h-4 text-indigo-400" />
              {/* This line right here brings your credit counter back to the screen! */}
              <span className="text-sm font-medium text-zinc-200">{user.credits} Credits Left</span>
            </div>
            <div className="ring-2 ring-white/10 rounded-full shadow-lg transition-transform hover:scale-105 bg-black flex items-center justify-center">
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