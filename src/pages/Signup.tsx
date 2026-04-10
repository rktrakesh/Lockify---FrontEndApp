import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { AlertTriangleIcon, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import type RegisterData from "@/models/RegisterData";
import { registerUser } from "@/service/AuthService";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Oauth2LoginButton from "./Oauth2LoginButton";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    enable: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (data.name.trim() === "") {
      toast.error("Name is required");
      return;
    }
    if (data.email.trim() === "") {
      toast.error("Email is required");
      return;
    }

    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    if (emailInput && !emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    if (data.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    if (confirmPassword.trim() === "") {
      toast.error("Please confirm your password");
      return;
    }

    if (data.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    try {
      setLoading(true);
      await registerUser(data);
      toast.success("Registration successful!");
      setData({ name: "", email: "", password: "", enable: true });
      navigate("/login");
    } catch (e) {
      setError(e);
    } finally {
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
    <div className="relative min-h-screen pt-28 pb-12 md:py-0 px-4 md:pt-12 flex items-center justify-center overflow-x-hidden bg-storm-dust-50 dark:bg-storm-dust-950 text-storm-dust-900 dark:text-storm-dust-100">
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

      {/* SIGNUP CARD */}
      <form onSubmit={handleSubmit} noValidate className="w-full z-10 flex justify-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg p-6 md:p-10 rounded-[28px] md:rounded-[32px] backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-storm-dust-200 dark:border-storm-dust-800 shadow-2xl">
          {/* HEADER */}
          <div className="flex items-center justify-center mb-4">
            <img src="/Lockify.png" alt="Logo" className="w-10 h-10 rounded-2xl" />
          </div>
          <div className="mb-6 md:mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-storm-dust-500 dark:text-storm-dust-400 text-sm">Join Lockify for secure authentication.</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangleIcon className="w-4 h-4" />
              <AlertDescription>{error.message || "Registration failed."}</AlertDescription>
            </Alert>
          )}

          {/* NAME & EMAIL */}
          <div className="space-y-4 mb-4">
            <div>
              <label className="text-sm mb-1.5 block font-medium">Name</label>
              <Input placeholder="Enter your name" name="name" value={data.name} onChange={handleInputChange} className="rounded-xl bg-transparent border-storm-dust-300 dark:border-storm-dust-700" />
            </div>

            <div>
              <label className="text-sm mb-1.5 block font-medium">Email</label>
              <Input
                type="email"
                required
                placeholder="name@example.com"
                name="email"
                value={data.email}
                onChange={(e) => {
                  handleInputChange(e);
                  e.target.setCustomValidity("");
                }}
                className="rounded-xl bg-transparent border-storm-dust-300 dark:border-storm-dust-700"
              />
            </div>
          </div>

          {/* PASSWORD GRID */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-sm mb-1.5 block font-medium">Password</label>
              <Input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={(e) => {
                  handleInputChange(e);
                  e.target.setCustomValidity("");
                }}
                className="rounded-xl bg-transparent border-storm-dust-300 dark:border-storm-dust-700 pr-10"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-storm-dust-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative">
              <label className="text-sm mb-1.5 block font-medium">Confirm</label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError("");
                }}
                className="rounded-xl bg-transparent border-storm-dust-300 dark:border-storm-dust-700 pr-10"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-storm-dust-400">
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {passwordError && <p className="mt-[-1rem] mb-4 text-xs text-red-500 font-medium">{passwordError}</p>}

          {/* ACTIONS */}
          <Button type="submit" className="w-full rounded-full mb-6 py-6 font-semibold" disabled={loading}>
            {loading ? <Spinner /> : "Create Account"}
          </Button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-storm-dust-200 dark:bg-storm-dust-800" />
            <span className="text-[10px] font-bold text-storm-dust-400">OR</span>
            <div className="flex-1 h-px bg-storm-dust-200 dark:bg-storm-dust-800" />
          </div>

          {/* login with GitHub and Google */}
          <Oauth2LoginButton />

          <p className="text-center text-sm text-storm-dust-500 mt-8">
            Already have an account?{" "}
            <NavLink to="/login" className="text-storm-dust-900 dark:text-storm-dust-100 font-semibold underline underline-offset-4">
              Sign In
            </NavLink>
          </p>
        </motion.div>
      </form>
    </div>
  );
}

export default Signup;
