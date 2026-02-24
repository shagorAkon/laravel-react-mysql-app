import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin, onBack, isParent = false }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/login', formData);
            onLogin(response.data.user, response.data.token);
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                        >
                            <span>←</span>
                            <span>Back</span>
                        </button>
                    )}
                    <div className="mx-auto h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">KWR</span>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Know With Rana
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isParent ? 'Parent Portal Login' : 'Staff Login - Coaching Center Management System'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Dogree Bazar, Naria, Shariatpur
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <div className="mt-6 text-center">
                            <div className="text-sm text-gray-600">
                                <p className="font-medium">Demo Credentials:</p>
                                <p>Super Admin: rana@knowwithrana.com / password123</p>
                                <p>Admin: admin@knowwithrana.com / admin123</p>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="text-center text-xs text-gray-500">
                    <p>Established 2010 • Serving 70-120 Students</p>
                    <p>Owner: Rs Rana Sohel</p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;