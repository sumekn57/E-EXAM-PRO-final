import React, { useEffect, useState } from 'react'
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';
import { BsCalendarDate } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { formatDateTime } from '../utils/formatDateAndTime';

const ExamMaterials = () => {

    const { examID } = useParams();

    const [examMaterials, setExamMaterials] = useState([]);

    const getExamMaterials = async () => {

        const res = await fetch(`/exam-material/${examID}`)

        const resData = await res.json();

        if (resData.data) {
            setExamMaterials(resData.data);
        }

    }


    useEffect(() => {
        getExamMaterials()
    }, [])

    useEffect(() => console.log(examMaterials), [examMaterials])

    return (
        <>
            <Navbar />

            {
                examMaterials.length === 0 && (
                    <div role="alert" className='w-[70%] m-auto my-10'>
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Oops
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p>
                                No Materials have been added for the exam at the moment, please contact your respective teacher or administrator if you have any query
                            </p>

                            <Link to="/exams">
                                <p className='mt-5 bold underline text-blue-600'>
                                    Go Back
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }

            {
                examMaterials.length !== 0 && (
                    <>
                        <div className='text-4xl text-center my-8'>
                            All Exam Materials
                        </div>

                        {
                            examMaterials.map((examMaterial) => <ExamMaterialCard examMaterial={examMaterial} key={examMaterial._id} />)
                        }



                    </>
                )
            }
            <Footer />
        </>
    )
}

const ExamMaterialCard = ({ examMaterial }) => {
    const { exam, files, links, teacher } = examMaterial;
    return (
        <div className='w-[50%] m-auto'>
            <div className='border w-[full] my-5 px-5'>

                <div className='text-sm text-gray-500 flex items-center justify-between py-4'>

                    <p>
                        {exam.title}
                    </p>

                    <p>
                        {exam.subject}
                    </p>

                </div>

                <div className='border-t' />

                <div className='my-5 mx-5 space-y-3 text-gray-600 flex items-center justify-between'>

                    <div className='flex gap-x-10 items-center'>
                        <BsCalendarDate />
                        <p>
                            {formatDateTime(exam.date)[0]} {formatDateTime(exam.date)[1]}
                        </p>
                    </div>

                    <div className='flex gap-x-10 items-center'>
                        <BiTimeFive />
                        <p>
                            {exam.duration} Minutes
                        </p>
                    </div>

                </div>


                <div className='px-5'>

                    <p className='text-lg font-semibold'>
                        Materials upload by  {teacher.name}
                    </p>


                    <div className='my-4 text-sm'>
                        <h2 className='mb-2'>
                            Necessary Links
                        </h2>

                        <div className='ml-3'>
                            {
                                links.map((link, index) => {
                                    return (
                                        <p>
                                            {index + 1}. <a href={link} className='text-blue-600 underline' target='_blank'> {link}</a>
                                        </p>
                                    )
                                })
                            }
                        </div>

                    </div>

                    <div className='my-4 text-sm'>
                        <h2 className='mb-2'>
                            Necessary Files
                        </h2>

                        <div className='ml-3'>
                            {
                                files.map(({ path, originalFileName }, index) => {
                                    return (
                                        <p>
                                            {index + 1}. <a href={path} target='_blank' className='text-blue-600 underline' download> {originalFileName}</a>
                                        </p>
                                    )
                                })
                            }
                        </div>

                    </div>

                </div>


            </div>

        </div>
    )
}

export default ExamMaterials