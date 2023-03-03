import { getAuth, User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuthChangeStatusCheck() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(
      (user) => {
        setUser(user);
      },
      (error) => setError(error.message)
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return { user, error, loading };
}
