import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner"; // <-- We added this import
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
      <html lang="en">
        <body className="bg-[#030303] antialiased">
          {/* This renders your actual pages */}
          {children}
          
          {/* We added this Toaster component! */}
          {/* 'richColors' makes success toasts green and error toasts red */}
          <Toaster position="bottom-right" theme="dark" closeButton richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}