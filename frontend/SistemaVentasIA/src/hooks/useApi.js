import { API_BASE_URL } from "../utils/config";
import useAuth from "./useAuth";

export default function useApi() {
  const { token } = useAuth();

  const request = async (path, { method='GET', body, headers } = {}) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers || {})
      },
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json().catch(()=> ({}));
    if (!res.ok) {
      const msg = data?.error || `HTTP ${res.status}`;
      throw new Error(msg);
    }
    return data;
  };

  return {
    get: (path) => request(path),
    post: (path, body) => request(path, { method:'POST', body }),
    put: (path, body) => request(path, { method:'PUT', body }),
    del: (path) => request(path, { method:'DELETE' })
  };
}
