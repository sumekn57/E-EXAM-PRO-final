import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const UpdateQuestion = ({ questions, setQuestions }) => {
    
    const { examID, questionID } = useParams();

    const [updatedQuestion, setUpdatedQuestion] = useState({
        questionID: questionID,
        question: "",
        options: ["", "", "", ""],
        correctAns: "",
    });

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();

        const response = await fetch(`/exams/${examID}/${questions._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionID: questionID,
                ...updatedQuestion,
            }),
        });

        const responseData = await response.json();

        if (response.ok) {
            const updatedQuestionIndex = questions.findIndex(q => q._id === examID);

            if (updatedQuestionIndex !== -1) {
                const updatedQuestions = [...questions];
                updatedQuestions[updatedQuestionIndex] = responseData.updatedQuestion;
                setQuestions(updatedQuestions);
            }
        }

        const fetchQuestionData = async () => {
            try {
                const response = await fetch(`/exams/${examID}/questions`);
                const data = await response.json();
                setQuestion(data);
            } catch (error) {
                console.error(error);
            }
        };


        return (
            <div className="flex justify-center items-center bg-gray-100">
                <div className="w-full max-w-md p-4">
                    <h2 className="text-2xl font-semibold mb-4">Update Question</h2>
                    <form onSubmit={handleUpdateQuestion} className="space-y-4">
                        <label className="block">
                            Question:
                            <input
                                type="text"
                                value={updatedQuestion.question}
                                onChange={e => setUpdatedQuestion({ ...updatedQuestion, question: e.target.value })}
                                className="w-full border border-gray-300 p-2 mt-1 rounded"
                            />
                        </label>
                        {updatedQuestion.options.map((option, index) => (
                            <label key={index} className="block">
                                Option {index + 1}:
                                <input
                                    type="text"
                                    value={option}
                                    onChange={e => {
                                        const updatedOptions = [...updatedQuestion.options];
                                        updatedOptions[index] = e.target.value;
                                        setUpdatedQuestion({ ...updatedQuestion, options: updatedOptions });
                                    }}
                                    className="w-full border border-gray-300 p-2 mt-1 rounded"
                                />
                            </label>
                        ))}
                        <label className="block">
                            Correct Answer:
                            <input
                                type="text"
                                value={updatedQuestion.correctAns}
                                onChange={e => setUpdatedQuestion({ ...updatedQuestion, correctAns: e.target.value })}
                                className="w-full border border-gray-300 p-2 mt-1 rounded"
                            />
                        </label>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Update Question
                        </button>
                    </form>
                </div>
            </div>
        );
    };
}

export default UpdateQuestion
