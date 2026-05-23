export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const configureApiClient = (axios) => {
  axios.interceptors.request.use((config) => {
    if (typeof config.url === "string") {
      config.url = config.url.replace("http://localhost:3000", API_BASE_URL);
    }

    return config;
  });
};
