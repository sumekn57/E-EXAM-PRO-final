
import { HttpStatus } from '../constant/constant.js';
import asyncErrorHandler from '../utils/asyncHandler.js';
import { throwError } from '../utils/throwError.js';
import { Exam, ExamReport } from '../schemaModels/model.js';
import sendSuccessResponse from '../helper/apiResponseHandler.js';
import { calculatePercentage } from '../utils/calculateStudentPercentage.js';

export const createExamReport = asyncErrorHandler(async (req, res) => {

    const { examID, studentID, answers } = req.body;

    if (!examID || !studentID || !answers) {
        throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: " exam ID or student ID and answers are required"
        })
    }

    const exam = await Exam.findById(examID)

    if (!exam) {
        throwError({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Failed to submit the exam: Unable to find the exam"
        })
    }

    const student = await Exam.findById(examID)


    if (!student) {
        throwError({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Failed to submit the exam: Unable to find the exam"
        })
    }

    const isExamReportAlreadySubmitted = await ExamReport.findOne({ exam: examID, student: studentID });

    if (isExamReportAlreadySubmitted) {
        throwError({
            statusCode: HttpStatus.CONFLICT,
            message: "Failed to submit the exam: already submitted the exam, cannot submit the exam twice."
        })
    }

    const percentageScored = calculatePercentage(answers, exam.questions.length);

    const examReport = ExamReport({
        student: studentID,
        exam: examID,
        answers,
        percentageScored
    })

    await examReport.save();

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: "Successfully submitted exam, please check you results in result page"
    })
})

export const getAllReports = asyncErrorHandler(async (req, res) => {

    const reports = await ExamReport.find()
        .populate({
            path: "exam",
            select: "-questions"
        })
        .populate({
            path: "student",
            select: "-password -createdAt -updatedAt"
        });

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: "All exam reports retrieved successfully",
        data: reports
    });
});

export const getReportsByExamID = asyncErrorHandler(async (req, res) => {

    const { examID } = req.params;

    if (!examID) {
        throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'examID ID is required'
        })
    }

    const reports = await ExamReport.find({ exam: examID }).populate("exam student");

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: "Exam reports retrieved successfully",
        data: reports
    });
});

export const getReportsByUserID = asyncErrorHandler(async (req, res) => {

    const { userID } = req.params;

    if (!userID) {
        throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'User ID is required'
        })
    }

    const reports = await ExamReport.find({ student: userID }).populate("exam student");

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: "Exam reports retrieved successfully",
        data: reports
    });
});

export const getReportsByExamIDAndUserID = asyncErrorHandler(async (req, res) => {

    const { examID, userID } = req.params;

    if (!examID || !userID) {
        throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Exam ID and User ID are required'
        })
    }

    const reports = await ExamReport.findOne({ exam: examID, student: userID })
        .populate({
            path: "exam",
            populate: {
                path: "teacher",
                select: "-password"
            }
        })
        .populate({
            path: "student",
            select: "-password -createdAt -updatedAt"
        });

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: "Exam reports retrieved successfully",
        data: reports
    });
});

