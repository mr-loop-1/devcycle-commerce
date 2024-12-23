import React, { createContext, useContext, useState } from 'react';

const InspectContext = createContext();

export const useInspect = () => {
  return useContext(InspectContext);
};

export const InspectProvider = ({ children }) => {
  const [inspect, setInspect] = useState(false);
  return (
    <InspectContext.Provider value={{ inspect, setInspect }}>
      {children}
    </InspectContext.Provider>
  );
};
