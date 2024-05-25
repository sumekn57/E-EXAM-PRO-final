import React, { useEffect, useState } from 'react'
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'
import ExamDashboardCard from '../comps/ExamDashboardCard'
import { getUserDataFromLocalStorage } from '../utils/getUserDataFromLocalStorage'

const ExamDashboard = () => {

    const [exams, setExams] = useState([]);

    const fetchExams = async () => {
        const res = await fetch("/exams");
        const resData = await res.json();
        setExams(resData.data)
    }

    useEffect(() => {
        fetchExams();
    }, [])

    return (
        <>

            <Navbar />

            <div className=' m-auto text-center text-4xl my-5'>
                Welcome {getUserDataFromLocalStorage()?.user.name}!!
            </div>

            <div className='flex justify-center gap-x-10 flex-wrap w-[90%] m-auto'>
                {exams.map(exam => <ExamDashboardCard exam={exam} key={exam._id} />)}
            </div>

            <Footer />
        </>
    )
}

export default ExamDashboard