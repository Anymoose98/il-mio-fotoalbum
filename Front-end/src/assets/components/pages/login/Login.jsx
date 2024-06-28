import React, { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import LoginPageStyles from "./Login.module.scss";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(formData); 
            navigate('/create')
        } catch (error) {
            console.error('Errore durante il login:', error);
            setLoginError(true); 
        }
    }

    const changeData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center"><h1>Login</h1></div>
                    <div>
                        {loginError && <div className="alert alert-danger">Dati errati</div>}
                        <form onSubmit={handleLogin} className="d-flex flex-wrap justify-content-center align-items-center">
                            <div className="col-6 d-flex align-items-center justify-content-center">
                                <input className='form-control mx-1'
                                    required
                                    type="text"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => changeData('email', e.target.value)}
                                />
                            </div>
                            <div className="col-6 justify-content-center d-flex align-items-center">
                                <input className='form-control mx-1'
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => changeData('password', e.target.value)}
                                />
                            </div>
                            <div className="col-12 my-3 text-center">
                                <button type="submit" className="btn btn-primary">Loggati</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;
