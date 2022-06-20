import { IClass, IUser } from '@general-types/index.types';
import { Class } from '../classes/entities/class.entity';
import { User } from '../users/entities/user.entity';
import { Course } from './entities/course.entity';

interface ICourseService {
    create: {
        title: string;
        instructor: string;
        classes: IClass['_id'][];
    };
    update: {
        id: string;
        courseData?: ICourseService['create'];
    };
}

class CourseService {
    async create({ title, instructor, classes }: ICourseService['create']) {
        const candidate = await Course.findOne({ title }).exec();
        if ( candidate ) {
            return {
                status: 409,
                body: { message: 'Course title already taken' },
            };
        }

        const course = new Course({ title, instructor, classes });

        await User.findByIdAndUpdate(course.instructor, {
            $push: { courses: course._id },
        }).exec();
        await Class.updateMany(
            {
                _id: {
                    $in: course.classes,
                },
            },
            {
                $push: { courses: course._id },
            },
        ).exec();

        await course.save();

        return { status: 201, body: course };
    }

    async update({ id, courseData }: ICourseService['update']) {
        const candidate = await Course.findById(id).exec();
        if ( !candidate ) {
            return { status: 200, body: courseData };
        }

        const updatedCourse = await candidate
            .update({ $set: { ...courseData } }, { new: true })
            .exec();

        return { status: 200, body: updatedCourse };
    }

    async getAll({ _id, role }: Pick<IUser, '_id' | 'role'>) {
        if ( role === 'admin' ) {
            return Course.find().exec();
        }
        return Course.find({
            ...(role === 'instructor' ? { instructor: _id } : { $in: { students: _id } }),
        })
            .exec();
    }

    async getOne({ id }: ICourseService['update']) {
        const candidate = await Course.findById(id).populate('chapters').exec();
        if ( !candidate ) {
            return { status: 404, body: { message: 'Course doesn`t exist' } };
        }

        return { status: 200, body: candidate };
    }

    async remove({ id }: ICourseService['update']) {
        const candidate = await Course.findById(id).exec();
        if ( !candidate ) {
            return {
                status: 404,
                body: { message: 'Provided course doesn`t exists' },
            };
        }

        await candidate.remove();

        return { status: 200, body: { success: true } };
    }
}

export default new CourseService();
