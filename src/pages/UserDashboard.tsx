import useAuthStore from "@/auth/Store";
import { Navigate, Outlet } from "react-router";

function UserDashboard() {
  // 1. Subscribe to the actual data, not just the check function
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 3. Use the reactive value for the check
  if (isAuthenticated) {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default UserDashboard;
