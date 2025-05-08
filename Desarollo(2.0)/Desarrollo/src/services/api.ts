import axios from 'axios';

const API_URL = 'https://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Configurar interceptores para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface Car {
    id?: number;
    make: string;
    model: string;
    year: number;
    price: number;
    description?: string;
    imageUrl?: string;
    isAvailable: boolean;
}

export const carService = {
    getAllCars: async () => {
        const response = await api.get<Car[]>(`/cars`);
        return response.data;
    },

    getCarById: async (id: number) => {
        const response = await api.get<Car>(`/cars/${id}`);
        return response.data;
    },

    createCar: async (car: Car) => {
        const response = await api.post<Car>(`/cars`, car);
        return response.data;
    },

    searchCars: async (query: string) => {
        const response = await api.get<Car[]>(`/cars/search?query=${query}`);
        return response.data;
    }
};