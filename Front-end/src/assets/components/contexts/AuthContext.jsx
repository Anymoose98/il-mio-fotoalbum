import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useStorage from "./useStorage";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useStorage(null, 'user');
    const isLoggedIn = user !== null;

    const login = async (payload, redirectTo = '/') => {
        try {
            const { data: response } = await axios.post('http://localhost:3000/identificazione/login', payload);
            setUser(response.user); 
            localStorage.setItem('accessToken', response.token);
            navigate(redirectTo);
        } catch (err) {
            const { message, errors } = err.response.data;
            const error = new Error(errors ? 'Errore durante il login' : message);
            error.errors = errors;
            throw error;
        }
    }

    const signup = async (payload) => {
        console.log(payload)
        try {
            if (!payload.name) delete payload.name;
            const { data: response } = await axios.post('http://localhost:3000/identificazione/register', payload, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setUser(response.user);
            localStorage.setItem('accessToken', response.token);
            navigate('/');
        } catch (err) {
            const { message, errors } = err.response.data;
            const error = new Error('Errore di Signup');
            error.errors = errors;
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
        navigate('/login');
    }

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('Non sei dentro al Auth Provider.');
    }
    return context;
};

export { AuthProvider, useAuth };