import { ApiError } from '@exceptions/api-error.exception';
import { Course } from '../courses/entities/course.entity';
import { Chapter } from './entities/chapter.entity';

interface IChapterService {
    create: {
        title: string;
        course: string;
    };
    update: {
        id: string;
        data: { title: string };
    };
    getOne: {
        id: string;
    };
}

class ChapterService {
    async create(data: IChapterService['create']) {
        const candidate = await Chapter.findOne({ title: data.title }).exec();
        if ( candidate ) {
            throw ApiError.BadRequest(
                'Chapter with this title already exists.',
            );
        }

        const chapter = new Chapter({ ...data });

        await Course.findByIdAndUpdate(data.course, {
            $push: { chapters: chapter._id },
        }).exec();

        await chapter.save();

        return { status: 201, body: chapter };
    }

    async update({ id, data }: IChapterService['update']) {
        const candidate = await Chapter.findById(id).exec();
        if ( !candidate ) {
            throw ApiError.NotFoundError();
        }

        const chapter = await Chapter.findByIdAndUpdate(
            id,
            { title: data.title },
            { new: true },
        ).exec();

        return {
            status: 200,
            body: chapter,
        };
    }

    async getAll() {
        return Chapter.find().exec();
    }

    async getOne({ id }: IChapterService['getOne']) {
        return Chapter.findById(id).exec();

        // if ( !chapter ) {
        //     throw ApiError.NotFoundError();
        // }
        //
        // const subdivisions: SubdivisionItem[] = [];
        //
        // const populatedChapter = {
        //     ...chapter,
        //     subdivisions,
        // };
        //
        // for ( const { item, subdivisionType } of chapter.subdivisions ) {
        //     const subdivisionData =
        //         subdivisionType === 'lectures'
        //             ? await Lecture.findById(item).exec()
        //             : await Quiz.findById(item).exec();
        //
        //     if ( subdivisionData ) {
        //         populatedChapter.subdivisions.push({
        //             item: subdivisionData,
        //             // _id: subdivisionData?.fileId || subdivisionData._id,
        //             // title: subdivisionData.title,
        //             // },
        //             subdivisionType,
        //         });
        //     }
        // }
        //
        // return {
        //     status: 200,
        //     body: populatedChapter,
        // };
    }

    async remove({ id }: IChapterService['getOne']) {
        const candidate = await Chapter.findById(id).exec();
        if ( !candidate ) {
            return {
                status: 404,
                body: { message: 'Provided chapter doesn`t exists' },
            };
        }

        await candidate.remove();

        return { status: 200, body: { success: true } };
    }
}

export default new ChapterService();
