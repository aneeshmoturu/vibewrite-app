import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "../components/ThemeProvider"; // <-- Imported Provider
import "./globals.css";

export const metadata = {
  title: "VibeWrite Studio",
  description: "Next-Gen Copywriting Workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* suppressHydrationWarning is required by next-themes */}
      <html lang="en" suppressHydrationWarning>
        <body className="bg-white dark:bg-[#030303] text-zinc-900 dark:text-zinc-50 antialiased transition-colors duration-300">
          
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
            <Toaster position="bottom-right" theme="system" closeButton richColors />
          </ThemeProvider>
          
        </body>
      </html>
    </ClerkProvider>
  );
}