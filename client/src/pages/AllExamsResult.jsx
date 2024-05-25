import React, { useEffect, useState } from 'react'
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';
import { formatDateTime } from '../utils/formatDateAndTime';
import { BsCalendarDate } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AllExamsResult = () => {

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

            <Navbar />

            <div className='m-auto text-center text-4xl my-5'>
                Welcome User!, Your Exam Results
            </div>

            <div className='flex justify-center gap-x-10 flex-wrap w-[90%] m-auto'>

                {
                    exams.map((exam) => {

                        return (
                            <ExamCard exam={exam} key={exam._id} />
                        )

                    })
                }

            </div>

            <Footer />

        </>
    )
}

const ExamCard = ({ exam }) => {

    const { _id, title, teacher, subject, date, duration } = exam;

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

            </div>


            <div className="p-3 mb-4 text-sm text-green-800 rounded-lg bg-green-100 w-[150px] text-center" role="alert">

                <Link to={_id} className=''>
                    <p className="font-medium text-center">View Result</p>
                </Link>

            </div>

        </div>
    )
}

export default AllExamsResult