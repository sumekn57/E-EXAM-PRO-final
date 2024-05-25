import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateQuestion = ({ questionToUpdate, operationType, setDisplayQuestionCreationForm, resetCreateQuestionCompForm, isThisUserWhoCreateExam }) => {
    
    console.log(isThisUserWhoCreateExam);

    const { examID } = useParams();

    const defaultQuestionDetails = {
        question: "",
        options: ['', '', '', ''],
        correctAns: ""
    }

    const [questionDetails, setQuestionDetails] = useState(defaultQuestionDetails);

    useEffect(() => {
        if (questionToUpdate) {
            setQuestionDetails(questionToUpdate)
        }
    }, [questionToUpdate])


    const handleOptionChange = (index, value) => {
        const updatedOptions = [...questionDetails.options];
        updatedOptions[index] = value;
        setQuestionDetails({ ...questionDetails, options: updatedOptions });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!questionDetails.question) {
            toast.warning("Enter the question please");
            return
        }

        if (!questionDetails.correctAns) {
            toast.warning("No correct answers is selected");
            return
        }

        let response;

        if (operationType === "Add") {
            response = await fetch(`/exams/${examID}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questionDetails)
            });
        } else {

            const updatedQuestionDetails = { ...questionDetails, questionID: questionDetails._id }

            response = await fetch(`/exams/${examID}/questions`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedQuestionDetails)
            });
        }

        const responseData = await response.json();

        toast(responseData.message);

        if (response.ok) {

            setQuestionDetails(defaultQuestionDetails);

            if (operationType === "Add") {
                setDisplayQuestionCreationForm(false)
                return;
            }

            resetCreateQuestionCompForm();

        }
    };

    return (
        <div className=" bg-gray-100 w-[60%] rounded">

            <ToastContainer />

            <div className="bg-white p-8 shadow-md rounded-md">

                <h1 className="text-2xl font-bold mb-4">{operationType} a New Question</h1>

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
                                checked={questionDetails.correctAns ? questionDetails.correctAns === questionDetails.options[index] : false}
                                onChange={() => setQuestionDetails({ ...questionDetails, correctAns: questionDetails.options[index] })}
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

                    {
                        isThisUserWhoCreateExam && (
                            <>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md mt-4"
                                >
                                    {operationType} Question
                                </button>

                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-600 text-white px-10 ml-10 py-2 rounded-md mt-4"
                                    onClick={() => setDisplayQuestionCreationForm(false)}
                                >
                                    Exit
                                </button>
                            </>
                        )
                    }



                </form>

            </div>

        </div>
    );
};



export default CreateQuestion;
