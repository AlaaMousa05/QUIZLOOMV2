import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserFromStorage } from "../../Slices/authSlice";

export function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        dispatch(
          setUserFromStorage({
            user: JSON.parse(storedUser),
            token: storedToken,
          })
        );
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setInitialized(true);
  }, [dispatch]);

  if (!initialized) return null;

  return children;
}
