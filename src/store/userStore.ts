import { create } from "zustand";

interface UserStore {
  email: string;
  accountBalance: number;
  transactions: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setUser: (user: {
    email: string;
    accountBalance: number;
    transactions: any;
  }) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  email: "",
  accountBalance: 0,
  transactions: [],
  isAuthenticated: false,
  loading: true,
  error: null,

  setUser: (user) =>
    set({
      email: user.email,
      accountBalance: user.accountBalance,
      transactions: user.transactions,
      isAuthenticated: true,
      loading: false,
      error: null,
    }),

  clearUser: () =>
    set({
      email: "",
      accountBalance: 0,
      transactions: [],
      isAuthenticated: false,
      loading: false,
      error: null,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error, loading: false }),
}));
