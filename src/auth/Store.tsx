import type User from "@/models/UserDto";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, logoutUser } from "@/service/AuthService";
import type LoginData from "@/models/LoginData";

const LOCAL_STORAGE_KEY = "auth_key";

// auth state
interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  logout: (options?: { silent?: boolean }) => Promise<void>;
  checkLogin: () => boolean | undefined;
  changeLocalLoginData: (accessToken: string, user: User, isAuthenticated: boolean) => void;
}

// global auth state management using zustand
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      isAuthenticated: false,
      authLoading: false,
      user: null,
      changeLocalLoginData: (accessToken, user, isAuthenticated) => {
        set({
          accessToken,
          user,
          isAuthenticated,
        });
      },
      login: async (data: LoginData) => {
        try {
          set({ authLoading: true });
          const loginResponseData = await loginUser(data);
          set({
            accessToken: loginResponseData.accessToken,
            isAuthenticated: true,
            user: loginResponseData.userDto,
            authLoading: false, // Don't forget to stop loading in store too
          });
        } catch (error) {
          set({ authLoading: false });
          // CRITICAL: You must re-throw the error so the component's catch block sees it
          throw error;
        }
      },
      logout: async () => {
        try {
          set({
            authLoading: true,
          });
          await logoutUser();
        } catch (e) {
          throw e;
        } finally {
          set({
            authLoading: false,
          });
        }
        set({
          accessToken: null,
          isAuthenticated: false,
          authLoading: false,
          user: null,
        });
      },
      checkLogin: () => {
        if (get().accessToken && get().authLoading) return true;
        else return false;
      },
    }),
    { name: LOCAL_STORAGE_KEY },
  ),
);

export default useAuthStore;
