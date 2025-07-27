import React from "react";
import { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [opponent, setOpponent] = useState('');

    return (
        <UserContext.Provider value={{name, setName, opponent, setOpponent}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
