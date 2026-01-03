import { create } from 'zustand'

export const useAuthStore = create(set => ({
  access: null,
  refresh: null,
  isAuthenticated: false,

  login: (access, refresh) => set({
    access,
    refresh,
    isAuthenticated: true
  }),

  logout: () => set({
    access: null,
    refresh: null,
    isAuthenticated: false
  }),
}))
