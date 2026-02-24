import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentApplicationForm({ onBack }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        address: '',
        school_name: '',
        class_id: '',
        batch_id: '',
        parent_name: '',
        parent_email: '',
        parent_phone: '',
        parent_relation: 'father'
    });
    const [classes, setClasses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        if (formData.class_id) {
            fetchBatches(formData.class_id);
        }
    }, [formData.class_id]);

    const fetchClasses = async () => {
        try {
            // For now, we'll use hardcoded data since we need to create the classes API endpoint
            setClasses([
                { id: 1, display_name: 'Class 6', monthly_fee: 700 },
                { id: 2, display_name: 'Class 7', monthly_fee: 800 },
                { id: 3, display_name: 'Class 8', monthly_fee: 1000 },
                { id: 4, display_name: 'Class 9', monthly_fee: 1500 },
                { id: 5, display_name: 'Class 10', monthly_fee: 2000 },
                { id: 6, display_name: 'Class 11', monthly_fee: 3000 },
                { id: 7, display_name: 'Class 12', monthly_fee: 3500 }
            ]);
        } catch (error) {
            console.error('Failed to fetch classes:', error);
        }
    };

    const fetchBatches = async (classId) => {
        try {
            // Hardcoded batch data for demo
            setBatches([
                { id: 1, name: 'Morning Batch A (7:00 AM - 8:30 AM)' },
                { id: 2, name: 'Morning Batch B (8:45 AM - 10:15 AM)' },
                { id: 3, name: 'Afternoon Batch A (2:00 PM - 3:30 PM)' },
                { id: 4, name: 'Evening Batch A (5:30 PM - 7:00 PM)' }
            ]);
        } catch (error) {
            console.error('Failed to fetch batches:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('/api/student-application', formData);
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
                        Thank you for applying to Know With Rana. Your application has been submitted successfully 
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

    const selectedClass = classes.find(c => c.id == formData.class_id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 relative">
            <div className="max-w-2xl mx-auto">
                {/* Back Button */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="mb-4 text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    >
                        <span>←</span>
                        <span>Back to Home</span>
                    </button>
                )}
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-white text-2xl font-bold">KWR</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Know With Rana</h1>
                    <p className="text-lg text-gray-600 mt-2">Student Admission Application</p>
                    <p className="text-sm text-gray-500">Dogree Bazar, Naria, Shariatpur</p>
                </div>

                {/* Application Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date of Birth *
                            </label>
                            <input
                                type="date"
                                name="date_of_birth"
                                required
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender *
                            </label>
                            <select
                                name="gender"
                                required
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                School Name
                            </label>
                            <input
                                type="text"
                                name="school_name"
                                value={formData.school_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Class *
                            </label>
                            <select
                                name="class_id"
                                required
                                value={formData.class_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select Class</option>
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.display_name} - ৳{cls.monthly_fee}/month
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Batch *
                            </label>
                            <select
                                name="batch_id"
                                required
                                value={formData.batch_id}
                                onChange={handleChange}
                                disabled={!formData.class_id}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                            >
                                <option value="">Select Batch</option>
                                {batches.map(batch => (
                                    <option key={batch.id} value={batch.id}>
                                        {batch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedClass && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Monthly Fee:</strong> ৳{selectedClass.monthly_fee}
                            </p>
                        </div>
                    )}

                    <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Parent/Guardian Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Parent/Guardian Name *
                            </label>
                            <input
                                type="text"
                                name="parent_name"
                                required
                                value={formData.parent_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Relation *
                            </label>
                            <select
                                name="parent_relation"
                                required
                                value={formData.parent_relation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="father">Father</option>
                                <option value="mother">Mother</option>
                                <option value="guardian">Guardian</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Parent Email *
                            </label>
                            <input
                                type="email"
                                name="parent_email"
                                required
                                value={formData.parent_email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Parent Phone *
                            </label>
                            <input
                                type="tel"
                                name="parent_phone"
                                required
                                value={formData.parent_phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 font-medium"
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

export default StudentApplicationForm;