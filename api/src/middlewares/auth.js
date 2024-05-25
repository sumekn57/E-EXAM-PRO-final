import { createError } from '../config/createError.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ROLE from '../enums/roles.enum.js';

export const useLogin = async (req, res, next) => {
    let token = req.headers.authorization || req.cookies.accesstoken;
    if (!token) {
        return next(createError('Unauthorized!', 403));
    }
    try {
        if (token.includes(' ')) {
            token = token.split(' ')[1];
        }
        jwt.verify(token, process.env.SECRETTOKEN, async (err, decoded) => {
            if (err) {
                throw err;
            }
            const userId = decoded.id;
            const user = await User.findById(userId).select('role');
            if (!user) {
                return next(createError('Unauthorized!', 403));
            }
            req.user = userId;
            req.role = user.role;
            next();
        });
    } catch (error) {
        console.log(error.message);
        return next(error);
    }
};

export const verifyUserAsWellAsAdmin = (req, res, next) => {
    try {
        const role = req.role;
        if (!role) {
            return res.status(400).json({ message: 'Bad Request!' });
        }
        if (role === ROLE.USER || role === ROLE.ADMIN) {
            next();
        } else {
            return res.status(403).json({ message: 'Access denied!' });
        }
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message });
    }
};

export const verifyAdmin = (req, res, next) => {
    try {
        const role = req.role;
        if (!role) {
            return next(createError('Admin access denied!', 403));
        }
        if (role === ROLE.ADMIN) {
            next();
        } else {
            return next(createError('Admin access denied!', 403));
        }
    } catch (error) {
        return next(error);
    }
};
