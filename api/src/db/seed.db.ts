import { Chapter } from '@chapters/entities/chapter.entity';
import { Class } from '@classes/entities/class.entity';
import { Course } from '@courses/entities/course.entity';
import { Keyword } from '@keywords/entities/keyword.entity';
import { Lecture } from '@lectures/entities/lecture.entity';
import { QuizAnswer } from '@quizzes/entities/quiz-answers.entity';
import { QuizQuestion } from '@quizzes/entities/quiz-questions.entity';
import { QuizType } from '@quizzes/entities/quiz-types.entity';
import { Quiz } from '@quizzes/entities/quiz.entity';
import { Unit } from '@units/entities/unit.entity';
import { User } from '@users/entities/user.entity';
import consola from 'consola';
// import { connection as mongoConnection } from 'mongoose';
// import connectMongo from './connection.db';
import { seedData } from './seedData';

// connectMongo().then(() => {consola.success('Connected to DB\n');}).catch((error: string) => {
//     consola.error(error);
//     process.exit(1);
// });

export const seedDB = async () => {
    const dbModels = [
        Chapter,
        QuizType,
        QuizAnswer,
        QuizQuestion,
        Class,
        Course,
        Unit,
        Lecture,
        Quiz,
        User,
        Keyword,
    ];
    for ( const dbModel of dbModels ) {
        const newData = seedData[dbModel.collection.collectionName];
        await dbModel.remove({});
        if ( newData ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await dbModel.insertMany(newData);
        }
        consola.success(
            `${ dbModel.collection.collectionName } ${
                newData ? 'seeded' : 'cleared'
            }`,
        );
    }
};


