
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userIdFromToken, setUserIdFromToken] = useState(null);
    console.log(userIdFromToken);
  return (
    <UserContext.Provider value={{ userIdFromToken, setUserIdFromToken }}>
      {children}
    </UserContext.Provider>
  );
};
