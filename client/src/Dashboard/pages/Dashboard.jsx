import React, { useEffect, useMemo, useState } from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'

import Chart from "react-apexcharts";
import { calculateGrade } from '../../utils/determineStudentGrade';

export default function Dashboard() {
	const [dashboardData, setDashboardData] = useState({
		users: [],
		exams: [],
		examReports: [],
		feedbacks: [],
	})

	const { users, exams, feedbacks, examReports } = dashboardData;


	const userCountByRole = useMemo(() => {
		return users.reduce((prevValue, { role }) => {
			if (prevValue[role]) {
				prevValue[role]++
				return prevValue;
			}

			return { ...prevValue, [role]: 1 }
		}, {})
	}, [users])

	console.log(userCountByRole);

	const studentCountByGrade = useMemo(() => {

		return examReports.reduce((prevValue, examReport) => {

			const grade = calculateGrade(examReport.percentageScored)

			prevValue[grade]++;

			return prevValue;

		}, { "A+": 0, "A": 0, "B": 0, "C": 0, "D": 0, "F": 0 })

	}, [examReports])



	const examReportsPassFailCount = useMemo(() => {
		return examReports.reduce((prevValues, { exam, percentageScored }) => {

			const prevValue = prevValues.find(({ examTitle }) => {
				return examTitle === exam.title
			})

			if (prevValue) {
				if (percentageScored >= 40) {
					prevValue.passCount++;
				} else {
					prevValue.failCount++;
				}

				return [...prevValues.filter(prevExamValue => prevExamValue.examTitle != exam.title), prevValue];
			}

			const isPassed = percentageScored >= 40;

			if (isPassed) {
				return [...prevValues, { examTitle: exam.title, passCount: 1, failCount: 0 }]
			}

			return [...prevValues, { examTitle: exam.title, passCount: 0, failCount: 1 }]

		}, [])
	}, [examReports])

	const feedbackDetails = async () => {
		const response = await fetch('/feedbacks')
		const responseData = await response.json()
		return responseData;

	}

	const fetchUserData = async () => {
		const userListResponse = await fetch('/users');
		const userListData = await userListResponse.json();
		return userListData;
	}

	const fetchAllExam = async () => {
		const response = await fetch('/exams')
		const responseData = await response.json();
		return responseData;
	}

	const fetchAllExamReports = async () => {
		const response = await fetch('/exam-reports')
		const responseData = await response.json();
		return responseData;
	}


	useEffect(() => {
		Promise.all([
			feedbackDetails(),
			fetchUserData(),
			fetchAllExam(),
			fetchAllExamReports()
		]).then(([resFeedbacks, resUsers, resExams, resExamReports]) => {
			setDashboardData({
				"feedbacks": resFeedbacks.data,
				"users": resUsers.data,
				"exams": resExams.data,
				"examReports": resExamReports.data,
			})
		})
	}, [])

	const optionsForPieChart1 = {
		chart: {
			type: 'pie',
		},
		labels: Object.keys(userCountByRole).map((key) => key.toUpperCase()),
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
				legend: {
					position: 'bottom'
				}
			}
		}]
	}

	const optionsForPieChart2 = {
		chart: {
			type: 'pie',
		},
		labels: Object.keys(studentCountByGrade),
		colors: [
			'#FF5733',
			'#6A1B9A',
			'#1E88E5',
			'#4CAF50',
			'#FFC107',
			'#E53935',
			'#E67831'
		],
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					width: 200
				},
			}
		}]
	}

	const optionsForBarGraph = {
		chart: {
			type: 'bar',
		},
		plotOptions: {
			bar: {
				horizontal: true,
				dataLabels: {
					position: 'top',
				},
			}
		},
		dataLabels: {
			enabled: true,
			offsetX: -6,
			style: {
				fontSize: '12px',
				colors: ['#fff']
			}
		},
		stroke: {
			show: true,
			width: 1,
			colors: ['#fff']
		},
		tooltip: {
			shared: true,
			intersect: false
		},
		labels: examReportsPassFailCount.map(({ examTitle }) => examTitle)
		// labels: ["Exam 1", "Exam 2", "Exam 3", "Exam 4", "Exam 5"]
	}

	const dataForGroupedBarGraph = [
		// Pass student count per exam
		{
			name: "Pass",
			data: examReportsPassFailCount.map(({ passCount }) => passCount)
		},
		// fail student count per exam
		{
			name: "Fail",
			data: examReportsPassFailCount.map(({ failCount }) => failCount)
		}
	]

	// const dataForGroupedBarGraph = [
	// 	// Pass student count per exam
	// 	{
	// 		name: "Pass",
	// 		data: [10, 200, 20, 50, 50]
	// 	},
	// 	// fail student count per exam
	// 	{
	// 		name: "Fail",
	// 		data: [5, 30, 50, 5, 20]
	// 	}
	// ]

	return (
		<div>
			<DashboardStatsGrid
				usersLists={users}
				examData={exams}
				feedbacks={feedbacks}
			/>

			<div className='grid grid-cols-[450px_400px] items-center justify-around  mt-10 py-8 bg-white'>

				<div>
					<h2 className='w-[75%] text-center mb-4'>User Count by Roles</h2>
					<Chart
						type='pie'
						options={optionsForPieChart1}
						series={Object.values(userCountByRole)}
					/>

				</div>


				<div>
					<h2 className='w-[85%] text-center mb-4'>Student Count by Grades </h2>
					<Chart
						type='pie'
						options={optionsForPieChart2}
						series={Object.values(studentCountByGrade)}
					/>

				</div>
			</div>

			<div className='my-10 py-8 bg-white'>

				<h2 className='text-center mb-4'>Pass and Fail Count per exam</h2>

				<Chart
					type="bar"
					options={optionsForBarGraph}
					series={dataForGroupedBarGraph}
					height="700px"
				/>

			</div>


		</div>
	)
}
