import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import useAuthStore from "@/auth/Store";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";

function Navbar() {
  // const checkLogin = useAuthStore((state) => state.checkLogin);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const formatName = (name?: string) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const NavItems = () => (
    <>
      {isAuthenticated ? (
        <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="font-medium hover:text-storm-dust-500 transition-colors">
          Dashboard
        </NavLink>
      ) : (
        <NavLink to="/" onClick={() => setIsOpen(false)} className="font-medium hover:text-storm-dust-500 transition-colors">
          Home
        </NavLink>
      )}
    </>
  );

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center pt-4 px-4 md:px-6">
      <nav className="grid grid-cols-3 items-center w-full max-w-7xl px-4 md:px-10 py-3 rounded-full border border-storm-dust-200 dark:border-storm-dust-800 bg-white/70 dark:bg-storm-dust-950/70 backdrop-blur-xl shadow-lg">
        {/* LEFT: LOGO */}
        <div className="flex justify-start">
          <NavLink to="/" className="shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-storm-dust-900 dark:bg-storm-dust-100 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/Lockify.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tighter">Lockify</span>
            </div>
          </NavLink>
        </div>

        {/* MIDDLE: DESKTOP NAV (Absolute Middle) */}
        <div className="hidden md:flex justify-center items-center gap-8 text-sm font-medium opacity-90">
          <NavItems />
        </div>

        {/* RIGHT: DESKTOP ACTIONS / MOBILE HAMBURGER */}
        <div className="flex justify-end items-center">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <NavLink to="/dashboard/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  {user?.image ? (
                    <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-storm-dust-300 dark:border-storm-dust-700" />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-storm-dust-200 dark:bg-storm-dust-800 border border-storm-dust-300 dark:border-storm-dust-700">
                      <span className="text-xs font-semibold">{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <h3 className="text-sm font-medium">{formatName(user?.name)}</h3>
                </NavLink>
                <Button onClick={() => logout()} variant="outline" className="ml-2 bg-storm-dust-900 text-white dark:bg-storm-dust-100 dark:text-black rounded-full h-9 px-4">
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <NavLink to="/login">
                  <Button variant="outline" className="bg-storm-dust-200 dark:bg-storm-dust-900 rounded-full h-9 px-5 cursor-pointer">
                    Sign In
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button className="cursor-pointer bg-storm-dust-900 text-white dark:bg-storm-dust-100 dark:text-black rounded-full h-9 px-5">Sign Up</Button>
                </NavLink>
              </div>
            )}
          </div>

          {/* Hamburger (Mobile) */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-storm-dust-900 dark:text-storm-dust-100">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      {isOpen && (
        <div className="absolute top-20 inset-x-4 md:hidden bg-white dark:bg-storm-dust-950 border border-storm-dust-200 dark:border-storm-dust-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-200">
          <div className="flex flex-col gap-4">
            <NavItems />
          </div>

          <hr className="border-storm-dust-100 dark:border-storm-dust-800" />

          <div className="flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard/profile" onClick={() => setIsOpen(false)} className="cursor-pointer flex items-center gap-3 p-2">
                  <User className="w-5 h-5" /> Account Profile
                </NavLink>
                <Button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    navigate("/");
                  }}
                  className="w-full justify-start gap-3 rounded-2xl cursor-pointer"
                  variant="destructive"
                >
                  <LogOut className="w-5 h-5" /> Log Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full rounded-2xl cursor-pointer">
                    Sign In
                  </Button>
                </NavLink>
                <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full cursor-pointer rounded-2xl bg-storm-dust-900 dark:bg-storm-dust-100">Sign Up</Button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
