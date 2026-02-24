import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import StudentApplicationForm from './StudentApplicationForm';
import Dashboard from './Dashboard';

// Set up axios defaults
axios.defaults.baseURL = '/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('auth_token'));
    const [currentView, setCurrentView] = useState('landing'); // landing, login, apply, parent-login

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await axios.get('/me');
            setUser(response.data.user);
            setCurrentView('dashboard');
        } catch (error) {
            console.error('Failed to fetch user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('auth_token', authToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        setCurrentView('dashboard');
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
        delete axios.defaults.headers.common['Authorization'];
        setCurrentView('landing');
    };

    const navigate = (view) => {
        setCurrentView(view);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Render based on current view
    switch (currentView) {
        case 'landing':
            return <LandingPage onNavigate={navigate} />;
        case 'login':
            return <LoginForm onLogin={login} onBack={() => navigate('landing')} />;
        case 'apply':
            return <StudentApplicationForm onBack={() => navigate('landing')} />;
        case 'parent-login':
            return <LoginForm onLogin={login} onBack={() => navigate('landing')} isParent={true} />;
        case 'dashboard':
            return user ? <Dashboard user={user} onLogout={logout} /> : <LandingPage onNavigate={navigate} />;
        default:
            return <LandingPage onNavigate={navigate} />;
    }
}

export default App;