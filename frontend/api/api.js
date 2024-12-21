import axios from 'axios';

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
  const { isSale, sortAlgorithm } = req;
};

export const getRecommendedApi = (req) => {};

export const getCartValue = (req) => {};
