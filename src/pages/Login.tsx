import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { AlertTriangleIcon, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import type LoginData from "@/models/LoginData";
import toast from "react-hot-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import useAuthStore from "@/auth/Store";
import Oauth2Buttons from "./Oauth2LoginButton";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (data.email.trim() === "" || data.password.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await login(data);
      toast.success("Login Successfull.");
      navigate("/dashboard");
    } catch (e) {
      // If the interceptor rejects properly, this will now run
      setLoading(false);
      console.error("Login component caught error:", e);
      setError(e);
    } finally {
      // This will only run if the promise settled
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative min-h-screen pt-28 pb-8 md:py-0 px-4 flex items-center justify-center overflow-x-hidden bg-storm-dust-50 dark:bg-storm-dust-950 text-storm-dust-900 dark:text-storm-dust-100">
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-storm-dust-300) 1px, transparent 1px), linear-gradient(to bottom, var(--color-storm-dust-300) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 95%)",
        }}
      />

      {/* AMBIENT BLOBS */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 md:w-125 h-72 md:h-125 bg-storm-dust-300/30 dark:bg-storm-dust-700/20 blur-[80px] md:blur-[120px] rounded-full -top-10 -left-10 animate-pulse" />
        <div className="absolute w-64 md:w-100 h-64 md:h-100 bg-storm-dust-400/30 dark:bg-storm-dust-600/20 blur-[80px] md:blur-[120px] rounded-full -bottom-10 -right-10 animate-pulse" />
      </div>

      {/* LOGIN CARD */}
      <form onSubmit={handleSubmit} className="w-full z-10 flex justify-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md p-6 md:p-10 rounded-[28px] md:rounded-[32px] backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-2xl">
          {/* HEADER */}
          <div className="flex items-center justify-center mb-4">
            <img src="/Lockify.png" alt="Logo" className="w-10 h-10 rounded-2xl" />
          </div>

          <div className="mb-6 md:mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-storm-dust-500 dark:text-storm-dust-400 text-sm">Sign in to your Lockify vault.</p>
          </div>

          {error && (
            <div className="mb-6">
              <Alert variant={"destructive"}>
                <AlertTriangleIcon className="w-4 h-4" />
                <AlertDescription>{error?.response?.data?.message || error?.message || "Login failed"}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* INPUTS */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm mb-1.5 block font-medium">Email</label>
              <Input type="email" onChange={handleInputChange} name="email" placeholder="name@example.com" className="rounded-xl bg-transparent border-storm-dust-300 dark:border-storm-dust-700 h-11" />
            </div>

            <div className="relative">
              <label className="text-sm mb-1.5 block font-medium">Password</label>
              <Input type={showPassword ? "text" : "password"} onChange={handleInputChange} name="password" placeholder="••••••••" className="rounded-xl bg-transparent border-storm-dust-300 dark:border-storm-dust-700 h-11 pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-storm-dust-400 hover:text-storm-dust-600 transition">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <Button type="submit" className="w-full rounded-full mb-6 h-12 font-semibold cursor-pointer" disabled={loading}>
            {loading ? (
              <>
                <Spinner /> Checking...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-storm-dust-200 dark:bg-storm-dust-800" />
            <span className="text-[10px] font-bold text-storm-dust-400 uppercase">OR</span>
            <div className="flex-1 h-px bg-storm-dust-200 dark:bg-storm-dust-800" />
          </div>

          {/* SOCIAL LOGIN */}
          <Oauth2Buttons />

          {/* FOOTER */}
          <p className="text-center text-sm text-storm-dust-500 mt-8">
            New to Lockify?{" "}
            <NavLink to="/signup" className="text-storm-dust-900 dark:text-storm-dust-100 font-semibold underline underline-offset-4">
              Create an account
            </NavLink>
          </p>
        </motion.div>
      </form>
    </div>
  );
}

export default Login;
