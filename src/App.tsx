/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "framer-motion";
import { User, Server, Terminal, Github } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-[#0f172a] selection:text-white flex items-center justify-center p-6">
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-8xl font-bold tracking-[-0.04em] leading-tight text-center"
      >
        Prasann's page
      </motion.h1>
    </div>
  );
}

