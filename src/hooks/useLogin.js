import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn: authSignIn } = useAuth();

  async function signIn(userId, password) {
    setLoading(true);
    setError("");

    const result = await authSignIn(userId, password);

    setLoading(false);

    if (!result.success) {
      setError(result.message || "Invalid User ID or password.");
      return null;
    }

    return result.user;
  }

  return {
    loading,
    error,
    signIn,
  };
}
