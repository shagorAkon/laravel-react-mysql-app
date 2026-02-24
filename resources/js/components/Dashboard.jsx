import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import DashboardStats from './DashboardStats';
import StudentManagement from './StudentManagement';

function Dashboard({ user, onLogout }) {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await axios.get('/dashboard/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardStats stats={stats} user={user} />;
            case 'students':
                return <StudentManagement user={user} />;
            case 'classes':
                return <div className="p-6"><h2 className="text-2xl font-bold">Class Management</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>;
            case 'batches':
                return <div className="p-6"><h2 className="text-2xl font-bold">Batch Management</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>;
            case 'payments':
                return <div className="p-6"><h2 className="text-2xl font-bold">Payment Management</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>;
            case 'attendance':
                return <div className="p-6"><h2 className="text-2xl font-bold">Attendance Management</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>;
            case 'reports':
                return <div className="p-6"><h2 className="text-2xl font-bold">Reports</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>;
            case 'settings':
                return <div className="p-6"><h2 className="text-2xl font-bold">Settings</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>;
            default:
                return <DashboardStats stats={stats} user={user} />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar 
                user={user} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                onLogout={onLogout}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Know With Rana
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Coaching Center Management System
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.role?.display_name}</p>
                                </div>
                                <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;