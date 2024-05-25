import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuestionsList from './QuestionList';

const CreateQuestion = ({ examDetails }) => {
    const { examID } = useParams();
    const defaultQuestionDetails = {
        examID: 123,
        question: "",
        options: ['', '', '', ''],
        correctAns: ""
    };

    const [examData, setExamData] = useState([]);
    const [questionDetails, setQuestionDetails] = useState(defaultQuestionDetails);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...questionDetails.options];
        updatedOptions[index] = value;
        setQuestionDetails({ ...questionDetails, options: updatedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/exams/${examID}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionDetails)
        });



        if (response.ok) {
            const responseData = await response.json();
            toast(responseData.message);
            setExamData([responseData.data]);
            setQuestionDetails(defaultQuestionDetails);
        } else {
            toast.error('Failed to create question');
        }
    };

    return (
        <div className="mt-5 bg-gray-100">

            <ToastContainer />
            <div className="bg-white p-8 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Create a New Question</h1>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-semibold">Question:</label>
                    <input
                        type="text"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full mb-4"
                        value={questionDetails.question}
                        onChange={(e) => setQuestionDetails({ ...questionDetails, question: e.target.value })}
                    />
                    <label className="block mb-2 font-semibold">Options:</label>
                    {questionDetails.options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="correctAnswer"
                                value={index.toString()}
                                checked={questionDetails.correctAns === index.toString()}
                                onChange={() => setQuestionDetails({ ...questionDetails, correctAns: index.toString() })}
                                className="mr-2"
                            />
                            <input
                                type="text"
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                    >
                        Create Question
                    </button>
                </form>
            </div>

        </div>
    );
};

export default CreateQuestion;
