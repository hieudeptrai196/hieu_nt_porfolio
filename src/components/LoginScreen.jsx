import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0f0f1a', // Dark background matching theme
            color: '#fff',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 99999
        }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '40px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <h2 style={{ marginBottom: '20px', background: 'linear-gradient(to right, #00c6ff, #0072ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Private Access
                </h2>
                
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    
                    {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', margin: '5px 0' }}>{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        style={styles.button}
                    >
                        Login
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

const styles = {
    input: {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '12px 15px',
        borderRadius: '8px',
        color: '#fff',
        outline: 'none',
        fontSize: '1rem',
        transition: 'border-color 0.3s'
    },
    button: {
        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px'
    }
};

export default LoginScreen;
