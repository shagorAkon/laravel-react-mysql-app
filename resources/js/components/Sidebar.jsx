import React from 'react';

function Sidebar({ user, activeTab, setActiveTab, onLogout }) {
    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: '📊', roles: ['super_admin', 'admin', 'teacher'] },
        { id: 'students', name: 'Students', icon: '👥', roles: ['super_admin', 'admin', 'teacher'] },
        { id: 'classes', name: 'Classes', icon: '📚', roles: ['super_admin', 'admin'] },
        { id: 'batches', name: 'Batches', icon: '⏰', roles: ['super_admin', 'admin'] },
        { id: 'payments', name: 'Payments', icon: '💰', roles: ['super_admin', 'admin'] },
        { id: 'attendance', name: 'Attendance', icon: '✅', roles: ['super_admin', 'admin', 'teacher'] },
        { id: 'reports', name: 'Reports', icon: '📈', roles: ['super_admin', 'admin'] },
        { id: 'settings', name: 'Settings', icon: '⚙️', roles: ['super_admin'] },
    ];

    const filteredMenuItems = menuItems.filter(item => 
        item.roles.includes(user.role?.name)
    );

    return (
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">KWR</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Know With Rana</h2>
                        <p className="text-xs text-gray-500">Est. 2010</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {filteredMenuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeTab === item.id
                                ? 'bg-indigo-100 text-indigo-700 border-r-2 border-indigo-600'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Logged in as</p>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-indigo-600">{user.role?.display_name}</p>
                </div>
                
                <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <span>🚪</span>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;