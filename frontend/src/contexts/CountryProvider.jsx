import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '@/components/Spinner';

const CountryContext = createContext();

export const useCountry = () => {
  return useContext(CountryContext);
};

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    (async () => {
      const storedCountry = localStorage.getItem('country');

      if (storedCountry) {
        setCountry(storedCountry);
      } else {
        try {
          const response = await axios.get('https://ipapi.co/json/', {
            timeout: 5000,
          });

          const countryFromApi = response.data.country;

          localStorage.setItem('country', countryFromApi);
          setCountry(countryFromApi);
        } catch (error) {
          localStorage.setItem('country', 'US');
          setCountry('US');
        }
      }
    })();
  }, []);

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {country ? children : <LoadingSpinner />}
    </CountryContext.Provider>
  );
};
