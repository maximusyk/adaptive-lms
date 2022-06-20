import { IUserQuizResultCreateDto, IUserQuizResultUpdateDto } from './dto/user-quiz-result.dto';
import { UserQuizResult } from './entities/user-quiz-result.entity';
import { ApiError } from '@exceptions/api-error.exception';

import QuizService from '@quizzes/quiz.service';

class UserQuizResultService {
    async setResult(quizResultData: IUserQuizResultCreateDto) {
        const candidate = await UserQuizResult.findOne({
            quiz: quizResultData.quizId,
            user: quizResultData.userId,
        }).exec();
        if ( candidate ) {
            return candidate.update({
                quiz: quizResultData.quizId,
                user: quizResultData.userId,
                score: quizResultData.score,
            }, { new: true });
        }

        const userQuizResult = await UserQuizResult.create({
            quiz: quizResultData.quizId,
            user: quizResultData.userId,
            score: quizResultData.score,
        });

        await QuizService.update({ _id: quizResultData.quizId, results: [ userQuizResult._id ] });

        return userQuizResult;
    }

    async update(quizResultData: IUserQuizResultUpdateDto) {
        const userQuizResult = await UserQuizResult.findOne({ _id: quizResultData._id }).exec();
        if ( !userQuizResult ) {
            throw ApiError.NotFoundError();
        }

        return userQuizResult.update({ ...quizResultData }, { new: true });
    }

    async getByQuizId(quizId: string) {
        return UserQuizResult.find({ quiz: quizId });
    }

    async getByUserId(userId: string) {
        return UserQuizResult.find({ user: userId });
    }

    async getAll() {
        return UserQuizResult.find();
    }

    async getOne(id: string) {
        return UserQuizResult.findOne({ _id: id });
    }

    async remove(id: string) {
        const userQuizResult = await UserQuizResult.findOne({ _id: id }).exec();
        if ( !userQuizResult ) {
            throw ApiError.NotFoundError();
        }
        return userQuizResult.remove();
    }
}

export default new UserQuizResultService();