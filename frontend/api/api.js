import axios from 'axios';
import {
  getAllProductsAndCategories,
  getCartSpecs,
  getRecommendedProducts,
} from './server/server';

export const getCountry = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/', {
      timeout: 5000,
    });
    return response.data.country;
  } catch (error) {
    return 'IN';
  }
};

// MOCK APIs

export const getProductsCategoriesApi = (req) => {
  return getAllProductsAndCategories(req);
};

export const getRecommendedApi = (req) => {
  return getRecommendedProducts(req);
};

export const getCartValue = (req) => {
  return getCartSpecs(req);
};
