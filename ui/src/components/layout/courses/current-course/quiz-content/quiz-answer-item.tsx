import { QuestionTypeEnum } from '@general-types/quiz.type';
import { FC } from 'react';
import {
    BsSquare,
    BsSquareFill,
    VscCircleLargeFilled,
    VscCircleLargeOutline,
} from 'react-icons/all';

interface IQuizAnswerItem {
    questionType: QuestionTypeEnum;
    answerTitle: string;
    isCorrect: boolean;
}

export const QuizAnswerItem: FC<IQuizAnswerItem> = ({
    questionType,
    answerTitle,
    isCorrect,
}) => {
    const getVariantIcon = () => {
        if (questionType === 'single') {
            return isCorrect ? (
                <VscCircleLargeFilled
                    size={'1.1rem'}
                    className={
                        'text-violet-700 p-1/2 border-violet-700 border rounded-full'
                    }
                />
            ) : (
                <VscCircleLargeOutline
                    size={'1.1rem'}
                    className={'text-violet-500'}
                />
            );
        }
        return isCorrect ? (
            <BsSquare
                size={'1.1rem'}
                className={'text-violet-700 p-1/2 border-violet-700 border'}
            />
        ) : (
            <BsSquareFill size={'1.1rem'} className={'text-violet-500'} />
        );
    };

    return (
        <div
            className={`flex items-center gap-2 flex-row ${
                questionType === 'input' && 'border-2'
            }`}
        >
            {questionType === 'input' ? (
                <span>{answerTitle}</span>
            ) : (
                getVariantIcon()
            )}
            <span className='text-sm'>{answerTitle}</span>
        </div>
    );
};
