import React, { useState } from 'react';
import StudentApplicationForm from './StudentApplicationForm';
import GuardianApplicationForm from './GuardianApplicationForm';

function ApplyNow({ onBack }) {
    const [applicationType, setApplicationType] = useState(null);

    if (applicationType === 'student') {
        return <StudentApplicationForm onBack={() => setApplicationType(null)} />;
    }

    if (applicationType === 'guardian') {
        return <GuardianApplicationForm onBack={() => setApplicationType(null)} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
            <div className="max-w-4xl w-full">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="mb-4 text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    >
                        <span>←</span>
                        <span>Back to Home</span>
                    </button>
                )}

                <div className="text-center mb-12">
                    <div className="mx-auto h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-white text-2xl font-bold">KWR</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply Now</h1>
                    <p className="text-lg text-gray-600">Choose your application type</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Student Application */}
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">🎓</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Register as Student
                            </h3>
                            <p className="text-gray-600">
                                Apply for admission to join our coaching center and excel in your studies.
                            </p>
                        </div>
                        <ul className="space-y-2 text-gray-600 mb-6">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Classes 6 to 12</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Multiple batch timings</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Expert teachers</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Affordable fees (৳700-৳8000)</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => setApplicationType('student')}
                            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Apply as Student
                        </button>
                    </div>

                    {/* Guardian Application */}
                    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Register as Guardian
                            </h3>
                            <p className="text-gray-600">
                                Register as a parent/guardian to monitor your child's progress and activities.
                            </p>
                        </div>
                        <ul className="space-y-2 text-gray-600 mb-6">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Track child's attendance</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>View payment history</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Receive notifications</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Monitor progress reports</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => setApplicationType('guardian')}
                            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Apply as Guardian
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-600">
                    <p>All applications are subject to approval by the administration.</p>
                    <p>You will be notified via email once your application is reviewed.</p>
                </div>
            </div>
        </div>
    );
}

export default ApplyNow;