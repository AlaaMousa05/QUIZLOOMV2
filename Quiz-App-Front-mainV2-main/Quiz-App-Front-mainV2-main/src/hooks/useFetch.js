import { useState, useEffect } from "react";
import { api } from "../api/baseUrl";
export function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await api.get(`/${endpoint}`);
        if (active) setData(res.data);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
