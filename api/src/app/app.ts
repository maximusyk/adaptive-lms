import authRoutes from '@auth/auth.route';
import chapterRoutes from '@chapters/chapter.route';
import classesRoutes from '@classes/class.route';
import coursesRoutes from '@courses/course.route';
import keywordRoutes from '@keywords/keyword.route';
import lectureRoutes from '@lectures/lecture.route';
import { errorMiddleware } from '@middlewares/error.middleware';
import quizRoutes from '@quizzes/quiz.route';
import unitRoutes from '@units/unit.route';
import usersRoutes from '@users/user.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import displayRoutes from 'express-routemap';
import morgan from 'morgan';
import multer from 'multer';

const uploadMulter = multer();

const app: Express = express();

app.use(uploadMulter.any());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser('hfdsahfxxasdix'));
app.use(
    cors({
        credentials: true,
    }),
);

app.use('/auth', authRoutes);
app.use('/courses', coursesRoutes);
app.use('/users', usersRoutes);
app.use('/classes', classesRoutes);
app.use('/chapters', chapterRoutes);
app.use('/lectures', lectureRoutes);
app.use('/units', unitRoutes);
app.use('/keywords', keywordRoutes);
app.use('/quizzes', quizRoutes);

app.use('/display', (req, res) => {
    displayRoutes(app);

    res.status(200);
});

app.use(errorMiddleware);

export default app;
