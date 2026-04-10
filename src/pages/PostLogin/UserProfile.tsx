import { useState } from "react";
import useAuthStore from "@/auth/Store";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formatName = (name?: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const formatDate = (date?: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

const UserProfile = () => {
  const user = useAuthStore((state) => state.user);

  const [showReset, setShowReset] = useState(false);

  return (
    <div className="min-h-[90vh] pt-32 px-4 md:px-8 pb-10 bg-storm-dust-50 dark:bg-storm-dust-950 text-storm-dust-900 dark:text-storm-dust-100">
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Your Profile</h1>
        <p className="text-storm-dust-500 text-sm mt-1">Manage your identity, security, and account settings.</p>
      </motion.div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* ================= CARD 1 → PROFILE ================= */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-xl hover:shadow-2xl transition-all">
          <div className="flex flex-col items-center text-center gap-4">
            {/* IMAGE */}
            {user?.image ? (
              <img src={user.image} alt="profile" className="w-24 h-24 rounded-full object-cover border border-storm-dust-300 dark:border-storm-dust-700" />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-storm-dust-200 dark:bg-storm-dust-800 text-3xl font-bold">{user?.name?.charAt(0).toUpperCase()}</div>
            )}

            {/* NAME */}
            <h2 className="text-xl font-semibold">{formatName(user?.name)}</h2>

            {/* EMAIL */}
            <p className="text-sm text-storm-dust-500">{user?.email}</p>

            {/* PROVIDER */}
            <span className="text-xs px-3 py-1 rounded-full bg-storm-dust-200 dark:bg-storm-dust-800">{user?.provider || "LOCAL"}</span>

            {/* STATUS */}
            <div className="mt-3 text-xs text-green-500">● Active Account</div>
          </div>
        </motion.div>

        {/* ================= CARD 2 → DETAILS ================= */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-xl hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold mb-6">Account Details</h3>

          <div className="space-y-5 text-sm">
            <div className="flex justify-between">
              <span className="text-storm-dust-500">Full Name</span>
              <span className="font-medium">{formatName(user?.name)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-storm-dust-500">Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-storm-dust-500">Created</span>
              <span>{formatDate(user?.createdAt)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-storm-dust-500">Updated</span>
              <span>{formatDate(user?.updatedAt)}</span>
            </div>

            <div className="border-t border-storm-dust-300 dark:border-storm-dust-800 pt-4 mt-4 space-y-3">
              <div className="flex justify-between">
                <span>Password</span>
                <span className="text-storm-dust-500">••••••••</span>
              </div>

              <div className="flex justify-between">
                <span>2FA</span>
                <span className="text-storm-dust-500">Disabled</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= CARD 3 → RESET PASSWORD ================= */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-xl hover:shadow-2xl transition-all">
          <h3 className="text-lg font-semibold mb-4">Security Actions</h3>

          {!showReset ? (
            <Button onClick={() => setShowReset(true)} className="w-full rounded-full">
              Reset Password
            </Button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <Input placeholder="Current Password" type="password" />
              <Input placeholder="New Password" type="password" />
              <Input placeholder="Confirm Password" type="password" />

              <div className="flex gap-2">
                <Button className="flex-1 rounded-full">Update</Button>
                <Button variant="outline" className="flex-1 rounded-full" onClick={() => setShowReset(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
