import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { checkExamStartedOrNot, formatDateTime } from '../utils/formatDateAndTime';
import { ToastContainer, toast } from 'react-toastify';
import { getUserDataFromLocalStorage } from '../utils/getUserDataFromLocalStorage';
import { shuffleArray } from '../utils/shuffleArrow';

const ExamRoom = () => {

    const { examID } = useParams();

    const [exam, setExam] = useState({});

    const { title, teacher, date, questions, subject, duration } = exam;

    const [answers, setAnswer] = useState([])

    const [displayMsgAfterExamTimeIsFinished, setDisplayMsgAfterExamTimeIsFinished] = useState(false);

    const navigate = useNavigate();

    const [totalChances, setTotalChanches] = useState(0);


    const changeHandler = (selectedOption, question, _id, correctAns) => {

        const ans = answers.find(answer => answer._id === _id)

        if (ans) {
            const newAns = answers.map((preAns) => {
                if (preAns._id === _id) {
                    return { ...preAns, selectedAns: selectedOption }
                }
                return preAns
            })
            setAnswer(newAns)
            return;
        }

        setAnswer((prevAns) => [...prevAns, { _id, question, selectedAns: selectedOption, correctAns }])
    }

    const fetchExamByID = async () => {
        const res = await fetch(`/exams/${examID}`)
        const resData = await res.json();
        setExam(resData.data)
    }

    const storeExamReportInDB = async () => {

        const { user } = getUserDataFromLocalStorage();

        const newAnswers = answers.map(({ question, selectedAns, correctAns }) => {
            return { question, selectedAns, correctAns }
        })

        const res = await fetch("/exam-reports", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                "examID": examID,
                "studentID": getUserDataFromLocalStorage()?.user._id,
                answers: newAnswers
            })
        })

        const resData = await res.json();

        if (res.ok) {
            toast.success(resData.message)
            setTimeout(() => navigate("/exams"), 4000)
            return;
        }

        toast.error(resData.message)
    }

    const submitExam = async () => {

        if (answers.length !== questions.length) {
            toast.warning("Please Select All Questions");
            return;
        }

        await storeExamReportInDB()

    }

    useEffect(() => {
        fetchExamByID()
    }, [])

    // useEffect(() => {

    //     const handleVisibilityChange = setTimeout((e) => {
    //         toast.warning("Don't leave the page, otherwise you will be considered fail in the exam");
    //         setTotalChanches(prevState => prevState + 1)
    //     }, 1000);

    //     window.addEventListener("visibilitychange", handleVisibilityChange);


    //     return () => {
    //         window.removeEventListener("visibilitychange", handleVisibilityChange);
    //     };
    // }, []);

    useEffect(() => {
        let timeoutId;

        const handleVisibilityChange = () => {
            clearTimeout(timeoutId); // Clear any existing timeouts
            timeoutId = setTimeout(() => {
                toast.warning("Don't leave the page; otherwise, you will be considered to fail in the exam");
                setTotalChanches(prevState => prevState + 1);
            }, 500);
        };

        window.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("visibilitychange", handleVisibilityChange);
            clearTimeout(timeoutId); // Clear the timeout when the component unmounts
        };
    }, []);



    useEffect(() => {
        // console.log("Total Chances Effect Triggered. Total Chances:", totalChances);
        const autoSubmitTheExam = async () => {
            await storeExamReportInDB()
        }

        console.log(totalChances);


        if (totalChances >= 3) {
            autoSubmitTheExam()
        }

    }, [totalChances])


    return (
        <div className='py-10'>

            <ToastContainer style={{ width: "400px" }} />

            {
                totalChances >= 3 && <ExamFinishedMessage message="You have left the exam multiple times. You have been disqualified" />
            }

            {
                displayMsgAfterExamTimeIsFinished && <ExamFinishedMessage />
            }

            {
                Object.keys(exam).length !== 0 && (

                    <>
                        {/* Exam title  */}
                        <div>

                            <h1 className='text-5xl text-center'>Multiple Choice Exam</h1>


                            <section className='w-[35%] m-auto space-y-1'>

                                <Timer
                                    duration={duration}
                                    date={date}
                                    setDisplayMsgAfterExamTimeIsFinished={setDisplayMsgAfterExamTimeIsFinished}
                                />


                                <p className='flex gap-x-4'>
                                    <span className='font-bold w-[30%]'> Title: </span> <span>{title}</span>
                                </p>

                                <p className='flex gap-x-4'>
                                    <span className='font-bold w-[30%]'> Subject: </span> <span>{subject}</span>
                                </p>

                                <p className=' flex gap-x-4'>
                                    {
                                        date && (<><span className='font-bold w-[30%]'>Start Time: </span> {formatDateTime(date)[0]} {formatDateTime(date)[1]}</>)
                                    }
                                </p>
                                <p className=' flex gap-x-4'>
                                    <span className='font-bold w-[30%]'> Invigilator: </span> {teacher?.name}
                                </p>
                            </section>


                        </div>

                        <div className='w-[60%] m-auto my-16'>
                            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                                <p className="font-bold">Be Careful, Important!!</p>
                                <p className='mt-3'>
                                    You will be failed if you:
                                </p>
                                <p>
                                    - leave the tab multiple times
                                </p>
                                <p>
                                    - are not able to submit with in the exam time (The portal will be closed)
                                </p>
                            </div>

                        </div>
                        <div className='space-y-10'>

                            {
                                shuffleArray(questions).map(({ _id, question, options, correctAns }) => (

                                    <div className='w-[60%] m-auto' key={_id}>
                                        <p className='text-bold text-xl'>
                                            {question}
                                        </p>

                                        {
                                            options.map((option) => {
                                                return (
                                                    <div className='space-x-3 mt-3' key={Math.random()}>
                                                        {
                                                            option === answers.find(ans => ans?._id === _id)?.selectedAns ? (
                                                                <p
                                                                    className='border border-blue-600 bg-blue-600 text-white w-[40%] px-2 py-1 rounded'
                                                                    onClick={() => changeHandler(option, question, _id, correctAns)}
                                                                >
                                                                    {option}
                                                                </p>
                                                            ) : (
                                                                <p
                                                                    className='border border-black w-[40%] px-2 py-1 rounded'
                                                                    onClick={() => changeHandler(option, question, _id, correctAns)}
                                                                >
                                                                    {option}
                                                                </p>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ))
                            }


                            <div className='w-[60%] m-auto'>
                                <button
                                    className='bg-blue-600 text-white rounded px-3 py-2 mt-5'
                                    onClick={submitExam}
                                >
                                    Submit Exam
                                </button>

                            </div>

                        </div>
                    </>
                )
            }


        </div>

    )
}

export default ExamRoom

const Timer = ({ duration, date, setDisplayMsgAfterExamTimeIsFinished }) => {

    const { remainingExamDuration } = checkExamStartedOrNot(date, duration);


    const totalSeconds = remainingExamDuration * 60;

    const [seconds, setSeconds] = useState(totalSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                setDisplayMsgAfterExamTimeIsFinished(true)
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;


    return (


        <section>
            <div className='flex flex-col items-center justify-center my-5 text-red-500'>
                <div className='flex text-4xl w-[150px] justify-between'>
                    <p>{minutes.toString().padStart(2, '0')}</p> <p> : </p> <p>{remainingSeconds.toString().padStart(2, '0')}</p>
                </div>

                <div className="flex justify-between w-[150px]">
                    <p className="text-[10px]">Minutes</p>
                    <p className="text-[10px] text-right">Seconds</p>
                </div>

            </div>
        </section>



    );
};


const ExamFinishedMessage = ({ message }) => {
    return (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 flex items-center justify-center w-full h-[100%]'>

            <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-[400px] h-[230px]" role="alert">

                <div className='flex flex-col items-center justify-center gap-y-3'>

                    <div class="py-1">
                        <svg className="fill-current h-10 w-10 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
                    </div>
                    <div className='text-center h-full'>
                        {
                            message ? (
                                <p class="font-bold">{message}</p>
                            ) : (
                                <>
                                    <p class="font-bold">Exam Time Expired</p>
                                    <p class="text-sm">
                                        The allotted time for the exam has ended. Thank you for taking the exam.
                                    </p>
                                </>
                            )
                        }

                    </div>

                    <Link to="/exams">
                        <p className="bg-blue-500 hover:bg-blue-600 w-[100px] text-white py-2 px-4 rounded">
                            Go Back
                        </p>
                    </Link>

                </div>


            </div>
        </div>
    )
}