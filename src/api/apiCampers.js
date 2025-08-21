import axios from "axios";

const API_BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("Response Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const campersAPI = {
  getCampers: async (params = {}) => {
    try {
      const response = await api.get("/campers", { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch campers: ${error.message}`);
    }
  },

  getCamperById: async (id) => {
    try {
      const response = await api.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch camper: ${error.message}`);
    }
  },

  searchCampers: async (filters) => {
    try {
      const params = {};

      if (filters.location) {
        params.location = filters.location;
      }

      if (filters.form) {
        params.form = filters.form;
      }

      if (filters.AC) params.AC = true;
      if (filters.kitchen) params.kitchen = true;
      if (filters.bathroom) params.bathroom = true;
      if (filters.TV) params.TV = true;
      if (filters.radio) params.radio = true;

      const response = await api.get("/campers", { params });
      return response.data;
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  },
};

export default api;
