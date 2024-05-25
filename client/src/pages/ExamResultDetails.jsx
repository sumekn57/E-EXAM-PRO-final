import React, { useEffect, useState } from 'react'
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'
import { useParams } from 'react-router-dom'
import { formatDateTime } from '../utils/formatDateAndTime'
import { getUserDataFromLocalStorage } from '../utils/getUserDataFromLocalStorage'
import { calculateGrade } from '../utils/determineStudentGrade';

const ExamResultDetails = () => {

    const { examID } = useParams();

    const [examReport, setExamReport] = useState({});

    const fetchExams = async () => {
        const res = await fetch(`/exam-reports/${examID}/${getUserDataFromLocalStorage()?.user._id}`);
        const resData = await res.json();
        console.log(resData);
        setExamReport(resData.data)
    }

    useEffect(() => {
        fetchExams();
    }, [])


    return (
        <>
            <Navbar />

            {
                !examReport && !examReport?.teacher && (
                    <div role="alert" className='w-[70%] m-auto my-10'>
                        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Oops
                        </div>
                        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p>
                                You might have missed the exam or failed to submit the exam in time, please contact your respective teacher
                            </p>
                        </div>
                    </div>
                )
            }

            {examReport && Object.keys(examReport).length !== 0 && (
                <div className='my-8'>

                    {/* Exam title  */}
                    <div>

                        <h1 className='text-4xl w-[60%] m-auto text-center'>Welcome , Your Test Results</h1>

                        <div className='w-[60%] m-auto'>

                            <section className='w-[65%] space-y-1 mt-10'>

                                <p className='flex gap-x-4'>
                                    <span className='font-bold w-[50%]'> Title: </span> <span>{examReport.exam.title}</span>
                                </p>

                                <p className='flex gap-x-4'>
                                    <span className='font-bold w-[50%]'> Subject: </span> <span>{examReport.exam.subject}</span>
                                </p>

                                <p className='flex gap-x-4'>
                                    {
                                        examReport.exam.date && (<><span className='font-bold w-[50%]'>Date: </span> {formatDateTime(examReport.exam.date)[0]} {formatDateTime(examReport.exam.date)[1]}</>)
                                    }
                                </p>
                                <p className=' flex gap-x-4'>
                                    <span className='font-bold w-[50%]'> Invigilator: </span> {examReport.exam?.teacher?.name}
                                </p>

                                <p className='flex gap-x-4'>
                                    <span className='font-bold w-[50%]'> Percentage Scored: </span> {examReport.percentageScored}%
                                </p>

                                <p className='flex gap-x-4'>
                                    <span className='font-bold w-[50%]'> Grade obtained: </span> {calculateGrade(examReport.percentageScored)}
                                </p>

                            </section>
                        </div>
                    </div>

                    {/* Questions */}

                    <div className='w-[60%] m-auto my-10 space-y-10'>
                        {examReport.answers.map(({ question, selectedAns, correctAns }, index) => {
                            const styles = selectedAns === correctAns ? "bg-teal-100 border-teal-500 rounded-b text-teal-900" : "bg-red-100 border-red-500 rounded-b text-red-900"
                            return (
                                <div class={`${styles} px-4 py-3`} role="alert">

                                    <div>
                                        <p class="font-bold">{index + 1}. {question}</p>
                                        <div className='ml-5 mt-1 space-y-1'>
                                            <p class="text-sm">
                                                Your Ans: {selectedAns}
                                            </p>
                                            <p class="text-sm">
                                                Correct Ans: {correctAns}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>

                </div>)}

            <Footer />
        </>
    )
}

export default ExamResultDetails