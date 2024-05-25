import { HttpStatus } from "../constant/constant.js";

const sendSuccessResponse = ({ res, data = null, statusCode = HttpStatus.OK, message = "" }) => {
    return res.status(statusCode).json({
        status: "ok",
        ...(data && { data }),
        ...(message && { message }),
    })
}

export default sendSuccessResponse;