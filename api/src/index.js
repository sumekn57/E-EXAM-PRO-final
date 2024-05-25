import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
import indexRouter from './routes/index.route.js';
import cors from 'cors';
// import http from " http"
import mongoose from 'mongoose';
import apiRoutes from './routes/index.route.js';
import bodyParser from 'body-parser';

const app = express();

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*' }));

// Routes configurations
app.use('/', apiRoutes);

// Hosting the files
app.use(express.static("./public"))

// Handling errors in routes
app.use((err, req, res, next) => {
    if (err) {

        console.log(err);

        err.status = err.status || 'error';

        if (process.env.ENV === 'development') {
            // Development environment
            return res.status(err.statusCode || 500).send({
                message: err.message || 'Oops! Something went wrong 🥲...',
                success: false,
                stack: err.stack,
            });
        } else {
            // Production environment
            return res.status(err.statusCode || 500).send({
                message: err.message || 'Oops! Something went wrong 🥲...',
                success: false,
                stack: null,
            });
        }
    }
});

// const server = http.createServer(app);

const port = process.env.SERVER_PORT || process.env.DEFAULT_PORT;
const db = process.env.MONGOURI;


mongoose
    .connect(db)
    .then(() => {
        app.listen(port, () => {
            console.log(
                `DB Connected and Server listening on port ${port} Successfully`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });

export default app;