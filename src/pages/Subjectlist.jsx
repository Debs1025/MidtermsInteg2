import React from "react";

const SubjectList = ({ subjects }) => {
  // subjects will be passed from parent component
  // grouped by department like:
  // [
  //   { department: "CS", subjects: [ {...}, {...} ] },
  //   { department: "Math", subjects: [...] }
  // ]

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
