import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { formatDateTime } from '../../utils/formatDateAndTime';
import QuestionsList from '../components/QuestionList';
import CreateQuestion from '../components/CreateQuestion';
import UpdateExamForm from '../components/UpdateExamForm';
import { getUserDataFromLocalStorage } from '../../utils/getUserDataFromLocalStorage';

const ExamDetails = () => {

    const navigate = useNavigate();

    const { examID } = useParams();

    const [examDetails, setExamDetails] = useState({})
    const [questions, setQuestions] = useState([])

    const [displayQuestionCreationForm, setDisplayQuestionCreationForm] = useState(false)

    // To toggle between update and add question operation
    const [questionToUpdate, setQuestionToUpdate] = useState(null);
    const [operationType, setOperationType] = useState("Add")

    const [examDetailsToUpdate, setExamDetailsToUpdate] = useState({});

    const fetchExamDetails = async () => {
        const response = await fetch(`/exams/${examID}`)
        const responseData = await response.json()
        setExamDetails(responseData.data)
        setQuestions(responseData.data.questions)
    }

    // To reset the form into add new question form
    const resetCreateQuestionCompForm = () => {
        setQuestionToUpdate(null)
        setOperationType("Add")
        setDisplayQuestionCreationForm(false)
    }

    // To set the form into update question form
    const setOperationTypeForForm = (question) => {
        setQuestionToUpdate(question)
        setOperationType("Update")
        setDisplayQuestionCreationForm(true)
    }

    const updateExamDetailsLocally = (updatedExamDetails) => {
        setExamDetails((prevExamDetails) => {
            return { ...prevExamDetails, ...updatedExamDetails }
        })
        setExamDetailsToUpdate({})
    }


    const isThisUserWhoCreateExam = examDetails?.teacher?.email === getUserDataFromLocalStorage()?.user?.email;

    console.log(isThisUserWhoCreateExam);


    useEffect(() => {
        fetchExamDetails()
    }, [displayQuestionCreationForm])


    return (

        <div>
            <ToastContainer />

            <button
                onClick={() => navigate("../")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ml-6"
            >
                Go Back
            </button>

            {
                Object.keys(examDetailsToUpdate).length !== 0 && (
                    <UpdateExamForm
                        examDetails={examDetailsToUpdate}
                        updateExamDetailsLocally={updateExamDetailsLocally}
                    />
                )
            }

            <div className="container mx-auto p-6 bg-gray-100">

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">

                    <h2 className="text-2xl font-semibold mb-4">{examDetails.title?.toUpperCase()}</h2>

                    <p className="text-gray-600">Subject: {examDetails.subject?.toUpperCase()}</p>
                    <p className="text-gray-600">Date: {examDetails.date && formatDateTime(examDetails.date)[0]}</p>
                    <p className="text-gray-600">Time: {examDetails.date && formatDateTime(examDetails.date)[1]}</p>
                    <p className="text-gray-600">Duration: {examDetails.duration} minutes</p>

                    {
                        isThisUserWhoCreateExam && (
                            <>
                                <button
                                    className="px-8 py-2 mt-5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 mr-8"
                                    onClick={() => setExamDetailsToUpdate(examDetails)}
                                >
                                    Update Exam Details
                                </button>

                                <button
                                    className="px-8 py-2 mt-5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                                    onClick={() => setDisplayQuestionCreationForm(true)}
                                >
                                    Add Question
                                </button>
                            </>
                        )
                    }

                </div>


            </div>

            {/* page for creating question */}
            {
                displayQuestionCreationForm && (
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 flex items-center justify-center w-full h-[100%]'>

                        <CreateQuestion
                            questionToUpdate={questionToUpdate}
                            operationType={operationType}
                            setDisplayQuestionCreationForm={setDisplayQuestionCreationForm}
                            resetCreateQuestionCompForm={resetCreateQuestionCompForm}
                            isThisUserWhoCreateExam={isThisUserWhoCreateExam}
                        />
                    </div>

                )
            }


            {/* Question List */}
            <div className='mt-5'>
                <QuestionsList
                    questions={questions}
                    setQuestions={setQuestions}
                    setOperationTypeForForm={setOperationTypeForForm}
                    isThisUserWhoCreateExam={isThisUserWhoCreateExam}
                />
            </div>
        </div>

    )
}

export default ExamDetails