import React, { useState } from 'react';
import axios from 'axios';

function GuardianApplicationForm({ onBack }) {
    const [formData, setFormData] = useState({
        application_type: 'guardian',
        full_name: '',
        email: '',
        phone: '',
        address: '',
        student_id: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('/applications', formData);
            setSubmitted(true);
        } catch (error) {
            setError(error.response?.data?.message || 'Application submission failed');
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

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="text-green-500 text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for applying as a guardian. Your application has been submitted successfully 
                        and is now under review. We will contact you soon.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Submit Another Application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 relative">
            <div className="max-w-2xl mx-auto">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="mb-4 text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    >
                        <span>←</span>
                        <span>Back</span>
                    </button>
                )}

                <div className="text-center mb-8">
                    <div className="mx-auto h-20 w-20 bg-green-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-white text-2xl font-bold">👨‍👩‍👧‍👦</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Guardian Registration</h1>
                    <p className="text-lg text-gray-600 mt-2">Register to monitor your child's progress</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-blue-800">
                            <strong>Note:</strong> You need your child's Student ID to register as a guardian. 
                            Your child must already be enrolled in the coaching center.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student ID *
                        </label>
                        <input
                            type="text"
                            name="student_id"
                            required
                            value={formData.student_id}
                            onChange={handleChange}
                            placeholder="e.g., KWR20250001"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Enter your child's student ID (provided during admission)
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            required
                            value={formData.full_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address *
                        </label>
                        <textarea
                            name="address"
                            required
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 font-medium"
                    >
                        {loading ? 'Submitting Application...' : 'Submit Application'}
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        <p>After submission, your application will be reviewed by our admissions team.</p>
                        <p>You will be contacted within 2-3 business days.</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default GuardianApplicationForm;