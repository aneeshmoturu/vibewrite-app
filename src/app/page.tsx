import { auth } from "@clerk/nextjs/server";
import HeroOverlay from "./HeroOverlay";
import InteractiveWireframe from "./InteractiveWireframe"; // <-- Import the new background!

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#030303] text-zinc-50 select-none custom-scrollbar">
      
      {/* Our Custom High-Performance Interactive Background */}
      <InteractiveWireframe />

      {/* Structured Sections that snap perfectly on a single scroll */}
      <HeroOverlay isAuth={!!userId} />
      
    </main>
  );
}