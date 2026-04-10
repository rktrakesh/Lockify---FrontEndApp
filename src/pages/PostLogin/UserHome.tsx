import useAuthStore from "@/auth/Store";
import { motion } from "framer-motion";
import { getCurrentUser } from "@/service/AuthService";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type UserDto from "@/models/UserDto";
import { Globe, Zap } from "lucide-react";

const UserHome = () => {
  const user = useAuthStore((state) => state.user);
  const [loadingSecure, setLoadingSecure] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);

  const getUserData = async () => {
    try {
      setLoadingSecure(true);
      const response = await getCurrentUser(user?.email);
      setCurrentUser(response);
      toast("Access secured APIs successfully.");
      console.log(response);
    } catch (error) {
      setLoadingSecure(false);
      console.error(error);
    } finally {
      setLoadingSecure(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] pt-28 md:pt-32 px-4 md:px-8 pb-10 overflow-hidden">
      {/* 🔥 RESPONSIVE BLOBS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-storm-dust-300/30 dark:bg-storm-dust-700/20 blur-[120px] rounded-full -top-20 -left-20 animate-pulse" />
        <div className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-storm-dust-400/30 dark:bg-storm-dust-600/20 blur-[120px] rounded-full -bottom-20 -right-20 animate-pulse" />
      </div>

      {/* 🔥 GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        {/* 🧑 PROFILE */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="p-5 md:p-6 rounded-[28px] backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-storm-dust-400 to-storm-dust-700 flex items-center justify-center text-2xl md:text-3xl font-bold text-white shadow-lg">{user?.name?.charAt(0).toUpperCase()}</div>

            <h2 className="mt-4 text-lg md:text-xl font-semibold">{user?.name}</h2>

            <p className="text-xs md:text-sm text-storm-dust-500">{user?.email}</p>

            {/* 🔥 SECURITY SCORE */}
            <div className="mt-5 relative w-20 h-20 md:w-24 md:h-24">
              {/* Added viewBox="0 0 100 100" to create a relative coordinate system */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Circle - Using 50% for center and 40 for radius */}
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-800" />
                {/* Progress Circle */}
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="20" /* Calculate based on: 251.2 * (1 - percentage/100) */ strokeLinecap="round" className="text-green-500 transition-all duration-1000" />
              </svg>

              {/* Percentage Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs md:text-sm font-bold tracking-tighter">92%</span>
              </div>
            </div>

            <p className="text-xs mt-2 text-storm-dust-500">Security Score</p>
          </div>
        </motion.div>

        {/* 🛡️ SECURITY HEALTH CENTER */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 xl:col-span-2 p-5 md:p-6 rounded-[28px] backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold">Security Health Center</h3>
              <p className="text-xs text-storm-dust-500">Real-time protection status for Lockify</p>
            </div>
            <div className="flex -space-x-2">
              {/* Visual representation of linked providers */}
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white dark:border-storm-dust-900 flex items-center justify-center text-[10px] text-white font-bold">G</div>
              <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white dark:border-storm-dust-900 flex items-center justify-center text-[10px] text-white font-bold">GH</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status Card 1: Identity */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">Identity Verified</span>
              </div>
              <p className="text-sm font-medium">Session token is encrypted and active.</p>
              <p className="text-[10px] mt-1 text-storm-dust-500">Expires in: 14h 22m</p>
            </div>

            {/* Status Card 2: Threat Detection */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Threat Shield</span>
              </div>
              <p className="text-sm font-medium">0 anomalies detected in last 24h.</p>
              <p className="text-[10px] mt-1 text-storm-dust-500">Origin: Mumbai, IN (Current)</p>
            </div>
          </div>

          {/* Progress Visualizer for Data Sync */}
          <div className="mt-6 pt-6 border-t border-storm-dust-100 dark:border-storm-dust-800">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-storm-dust-500 font-medium">Vault Synchronization</span>
              <span className="font-bold text-storm-dust-900 dark:text-storm-dust-100">100%</span>
            </div>
            <div className="h-2 w-full bg-storm-dust-200 dark:bg-storm-dust-800 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-storm-dust-400 to-storm-dust-900 dark:from-storm-dust-600 dark:to-storm-dust-100" />
            </div>
          </div>
        </motion.div>

        {/* --- 🧠 SMART INSIGHTS --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2 p-6 rounded-[32px] backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold uppercase tracking-widest text-sm text-storm-dust-900 dark:text-storm-dust-100">Smart Insights</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-storm-dust-200/40 dark:bg-storm-dust-800/40 border border-white/5">
              <p className="text-[10px] text-storm-dust-500 uppercase font-bold mb-1">Peak Activity</p>
              <p className="font-bold text-lg">09:42 PM</p>
            </div>
            <div className="p-4 rounded-2xl bg-storm-dust-200/40 dark:bg-storm-dust-800/40 border border-white/5">
              <p className="text-[10px] text-storm-dust-500 uppercase font-bold mb-1">Origin Node</p>
              <p className="font-bold text-lg flex items-center gap-2">
                <Globe className="w-4 h-4" /> IN_MUMBAI
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-storm-dust-200/40 dark:bg-storm-dust-800/40 border border-white/5">
              <p className="text-[10px] text-storm-dust-500 uppercase font-bold mb-1">Protocol</p>
              <p className="font-bold text-lg text-green-500">SECURE_2FA</p>
            </div>
          </div>
        </motion.div>

        {/* 📱 DEVICES */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="p-5 md:p-6 rounded-[28px] backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-xl">
          <h3 className="text-base md:text-lg font-semibold mb-4">Active Devices</h3>

          <div className="space-y-3 text-xs md:text-sm">
            <div className="flex justify-between">
              <span>💻 Chrome - Windows</span>
              <span>Now</span>
            </div>
            <div className="flex justify-between">
              <span>📱 Android</span>
              <span>2h ago</span>
            </div>
            <div className="flex justify-between">
              <span>🍎 Safari</span>
              <span>Yesterday</span>
            </div>
          </div>
        </motion.div>

        {/* 🔥 HEATMAP */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="col-span-1 md:col-span-2 xl:col-span-3 p-5 md:p-6 rounded-[28px] backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-xl">
          <h3 className="text-base md:text-lg font-semibold mb-4">Activity Heatmap</h3>

          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="h-3 md:h-4 rounded bg-storm-dust-400 dark:bg-storm-dust-700" style={{ opacity: Math.random() }} />
            ))}
          </div>
        </motion.div>

        {/* 🛡️ RECENT SECURITY EVENTS */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="col-span-1 md:col-span-2 xl:col-span-3 p-5 md:p-6 rounded-[28px] backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base md:text-lg font-semibold">Security Audit Log</h3>
            <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-full font-bold uppercase">Real-time</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-storm-dust-500 border-b border-storm-dust-100 dark:border-storm-dust-800">
                  <th className="pb-3 font-medium">Event</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Device</th>
                  <th className="pb-3 font-medium text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-storm-dust-100 dark:divide-storm-dust-800">
                {[
                  { event: "Login Success", loc: "Mumbai, IN", device: "Chrome / Win11", time: "Just now", color: "text-green-500" },
                  { event: "OAuth Sync", loc: "GitHub API", device: "Cloud Server", time: "12m ago", color: "text-blue-500" },
                  { event: "New Device Linked", loc: "Chennai, IN", device: "iQOO 12", time: "2h ago", color: "text-yellow-500" },
                  { event: "Password Changed", loc: "Mumbai, IN", device: "Chrome / Win11", time: "Yesterday", color: "text-purple-500" },
                ].map((log, i) => (
                  <tr key={i} className="hover:bg-storm-dust-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className={`py-4 font-medium ${log.color}`}>{log.event}</td>
                    <td className="py-4 text-storm-dust-600 dark:text-storm-dust-400">{log.loc}</td>
                    <td className="py-4 text-storm-dust-600 dark:text-storm-dust-400">{log.device}</td>
                    <td className="py-4 text-right text-storm-dust-400">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      <div className=" text-center flex flex-col items-center justify-center mt-10 pb-36">
        <h2>{currentUser?.name}</h2>
        <Button onClick={() => getUserData()} className="rounded-full w-fit items-center">
          {loadingSecure ? "Fetching..." : "Fetch Secure Data"}
        </Button>
      </div>
    </div>
  );
};

export default UserHome;
