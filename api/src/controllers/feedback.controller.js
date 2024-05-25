import { HttpStatus } from "../constant/constant.js";
import sendSuccessResponse from "../helper/apiResponseHandler.js";
import { Feedback } from "../schemaModels/model.js";
import asyncErrorHandler from "../utils/asyncHandler.js";
import { throwError } from "../utils/throwError.js";

export const createFeedback = asyncErrorHandler(async (req, res) => {
    const { content, userID } = req.body;

    if (!content || !userID) {
        throwError({ statusCode: HttpStatus.BAD_REQUEST, message: 'Content and User ID are required' });
    }

    const feedback = Feedback({ content, userID });
    await feedback.save();

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.CREATED,
        message: 'Feedback created successfully',
    });
});

export const deleteFeedback = asyncErrorHandler(async (req, res) => {
    const feedbackID = req.params.feedbackID;

    if (!feedbackID) {
        throwError({ statusCode: HttpStatus.BAD_REQUEST, message: 'Feedback ID is required' });
    }

    const feedback = await Feedback.findByIdAndDelete(feedbackID);

    if (!feedback) {
        throwError({ statusCode: HttpStatus.NOT_FOUND, message: 'Feedback not found' });
    }

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: 'Feedback deleted successfully',
    });
});

export const getAllFeedback = asyncErrorHandler(async (req, res) => {

    const feedback = await Feedback.find().populate({
        path: 'userID',
        select: "-_id name email phoneNumber address"
    }); // Populate email with user's name

    sendSuccessResponse({
        res,
        statusCode: HttpStatus.OK,
        message: 'All feedback retrieved successfully',
        data: feedback,
    });


});
