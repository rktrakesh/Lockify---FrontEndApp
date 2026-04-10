import React from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Mail, ArrowRight, RefreshCw, Users, Smartphone, LogOut, Key, ShieldAlert } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
// Matched Spring Config from your Signup Page
const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
  duration: 0.8,
};

const HomePage = () => {
  return (
    <div className="bg-storm-dust-50 pt-14 dark:bg-storm-dust-950 text-storm-dust-900 dark:text-storm-dust-100 min-h-screen font-sans selection:bg-storm-dust-300">
      {/* --- SECTION 1: THE QUANTUM HERO --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Background Grid - Matched Signup Scale */}
        <div
          className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, var(--color-storm-dust-300) 1px, transparent 1px), linear-gradient(to bottom, var(--color-storm-dust-300) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(circle at center, black, transparent 90%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 90%)",
          }}
        />

        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={springTransition}
            className="inline-block mb-6 px-4 py-1 border border-storm-dust-300 dark:border-storm-dust-700 font-mono text-[10px] tracking-[0.4em] uppercase bg-white/50 dark:bg-storm-dust-900/50 rounded-full"
          >
            Encryption Level: AES-256-GCM
          </motion.div>

          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...springTransition, delay: 0.1 }} className="text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] uppercase mb-8">
            Secure <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-storm-dust-500 to-storm-dust-900 dark:from-storm-dust-100 dark:to-storm-dust-500">Identity</span>
          </motion.h1>

          <p className="text-lg md:text-xl text-storm-dust-500 dark:text-storm-dust-400 max-w-2xl mx-auto mb-10 font-medium">Lockify handles your login, user management, and session security so you can focus on building the future.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full h-16 px-12 bg-storm-dust-900 dark:bg-storm-dust-100 text-white dark:text-black font-bold text-lg group">
              BUILD NOW <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-16 px-12 border-storm-dust-300 dark:border-storm-dust-700 font-bold">
              VIEW INTEGRATION
            </Button>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: BENTO GRID --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20 space-y-4">
          <h2 className="text-4xl font-bold uppercase tracking-tight">Core Infrastructure</h2>
          <div className="w-20 h-2 bg-storm-dust-900 dark:bg-storm-dust-100 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Universal Auth" desc="Traditional Email/Password or 1-click Google & GitHub login. Seamless, secure, and instant." icon={<Key />} className="md:col-span-2" status="Social_Linked" />
          <FeatureCard title="Auto-Renewal" desc="Silent background session refreshing ensures users stay logged in without interruption." icon={<RefreshCw className="animate-spin-slow" />} status="Sync_Active" />
          <FeatureCard title="Multi-Device" desc="Manage and revoke active sessions remotely from any device, anywhere in the world." icon={<Smartphone />} status="Node_Discovery" />
          <FeatureCard title="Security Center" desc="Centralized dashboard for login activity, connected apps, and security health status." icon={<ShieldCheck />} className="md:col-span-2" status="Vault_Locked" />
          <FeatureCard title="RBAC Control" desc="Fine-grained permission levels. Admins, Users, and custom roles defined in seconds." icon={<Users />} status="Permissions_Set" />
          <FeatureCard title="Advanced Security" desc="Automatic token rotation and expiration protocols to prevent session hijacking." icon={<ShieldAlert />} status="Rotating_Keys" />
          <FeatureCard title="Instant Revoke" desc="Global logout terminates all active sessions across every device immediately." icon={<LogOut />} status="Terminated" />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 pt-20 pb-10 border-t border-storm-dust-200 dark:border-storm-dust-800 bg-white/30 dark:bg-storm-dust-950/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 font-bold text-xl italic uppercase tracking-tighter">
                <img src="/Lockify.png" alt="Logo" className="w-8 h-8 rounded-3xl" /> Lockify
              </div>
              <p className="text-storm-dust-500 dark:text-storm-dust-400 text-sm max-w-xs leading-relaxed font-medium">The next evolution in authentication infrastructure. Built for developers who value security, speed, and simplicity.</p>
              <div className="flex gap-4">
                <SocialIcon icon={<FaTwitter size={18} />} />
                <SocialIcon icon={<FaGithub size={18} />} />
                <SocialIcon icon={<FaLinkedin size={18} />} />
                <SocialIcon icon={<Mail size={18} />} />
              </div>
            </div>
            <FooterColumn title="Product" links={["Features", "Security", "Roadmap", "Changelog"]} />
            <FooterColumn title="Developers" links={["Documentation", "API Reference", "SDKs", "Support"]} />
            <FooterColumn title="Company" links={["About", "Careers", "Privacy", "Terms"]} />
          </div>

          <div className="pt-10 border-t border-storm-dust-200 dark:border-storm-dust-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-mono text-[10px] text-storm-dust-400 tracking-widest uppercase">© 2026 Lockify Auth Inc. // All Rights Reserved.</div>
            <div className="flex items-center gap-6 font-mono text-[10px] text-storm-dust-400 tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" /> API: Online
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Vault: Secure
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* --- SUB-COMPONENT: KINETIC FEATURE CARD --- */
const FeatureCard = ({ title, desc, icon, className = "", status }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springTransition}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative group border border-storm-dust-200 dark:border-storm-dust-800 bg-white/40 dark:bg-white/5 backdrop-blur-xl p-8 flex flex-col justify-between min-h-[300px] overflow-hidden transition-colors hover:border-storm-dust-400 dark:hover:border-storm-dust-600 rounded-[32px] shadow-xl ${className}`}
    >
      <div className="relative z-10">
        <div className="mb-6 p-3 bg-storm-dust-100 dark:bg-storm-dust-800 w-fit text-storm-dust-900 dark:text-storm-dust-100 group-hover:bg-storm-dust-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300 rounded-2xl">
          {React.cloneElement(icon, { size: 28 })}
        </div>
        <h3 className="text-2xl font-bold uppercase mb-4 tracking-tighter">{title}</h3>
        <p className="text-storm-dust-500 dark:text-storm-dust-400 font-medium text-sm leading-relaxed max-w-[280px]">{desc}</p>
      </div>

      <div className="mt-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-tighter text-storm-dust-400">Status: {status}</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
          <ArrowRight className="w-4 h-4 text-storm-dust-900 dark:text-storm-dust-100" />
        </div>
      </div>
    </motion.div>
  );
};

const FooterColumn = ({ title, links }: any) => (
  <div className="space-y-4">
    <h4 className="font-bold text-xs uppercase tracking-[0.2em]">{title}</h4>
    <ul className="space-y-2">
      {links.map((link: string) => (
        <li key={link}>
          <a href="#" className="text-storm-dust-500 dark:text-storm-dust-400 text-sm hover:text-storm-dust-900 dark:hover:text-storm-dust-100 transition-colors font-medium">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }: any) => (
  <a href="#" className="w-9 h-9 flex items-center justify-center rounded-xl border border-storm-dust-200 dark:border-storm-dust-800 text-storm-dust-500 hover:bg-storm-dust-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
    {icon}
  </a>
);

export default HomePage;
