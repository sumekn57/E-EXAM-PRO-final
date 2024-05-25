import { HttpStatus } from "../constant/constant.js";
import sendSuccessResponse from "../helper/apiResponseHandler.js";
import { Exam, User } from "../schemaModels/model.js";
import asyncErrorHandler from "../utils/asyncHandler.js";
import { sendMailToUsersAboutExam } from "../utils/sendMail.js";
import { throwError } from "../utils/throwError.js";



export const createExam = asyncErrorHandler(async (req, res) => {
    const examData = req.body;
    const { title, teacher, subject, date, duration } = examData;

    if (!title || !teacher || !subject || !date || !duration) {
        throwError({ statusCode: HttpStatus.BAD_REQUEST, message: 'All exam details are required' });
    }

    // Validate if the teacher exists
    const teacherUser = await User.findById(teacher);

    console.log(teacher);

    if (!teacherUser) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'Teacher not found' });
    }

    // Create the exam
    const newExam = new Exam({
        title,
        teacher,
        subject,
        date,
        duration
    });

    await newExam.save();

    await sendMailToUsersAboutExam(examData);

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.CREATED,
        message: 'Exam created successfully',
    });
});

export const getAllExams = asyncErrorHandler(async (req, res) => {

    const exams = await Exam.find().sort({ "_id": -1 }).populate({
        path: "teacher",
        select: "-password"
    });

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: 'All exams retrieved successfully',
        data: exams,
    });

});

export const getExamById = asyncErrorHandler(async (req, res) => {

    const examID = req.params.examID;

    if (!examID) {
        throwError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Exam ID is required',
        });
    }

    // Find the exam by ID and populate the teacher field excluding the password
    const exam = await Exam.findById(examID).populate({
        path: 'teacher',
        select: '-password'
    });

    if (!exam) {
        throwError({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Exam not found',
        });
    }

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: 'Exam details retrieved successfully',
        data: exam,
    });
});

export const updateExamDetails = asyncErrorHandler(async (req, res) => {
    const examID = req.params.examID;
    const { updatedExamDetails } = req.body;

    if (!examID || Object.keys(updatedExamDetails).length === 0) {
        throwError({ statusCode: HttpStatus.BAD_REQUEST, message: 'Exam ID and updated details are required' });
    }

    const exam = await Exam.findById(examID);

    if (!exam) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'Exam not found' });
    }

    await Exam.findByIdAndUpdate(examID, updatedExamDetails, { new: true });

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: 'Exam details updated successfully',
        data: exam,
    });
});

// Delete an exam
export const deleteExam = asyncErrorHandler(async (req, res) => {
    const examID = req.params.examID;

    if (!examID) {
        throwError({ statusCode: HttpStatus.BAD_REQUEST, message: 'Exam ID is required' });
    }

    const deletedExam = await Exam.findByIdAndDelete(examID);

    if (!deletedExam) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'Exam not found' });
    }

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: 'Exam deleted successfully',
    });
});

// Add a question to an exam
export const addQuestionToExam = asyncErrorHandler(async (req, res) => {

    const examID = req.params.examID;

    const { question, options, correctAns } = req.body;

    if (!examID || !question || !options || !correctAns) {
        throwError({ statusCode: HttpStatus.BAD_REQUEST, message: 'Exam ID, question, options, and correctAnswer are required' });
    }

    const newQuestion = {
        question,
        options: options || [],
        correctAns: correctAns || null,
    };

    const exam = await Exam.findById(examID);

    if (!exam) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'Exam not found' });
    }

    exam.questions.push(newQuestion);

    await exam.save();

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: 'Question added to the exam successfully',
        data: newQuestion,
    });
});

// Update question details within an exam
export const updateQuestionDetails = asyncErrorHandler(async (req, res) => {

    const examID = req.params.examID;

    const { questionID, question, options, correctAns } = req.body;


    if (!examID || !questionID || !question) {
        throwError({ statusCode: HttpStatus.BAD_REQUEST, message: 'Exam ID, question ID, and updated question are required' });
    }

    const exam = await Exam.findById(examID);

    if (!exam) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'Exam not found' });
    }

    const questionToUpdate = exam.questions.id(questionID);

    if (!questionToUpdate) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'Question not found in the exam' });
    }

    questionToUpdate.question = question;
    questionToUpdate.options = options || [];
    questionToUpdate.correctAns = correctAns || null;

    await exam.save();

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: 'Question details updated successfully'
    });
});

// Delete a question from an exam
export const deleteQuestionFromExam = asyncErrorHandler(async (req, res) => {
    const examID = req.params.examID;
    const questionID = req.body.questionID;

    if (!examID || !questionID) {
        throwError({ statusCode: HttpStatus.BAD_REQUEST, message: 'Exam ID and question ID are required' });
    }

    const exam = await Exam.findById(examID);
    if (!exam) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'Exam not found' });
    }

    const questionToDelete = exam.questions.id(questionID);

    if (!questionToDelete) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'Question not found in the exam' });
    }

    await questionToDelete.deleteOne();
    await exam.save();

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: 'Question deleted from the exam successfully',
    });
});