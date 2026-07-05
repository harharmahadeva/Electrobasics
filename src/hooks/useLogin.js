import { useState } from "react";
import { login } from "../services/authService";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signIn(userId, password) {
    setLoading(true);
    setError("");

    const result = await login(userId, password);

    setLoading(false);

    if (!result.success) {
      setError(result.message);
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