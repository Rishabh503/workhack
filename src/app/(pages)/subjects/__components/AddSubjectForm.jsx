"use client";

import { useState } from "react";

const AddSubjectForm = () => {
  const [subjectName, setSubjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch("/api/subjects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: subjectName }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg(`✅ Subject "${data.subject.name}" added successfully!`);
      } else {
        setResponseMsg(`❌ ${data.error}`);
      }
    } catch (error) {
      setResponseMsg("❌ Something went wrong. Try again.");
    }

    setLoading(false);
    setSubjectName("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#1e293b] text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add a Subject</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Enter subject name"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded transition"
        >
          {loading ? "Adding..." : "Add Subject"}
        </button>
      </form>
      {responseMsg && (
        <p className="mt-4 text-sm text-center">{responseMsg}</p>
      )}
    </div>
  );
};

export default AddSubjectForm;
