import React from 'react';

function LandingPage({ onNavigate }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">KWR</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Know With Rana</h1>
                                <p className="text-xs text-gray-500">Coaching Center</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onNavigate('login')}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Staff Login
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to Know With Rana
                    </h2>
                    <p className="text-xl text-gray-600 mb-2">
                        Quality Education Since 2010
                    </p>
                    <p className="text-lg text-gray-500">
                        Dogree Bazar, Naria, Shariatpur
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-indigo-600 mb-2">15+</div>
                        <div className="text-gray-600">Years of Excellence</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">120+</div>
                        <div className="text-gray-600">Active Students</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">7</div>
                        <div className="text-gray-600">Classes (6-12)</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">16</div>
                        <div className="text-gray-600">Hours Daily</div>
                    </div>
                </div>

                {/* Main Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Student Application */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">🎓</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Apply for Admission
                            </h3>
                            <p className="text-gray-600">
                                Join our coaching center and excel in your studies with expert guidance.
                            </p>
                        </div>
                        <button
                            onClick={() => onNavigate('apply')}
                            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Apply Now
                        </button>
                    </div>

                    {/* Parent Portal */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Parent Portal
                            </h3>
                            <p className="text-gray-600">
                                Track your child's progress, attendance, and payments online.
                            </p>
                        </div>
                        <button
                            onClick={() => onNavigate('parent-login')}
                            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Parent Login
                        </button>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                        Why Choose Know With Rana?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-4xl mb-4">📚</div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                Expert Teachers
                            </h4>
                            <p className="text-gray-600">
                                Experienced and qualified teachers dedicated to student success.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">⏰</div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                Flexible Timing
                            </h4>
                            <p className="text-gray-600">
                                Multiple batch timings from 7 AM to 11 PM to suit your schedule.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">💰</div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                Affordable Fees
                            </h4>
                            <p className="text-gray-600">
                                Quality education at affordable rates starting from ৳700/month.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-12 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-2 text-gray-600">
                        <p><strong>Owner:</strong> Rs Rana Sohel</p>
                        <p><strong>Location:</strong> Dogree Bazar, Naria, Shariatpur</p>
                        <p><strong>Established:</strong> 2010</p>
                        <p><strong>Classes:</strong> 6 to 12</p>
                        <p><strong>Timing:</strong> 7:00 AM - 11:00 PM</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LandingPage;