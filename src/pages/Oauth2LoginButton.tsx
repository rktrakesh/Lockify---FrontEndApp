import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

const Oauth2Buttons = () => {
  const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:2020";

  return (
    <div className="flex flex-col gap-3">
      {/* GOOGLE: Added ?prompt=select_account */}
      <NavLink to={`${apiBase}/oauth2/authorization/google?prompt=select_account`} reloadDocument className="w-full">
        <Button variant="outline" type="button" className="w-full rounded-full flex items-center gap-2 h-11 cursor-pointer hover:bg-storm-dust-100 dark:hover:bg-storm-dust-900 transition-all">
          <FaGoogle className="text-slate-900 dark:text-white" />
          <span className="font-medium text-sm">Continue with Google</span>
        </Button>
      </NavLink>

      {/* GITHUB: Added ?prompt=login */}
      <NavLink to={`${apiBase}/oauth2/authorization/github?prompt=login`} reloadDocument className="w-full">
        <Button variant="outline" type="button" className="w-full rounded-full flex items-center gap-2 h-11 cursor-pointer hover:bg-storm-dust-100 dark:hover:bg-storm-dust-900 transition-all">
          <FaGithub className="text-slate-900 dark:text-white" />
          <span className="font-medium text-sm">Continue with GitHub</span>
        </Button>
      </NavLink>
    </div>
  );
};

export default Oauth2Buttons;
