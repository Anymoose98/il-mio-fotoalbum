import { useState } from "react";

const useStorage = (initialValue, itemKey) => {

    const itemValue = localStorage.getItem(itemKey);
    
    if (itemValue === null) {
        localStorage.setItem(itemKey, JSON.stringify(initialValue));
    }

    const [state, setState] = useState(() => {
        try {
            return itemValue ? JSON.parse(itemValue) : initialValue;
        } catch (error) {
            console.error(`Impossibile parsare l'item "${itemKey}" nell'localStorage.`, error);
            return initialValue;
        }
    });

   
    const changeState = (payload) => {
        if (typeof payload === 'function') {
            setState(prevState => {
                const newState = payload(prevState);
                localStorage.setItem(itemKey, JSON.stringify(newState));
                return newState;
            });
        } else {
            setState(payload);
            localStorage.setItem(itemKey, JSON.stringify(payload));
        }
    };


    return [state, changeState];
};

export default useStorage;
