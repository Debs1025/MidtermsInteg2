import React, { useState, useEffect } from "react";

const Info = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");

  // Fetch students and subjects from backend
  useEffect(() => {
    fetch("https://your-backend-api.com/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));

    fetch("https://your-backend-api.com/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error("Error fetching subjects:", err));
  }, []);

  // Handler for grade input to limit length and value
  const handleGradeChange = (e) => {
    const value = e.target.value;

    // Allow empty input
    if (value === "") {
      setGrade("");
      return;
    }

    // Regex to allow only numbers and at most one decimal point
    const regex = /^\d{0,3}(\.\d{0,2})?$/;
    if (!regex.test(value)) {
      return; // Ignore invalid input
    }

    // Prevent input greater than 100
    const numericValue = parseFloat(value);
    if (numericValue > 100) {
      return;
    }

    setGrade(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericGrade = parseFloat(grade);

    if (!selectedStudent || !selectedSubject || grade === "") {
      setMessage("All fields are required.");
      return;
    }

    if (
      isNaN(numericGrade) ||
      numericGrade < 0 ||
      numericGrade > 100 ||
      grade.length < 2 ||
      grade.length > 5 // e.g., max length for "100" or "99.99"
    ) {
      setMessage("Grade must be a valid number between 0 and 100 with 2-3 digits.");
      return;
    }

    const payload = {
      studentId: selectedStudent,
      subjectCode: selectedSubject,
      grade: numericGrade,
    };

    try {
      const response = await fetch("https://your-backend-api.com/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to assign grade.");
      }

      setMessage("Grade successfully assigned!");
      setSelectedStudent("");
      setSelectedSubject("");
      setGrade("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
        Assign Grade
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-blue-200 space-y-6"
      >
        <div>
          <label className="block text-blue-800 font-semibold mb-1">
            Select Student:
          </label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded"
          >
            <option value="">-- Choose a student --</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-blue-800 font-semibold mb-1">
            Select Subject:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded"
          >
            <option value="">-- Choose a subject --</option>
            {subjects.flatMap((group) =>
              group.subjects.map((subject) => (
                <option key={subject.subjectCode} value={subject.subjectCode}>
                  {subject.subjectName} ({group.department})
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-blue-800 font-semibold mb-1">
            Grade:
          </label>
          <input
            type="text"
            value={grade}
            onChange={handleGradeChange}
            placeholder="0 - 100"
            className="w-full p-2 border border-blue-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Assign Grade
        </button>

        {message && (
          <p className="text-center mt-4 text-blue-800 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Info;
