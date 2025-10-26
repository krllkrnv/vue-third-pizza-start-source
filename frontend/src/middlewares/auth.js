import { useAuthStore } from "@/stores/auth.js";

export default async ({ to, from }) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    const isAuthenticated = await authStore.getMe();

    if (!isAuthenticated) {
      return "/login";
    }
  }

  return true;
};
