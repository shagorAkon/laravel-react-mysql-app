import React from 'react';

function DashboardStats({ stats, user }) {
    if (!stats) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Students',
            value: stats.stats.total_students,
            icon: '👥',
            color: 'bg-blue-500',
            textColor: 'text-blue-600'
        },
        {
            title: 'Pending Applications',
            value: stats.stats.pending_applications,
            icon: '⏳',
            color: 'bg-yellow-500',
            textColor: 'text-yellow-600'
        },
        {
            title: 'Monthly Revenue',
            value: `৳${stats.stats.monthly_revenue.toLocaleString()}`,
            icon: '💰',
            color: 'bg-green-500',
            textColor: 'text-green-600'
        },
        {
            title: 'Active Batches',
            value: stats.stats.total_batches,
            icon: '⏰',
            color: 'bg-purple-500',
            textColor: 'text-purple-600'
        }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {user.name}!
                </h2>
                <p className="text-indigo-100">
                    Here's what's happening at {stats.coaching_info.name} today.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
                            </div>
                            <div className={`${card.color} p-3 rounded-full`}>
                                <span className="text-white text-xl">{card.icon}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activities and Coaching Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Student Applications */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Recent Student Applications
                    </h3>
                    {stats.recent_students.length > 0 ? (
                        <div className="space-y-3">
                            {stats.recent_students.map((student) => (
                                <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{student.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {student.coaching_class?.display_name} - {student.batch?.name}
                                        </p>
                                    </div>
                                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                        Pending
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No recent applications</p>
                    )}
                </div>

                {/* Coaching Center Info */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Coaching Center Information
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Owner:</span>
                            <span className="font-medium">{stats.coaching_info.owner}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Established:</span>
                            <span className="font-medium">{stats.coaching_info.established}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium text-right">{stats.coaching_info.location}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Student Range:</span>
                            <span className="font-medium">{stats.coaching_info.student_range}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Fee Range:</span>
                            <span className="font-medium">{stats.coaching_info.fee_range}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Monthly Income:</span>
                            <span className="font-medium text-green-600">{stats.coaching_info.monthly_income}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            {(user.role?.name === 'super_admin' || user.role?.name === 'admin') && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
                            <div className="text-2xl mb-2">👥</div>
                            <div className="text-sm font-medium text-blue-700">Add Student</div>
                        </button>
                        <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                            <div className="text-2xl mb-2">💰</div>
                            <div className="text-sm font-medium text-green-700">Record Payment</div>
                        </button>
                        <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
                            <div className="text-2xl mb-2">✅</div>
                            <div className="text-sm font-medium text-purple-700">Take Attendance</div>
                        </button>
                        <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
                            <div className="text-2xl mb-2">📢</div>
                            <div className="text-sm font-medium text-orange-700">Send Notice</div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardStats;