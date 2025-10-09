import React, { useState, useEffect } from "react";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]); // Store fetched subjects data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state
  
  // Fetch subjects data from API
  useEffect(() => {
    // Replace this URL with your actual backend API URL
    const apiUrl = "https://your-backend-api.com/subjects"; 
    
    // Fetch data from the backend API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON data from response
      })
      .then((data) => {
        setSubjects(data); // Update the state with fetched data
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(error.message);  // Set error message if an error occurs
        setLoading(false);        // Set loading to false if there's an error
      });
  }, []); // Empty dependency array means this will run only once when component mounts
  
  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 px-6 py-12">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-12 text-center">
          Loading subjects...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-50 px-6 py-12">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-12 text-center">
          Error: {error}
        </h1>
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="min-h-screen bg-blue-50 px-6 py-12">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-12 text-center">
          No subjects found.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-12">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-12 text-center">
        Subjects by Department
      </h1>

      {subjects.map(({ department, subjects }) => (
        <section key={department} className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
            {department}
          </h2>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map(
              ({ subjectName, subjectCode, teacher, credits, semester }, idx) => (
                <div
                  key={`${subjectCode}-${idx}`}
                  className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    {subjectName}
                  </h3>
                  <p className="text-blue-700 font-semibold mb-1">
                    Code: <span className="font-normal">{subjectCode}</span>
                  </p>
                  <p className="text-blue-700 font-semibold mb-1">
                    Teacher: <span className="font-normal">{teacher}</span>
                  </p>
                  {credits !== undefined && (
                    <p className="text-blue-700 font-semibold mb-1">
                      Credits: <span className="font-normal">{credits}</span>
                    </p>
                  )}
                  {semester && (
                    <p className="text-blue-700 font-semibold">
                      Semester: <span className="font-normal">{semester}</span>
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default SubjectList;
