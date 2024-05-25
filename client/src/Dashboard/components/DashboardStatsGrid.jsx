import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaComments } from 'react-icons/fa';

export default function DashboardStatsGrid({ usersLists, examData, feedbacks }) {

    const totalStudents = usersLists.filter(user => user.role === "student").length
    const totalExams = examData.length
    const totalTeachers = usersLists.filter(user => user.role === "teacher").length
    const totalFeedbacks = feedbacks.length

    const formatLength = (length) => {
        if (length < 10) {
            return `00${length}`;
        } else if (length < 100) {
            return `0${length}`;
        }
        return length.toString();
    }

    return (
        <div className="flex gap-16">
            <BoxWrapper>

                <div className="pl-4">
                    <span className="text-lg text-gray-500 font-light">
                        Students
                    </span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">
                            {formatLength(totalStudents)}
                        </strong>
                    </div>
                </div>

                <div className="rounded h-14 w-16 flex items-center justify-center bg-sky-500">
                    <FaUserGraduate className="text-4xl text-white" />
                </div>
            </BoxWrapper>

            <BoxWrapper>

                <div className="pl-4">
                    <span className="text-lg text-gray-500 font-light">
                        Teachers
                    </span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">
                            {formatLength(totalTeachers)}
                        </strong>
                    </div>
                </div>
                <div className="rounded h-14 w-16 flex items-center justify-center bg-orange-600">
                    <FaChalkboardTeacher className="text-4xl text-white" />
                </div>
            </BoxWrapper>

            <BoxWrapper>

                <div className="pl-4">
                    <span className="text-lg text-gray-500 font-light">
                        Exams
                    </span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">
                            {formatLength(totalExams)}
                        </strong>
                    </div>
                </div>
                <div className="rounded h-14 w-16 flex items-center justify-center bg-yellow-400">
                    <FaClipboardList className="text-4xl text-white" />
                </div>
            </BoxWrapper>

            <BoxWrapper>

                <div className="pl-4">
                    <span className="text-lg text-gray-500 font-light">
                        Feedbacks
                    </span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">
                            {formatLength(totalFeedbacks)}
                        </strong>
                    </div>
                </div>

                <div className="rounded h-14 w-16 flex items-center justify-center bg-green-600">
                    <FaComments className="text-4xl text-white" />
                </div>

            </BoxWrapper>
        </div>
    );
}

function BoxWrapper({ children }) {
    return (
        <div className="bg-white rounded p-4 flex-1 border border-gray-200 flex justify-between items-center">
            {children}
        </div>
    );
}
