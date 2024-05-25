import React from 'react'
import { BsCalendarDate } from "react-icons/bs"
import { BiTimeFive } from "react-icons/bi"
import { checkExamStartedOrNot, formatDateTime } from '../utils/formatDateAndTime';
import { Link } from 'react-router-dom';
import { ImBooks } from "react-icons/im"

const ExamDashboardCard = ({ exam }) => {

    const { _id, title, teacher, subject, date, duration } = exam;

    const { examStatus, remainingExamDuration } = checkExamStartedOrNot(date, duration);

    const updateExamStatus = async (status) => {

        const res = await fetch(`/exams/${_id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PATCH",
            body: JSON.stringify({
                updatedExamDetails: {
                    examStatus: status
                }
            })
        })

        const resData = await res.json();
    }


    const displayExamInformation = () => {

        switch (examStatus) {
            case "start":
                updateExamStatus("start")
                return (
                    <Link
                        to={`/exams/${_id}`}
                    >
                        <button className="flex items-center px-4 py-2 mb-4 text-sm bg-blue-800 rounded text-blue-50 " role="alert">
                            Take Exam
                        </button>
                    </Link>
                )

            case "not started":
                return (
                    <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                        <p>
                            <span className="font-medium">Be Prepared!</span> Exam will start soon
                        </p>
                    </div>
                )
            default:
                if (exam.examStatus !== "end") updateExamStatus("end")
                return (

                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                        <p>

                            <Link to="/results" className='cursor-pointer'>
                                <span className="font-medium">Check your result! </span>
                            </Link>

                            The exam has finished
                        </p>
                    </div>
                )

        }

    }

    return (
        <div className='border w-[40%] my-5 px-5'>

            <div className='text-sm text-gray-500 flex items-center justify-between py-4'>

                <p>
                    {title}
                </p>

                <p>
                    {subject}
                </p>

            </div>

            <div className='border-t' />

            <div className='my-5 ml-5 space-y-3 text-gray-600'>

                <div className='flex gap-x-10 items-center'>
                    <BsCalendarDate />
                    <p>
                        {formatDateTime(date)[0]} {formatDateTime(date)[1]}
                    </p>
                </div>

                <div className='flex gap-x-10 items-center'>
                    <BiTimeFive />
                    <p>
                        {duration} Minutes
                    </p>
                </div>

                <div className='flex gap-x-10 items-center'>
                    <ImBooks />
                    <Link to={`/exam-materials/${_id}`}>
                        <p className='text-blue-600 underline'>
                            View Exam Materials
                        </p>
                    </Link>
                </div>


            </div>


            {displayExamInformation()}

        </div>
    )
}

export default ExamDashboardCard