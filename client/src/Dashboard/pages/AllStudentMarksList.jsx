import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { calculateGrade } from '../../utils/determineStudentGrade';
import { formatDateTime } from '../../utils/formatDateAndTime';

const AllStudentMarksList = () => {

    const { examID } = useParams();

    const [examReports, setExamReports] = useState([]);

    const navigate = useNavigate()

    const fetchExamReports = async () => {
        const res = await fetch(`/exam-reports/exam/${examID}`);
        const resData = await res.json();
        setExamReports(resData.data);
    }

    useEffect(() => {
        fetchExamReports();
    }, [])

    console.log(examReports);


    return (
        <div>

            {/* view section */}
            <div className=''>

                <button
                    onClick={() => navigate("../")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mb-5"
                >
                    Go Back
                </button>

                {
                    examReports.length ? (
                        <>
                            <div className="px-4 py-2 mb-3 bg-gray-800">
                                <h1 className="text-lg text-white">
                                    Results of <b>"{examReports[0]?.exam.title}"</b> Exam palaced at
                                    <b> "{examReports[0]?.exam && formatDateTime(examReports[0].exam.date).join(" ")}"</b>
                                </h1>
                            </div>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-3 font-bold bg-gray-300 text-left text-gray-800 border border-gray-300">
                                            Name
                                        </th>
                                        <th className="p-3 font-bold bg-gray-300 text-left text-gray-800 border border-gray-300">
                                            Email
                                        </th>
                                        <th className="p-3 font-bold bg-gray-300 text-left text-gray-800 border border-gray-300">
                                            Phone Number
                                        </th>
                                        <th className="p-3 font-bold bg-gray-300 text-left text-gray-800 border border-gray-300">
                                            Obtained Percentage
                                        </th>
                                        <th className="p-3 font-bold bg-gray-300 text-left text-gray-800 border border-gray-300">
                                            Grade
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        examReports
                                            .filter(({ student }) => student != null)
                                            .map(({ _id, student, percentageScored }) => {
                                                const columnStyle = "p-3 text-sm font-medium text-gray-800 border border-gray-300"
                                                return (
                                                    <tr key={_id}>

                                                        <td className={columnStyle}>
                                                            {
                                                                student ? student.name : '-'
                                                            }
                                                        </td>
                                                        <td className={columnStyle}>
                                                            {
                                                                student ? student.email : '-'
                                                            }
                                                        </td>
                                                        <td className={columnStyle}>
                                                            {
                                                                student ? student.phoneNumber : ' - '
                                                            }
                                                        </td>
                                                        <td className={columnStyle}>{percentageScored}%</td>
                                                        <td className={columnStyle}>{calculateGrade(percentageScored)}</td>
                                                    </tr>

                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div className="bg-blue-100 text-center border-t border-b border-blue-500 text-blue-700 px-4 py-6 mt-10" role="alert">
                            <p className="font-bold text-4xl">No records available at the moment</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AllStudentMarksList