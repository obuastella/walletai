import { create } from "zustand";

interface UserStore {
  email: string;
  accountBalance: number;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setUser: (user: { email: string; accountBalance: number }) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  email: "",
  accountBalance: 0,
  isAuthenticated: false,
  loading: true,
  error: null,

  setUser: (user) =>
    set({
      email: user.email,
      accountBalance: user.accountBalance,
      isAuthenticated: true,
      loading: false,
      error: null,
    }),

  clearUser: () =>
    set({
      email: "",
      accountBalance: 0,
      isAuthenticated: false,
      loading: false,
      error: null,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error, loading: false }),
}));
