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

export const getCategoriesApi = () => {};

export const getProductsCategoriesApi = () => {};

export const getRecommendedApi = () => {};
