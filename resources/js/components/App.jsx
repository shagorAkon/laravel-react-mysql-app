import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('Loading...');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Test API call to Laravel backend
        axios.get('/api/test')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                setMessage('Welcome to Laravel + React!');
            });

        // Fetch users (example)
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log('Users endpoint not ready yet');
            });
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Laravel + React Application
                    </h1>
                    <p className="text-lg text-gray-600">{message}</p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            Frontend Features
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>✅ React 19 with Hooks</li>
                            <li>✅ Laravel Mix for bundling</li>
                            <li>✅ Axios for API calls</li>
                            <li>✅ Tailwind CSS ready</li>
                            <li>✅ Component-based architecture</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            Backend Features
                        </h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>✅ Laravel 8 Framework</li>
                            <li>✅ MySQL Database</li>
                            <li>✅ RESTful API endpoints</li>
                            <li>✅ Authentication ready</li>
                            <li>✅ Migration system</li>
                        </ul>
                    </div>
                </div>

                {users.length > 0 && (
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            Users from Database
                        </h2>
                        <div className="grid gap-4">
                            {users.map(user => (
                                <div key={user.id} className="border-l-4 border-blue-500 pl-4">
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;