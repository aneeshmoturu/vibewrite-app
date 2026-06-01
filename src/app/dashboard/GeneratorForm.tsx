"use client";

import { useState } from "react";
import { generateProductCopy } from "@/actions/generate";
import { motion } from "framer-motion";
import { Sparkles, Copy, Check, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function GeneratorForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    const formData = new FormData(event.currentTarget);
    const response = await generateProductCopy(formData);

    if (response.error) setError(response.error);
    else if (response.success && response.data) setResult(response.data);
    
    setLoading(false);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full"
    >
      
      {/* LEFT SIDE: The Control Panel */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-semibold text-zinc-100 tracking-tight">Craft Your Copy</h2>
          <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
            Configure the parameters below and let our engine generate high-converting material in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Product Name</label>
            <input 
              name="productName" type="text" required placeholder="e.g., LuminaDesk Pro" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all placeholder:text-zinc-600 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Key Features</label>
            <textarea 
              name="keywords" rows={3} required placeholder="e.g., wireless, ergonomic, 40hr battery..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all placeholder:text-zinc-600 resize-none backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tone Profile</label>
            <select name="tone" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer">
              <option value="Professional & Corporate">Professional & Corporate</option>
              <option value="Bold & Hype">Bold & Hype</option>
              <option value="Casual & Friendly">Casual & Friendly</option>
              <option value="Luxury & Elegant">Luxury & Elegant</option>
            </select>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-3.5 px-4 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Sparkles className="w-4 h-4" /> Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Generate Output <span className="text-zinc-500 font-normal ml-1">(-1 Credit)</span>
              </span>
            )}
          </motion.button>
        </form>
      </div>

      {/* RIGHT SIDE: The Output Glass Panel */}
      <div className="lg:col-span-7 h-full min-h-[500px]">
        <div className="h-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-2xl flex flex-col relative overflow-hidden">
          
          {/* Output Header & Copy Button */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <h3 className="text-sm font-medium text-zinc-300">Live Output</h3>
            </div>
            
            {result && (
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Text"}
              </button>
            )}
          </div>

          {/* The Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            
            {!result && !error && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
                <Sparkles className="w-8 h-8 opacity-20" />
                <p className="text-sm max-w-xs text-center leading-relaxed">
                  Your generated masterpiece will appear here. Ready when you are.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-sm text-zinc-500 animate-pulse">Drafting optimal copy...</p>
              </div>
            )}

            {error && !loading && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            {result && !loading && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:text-zinc-300 prose-strong:text-white"
              >
                <ReactMarkdown>{result}</ReactMarkdown>
              </motion.div>
            )}
          </div>

        </div>
      </div>

    </motion.main>
  );
}