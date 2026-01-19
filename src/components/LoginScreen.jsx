import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded credentials as requested
        if (username === 'hieunt' && password === 'hieunt196') {
            onLogin();
        } else {
            setError('Sai tài khoản hoặc mật khẩu!');
            // Shake effect logic could be added here
        }
    };

    return (
        <div className="login-screen-container">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="login-card"
            >
                <h2 className="login-title">
                    Private Access
                </h2>
                
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    
                    {error && <p className="login-error">{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default LoginScreen;
