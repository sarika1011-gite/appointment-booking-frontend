import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://appointment-booking-backend-production-70f3.up.railway.app/api",
});

export default api;
