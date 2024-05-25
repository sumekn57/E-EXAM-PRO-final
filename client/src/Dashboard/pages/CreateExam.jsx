import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserDataFromLocalStorage } from '../../utils/getUserDataFromLocalStorage';

const CreateExam = () => {

  const defaultexamDetails = {
    title: '',
    duration: '',
    subject: '',
    examDate: '',
    examTime: ''
  }
  // 2023-8-23 9:36 PM
  const [examDetails, setExamDetails] = useState(defaultexamDetails)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, duration, subject, examDate, examTime } = examDetails;

    // now combining the date and time into single DateTime string
    const examDateTime = new Date(`${examDate} ${examTime}`);


    const examData = {
      title,
      duration: parseInt(duration),
      subject,
      teacher: getUserDataFromLocalStorage()?.user._id,
      date: examDateTime // converting to timestamp
    };

    try {
      const response = await fetch('/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(examData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message);
        setExamDetails(defaultexamDetails);
      } else {
        toast.error('Failed to create exam');
      }
    } catch (error) {
      console.error('Error creating exam:', error);
      toast.error('An error occurred while creating the exam');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };


  return (
    <div>
      <ToastContainer />
      <div className="px-4 py-2 mb-3 bg-gray-800">
        <h1 className="text-lg font-semibold text-white">Create Exam</h1>
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={examDetails.title}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={examDetails.subject}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="examDate" className="block text-sm font-medium text-gray-700">
              Exam Date
            </label>
            <input
              type="date"
              id="examDate"
              name="examDate"
              value={examDetails.examDate}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="examDate" className="block text-sm font-medium text-gray-700">
              Exam Time
            </label>
            <input
              type="time"
              id="examTime"
              name="examTime"
              value={examDetails.examTime}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={examDetails.duration}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Exam
          </button>
        </form>

      </div>

    </div>
  );
};

export default CreateExam;
