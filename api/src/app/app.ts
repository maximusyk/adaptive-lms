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

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/quizzes', quizRoutes);

app.use('/display', (req, res) => {
    displayRoutes(app);

    res.status(200);
});

app.use(errorMiddleware);

export default app;
