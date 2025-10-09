import React, { useState } from 'react';
import { FaBookOpen, FaCheckCircle } from 'react-icons/fa';

const Create = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    teacher: '',
    credits: '',
    semester: '',
    department: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData); // Pass new subject to parent
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    setFormData({
      subjectName: '',
      subjectCode: '',
      teacher: '',
      credits: '',
      semester: '',
      department: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <FaBookOpen />
          Create New Subject
        </h2>

        {submitted && (
          <div className="flex items-center gap-2 mb-4 text-green-600 bg-green-100 border border-green-300 px-4 py-3 rounded-md text-md font-medium">
            <FaCheckCircle />
            Subject created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subject Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Subject Code */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Teacher */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Dr. John Smith"
            />
          </div>

          {/* Credits */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credits
            </label>
            <input
              type="number"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Semester (Date input) */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Select Semester Date"
            />
          </div>

          {/* Department */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Department Name"
            />
          </div>

          {/* Submit */}
          <div className="col-span-1 md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-200"
            >
              Create Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
