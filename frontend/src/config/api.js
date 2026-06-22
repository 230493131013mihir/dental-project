const getRuntimeApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (typeof window === "undefined") {
    return "http://localhost:3000";
  }

  const { hostname } = window.location;

  if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
    return `http://${hostname}:3000`;
  }

  return "http://localhost:3000";
};

export const API_BASE_URL = getRuntimeApiBaseUrl();

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

export const configureLocalhostAssetUrls = () => {
  if (typeof window === "undefined" || API_BASE_URL === "http://localhost:3000") {
    return;
  }

  const rewriteUrl = (value) =>
    typeof value === "string"
      ? value.replace("http://localhost:3000", API_BASE_URL)
      : value;

  const rewriteElement = (element) => {
    if (element?.tagName === "IMG" && element.src) {
      const nextSrc = rewriteUrl(element.src);

      if (nextSrc !== element.src) {
        element.src = nextSrc;
      }
    }
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        rewriteElement(mutation.target);
      }

      mutation.addedNodes.forEach((node) => {
        rewriteElement(node);
        node.querySelectorAll?.("img").forEach(rewriteElement);
      });
    });
  });

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img").forEach(rewriteElement);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });
  });
};
