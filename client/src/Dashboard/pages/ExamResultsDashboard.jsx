import React, { useEffect, useState } from 'react'
import { BsCalendarDate } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../utils/formatDateAndTime';

const ExamResultsDashboard = () => {

    const [exams, setExams] = useState([]);

    const fetchExams = async () => {
        const res = await fetch(`/exams`);
        const resData = await res.json();
        setExams(resData.data)
    }

    useEffect(() => {
        fetchExams();
    }, [])


    return (
        <>
            <div className="px-4 py-2 mb-3 bg-gray-800">
                <h1 className="text-lg font-semibold text-white">All Results</h1>
            </div>

            <div className='flex gap-x-6 flex-wrap'>

                {
                    exams
                        .filter(({ examStatus }) => examStatus === "end")
                        .map((exam) => {
                            return (
                                <ExamCard exam={exam} key={exam._id} />
                            )

                        })
                }

            </div>

        </>
    )
}

const ExamCard = ({ exam }) => {

    const { _id, title, teacher, subject, date, duration } = exam;

    return (
        <div className='border w-[31%] my-5 px-5 bg-white'>

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

            </div>


            <div className="p-3 mb-4 text-sm text-green-800 rounded-lg bg-green-100 w-[150px] text-center" role="alert">

                <Link to={_id} className=''>
                    <p className="font-medium text-center">View Result</p>
                </Link>

            </div>

        </div>
    )
}

export default ExamResultsDashboard