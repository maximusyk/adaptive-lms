import { Chapter } from '@chapters/entities/chapter.entity';
import { ApiError } from '@exceptions/api-error.exception';
import { S3 } from 'aws-sdk';
import crypto from 'crypto';
import 'dotenv/config';
import { JSDOM } from 'jsdom';
import mammoth from 'mammoth';
import mongoose from 'mongoose';
import { Unit } from '../units/entities/unit.entity';
import { Lecture } from './entities/lecture.entity';

interface ILectureArgs {
    id?: string;
    title?: string;
    fileId?: string;
    content?: Express.Multer.File[];
    chapter?: string;
    course?: string;
    units?: string;
}

class LectureService {
    s3 = new S3({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    awsBucketName = process.env.AWS_BUCKET as string;

    async uploadLectureFile(lecture: Buffer) {
        console.log('Uploading lecture file...');
        const uploadParams = {
            Bucket: this.awsBucketName,
            Body: lecture,
            Key: crypto.randomBytes(20).toString('hex'),
        };

        console.log('Ready to upload...');

        return this.s3.upload(uploadParams).promise();
    }

    async checkS3(key: string) {
        return new Promise((resolve) => {
            this.s3.headObject(
                { Bucket: this.awsBucketName, Key: key },
                (err) => {
                    if ( err ) return resolve(false);
                    return resolve(true);
                },
            );
        });
    }

    async removeLectureFile(id: string) {
        const checkResult = await this.checkS3(id);
        if ( !checkResult ) {
            return false;
        }

        return this.s3
            .deleteObject(
                {
                    Bucket: this.awsBucketName,
                    Key: id,
                },
                (error) => {
                    if ( !error ) return true;
                },
            )
            .promise();
    }

    async downloadLectureFile(id: string) {
        const checkResult = await this.checkS3(id);
        if ( !checkResult ) {
            return false;
        }
        return this.s3
            .getObject({ Bucket: this.awsBucketName, Key: id })
            .createReadStream();
    }

    async readLecture(id: string) {
        const downloadStream = await this.downloadLectureFile(id);
        if ( !downloadStream ) {
            throw ApiError.NotFoundError();
        }
        return downloadStream;
    }

    async editLecture(data: ILectureArgs) {
        const { id, content } = data;

        const lectureBuffer: Buffer | null = content?.length
            ? content[0].buffer
            : null;

        if ( !lectureBuffer ) throw ApiError.BadRequest('No provided file');

        const lecture = await Lecture.findById(id).exec();

        if ( !lecture ) {
            throw ApiError.NotFoundError();
        }

        const removeResult = await this.removeLectureFile(lecture.fileId);
        if ( !removeResult ) {
            throw ApiError.NotFoundError();
        }

        const lectureFile = await this.uploadLectureFile(lectureBuffer);

        return this.update({
            id,
            fileId: lectureFile.Key,
            title: 'fdacsfdasx',
        });
    }

    async create(data: ILectureArgs) {
        const { title, content, chapter, course } = data;

        const rawContent = content?.length ? content[0] : null;

        if ( !rawContent ) throw ApiError.BadRequest('No provided file');

        const candidate = await Lecture.findOne({ title }).exec();
        if ( candidate ) {
            throw ApiError.BadRequest('Lecture with this title already exists');
        }

        const cleanedLectureHtmlElm = await this.cleanLectureContent(
            rawContent.buffer,
        );

        const lectureBuffer = Buffer.from(
            cleanedLectureHtmlElm.innerHTML,
            'utf-8',
        );

        const uploadedLecture = await this.uploadLectureFile(lectureBuffer);

        const _id = new mongoose.Types.ObjectId();

        const createdUnits = await this.createInitialUnits(
            cleanedLectureHtmlElm,
            course as string,
            chapter as string,
            _id.toString(),
        );

        const lecture = new Lecture({
            _id,
            title,
            chapter,
            fileId: uploadedLecture.Key,
            units: [ ...createdUnits ].map((unit) => unit._id),
        });

        await Chapter.findByIdAndUpdate(
            chapter,
            {
                $push: {
                    subdivisions: {
                        item: lecture._id,
                        subdivisionType: 'lectures',
                    },
                },
            },
            { new: true },
        ).exec();

        await lecture.save();

        return lecture;
    }

    async update({ id, ...data }: ILectureArgs) {
        const lecture = await Lecture.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
        ).exec();

        if ( !lecture ) {
            throw ApiError.NotFoundError();
        }

        return lecture;
        /*
         if ( JSON.parse(units)?.length ) {
         const existedUnits = await Unit.find({
         course: lectureValues.course,
         }).exec();
         const sortedUnits = [...existedUnits].sort((a, b) => {
         return a.title.localeCompare(b.title, undefined, {
         numeric: true,
         sensitivity: 'base',
         });
         });
         const newUnitsContent: string[] = [];
         const unitsToUpdate = sortedUnits
         .map(({ _id, title, content }, idx) => {
         if ( JSON.parse(units)[idx] !== content ) {
         newUnitsContent.push(JSON.parse(units)[idx]);
         return _id;
         }
         })
         .filter(Boolean);

         for ( const [idx, unit] of newUnitsContent.entries() ) {
         await Unit.updateOne(
         {
         _id: unitsToUpdate[idx],
         },
         {
         $set: {
         content: unit,
         },
         },
         ).exec();
         }
         }
         */
    }

    async getAll() {
        return Lecture.find().exec();
    }

    async getOne({ id }: { id: string }) {
        const lecture = await Lecture.findById(id).exec();

        if ( !lecture ) {
            throw ApiError.NotFoundError();
        }

        return lecture;
    }

    async remove(id: string) {
        const candidate = await Lecture.findById(id).exec();
        if ( !candidate ) {
            throw ApiError.NotFoundError();
        }

        const removeResult = await this.removeLectureFile(candidate.fileId);
        if ( !removeResult ) {
            throw ApiError.NotFoundError();
        }

        await candidate.remove();

        return { success: true };
    }

    async convertToHTML(buffer: Buffer) {
        return mammoth
            .convertToHtml({ buffer })
            .then(({ value }) =>
                value.replace(/(<(?!\/)((?!img)[^>])+>)+(<\/[^>]+>)+/g, ''),
            );
    }

    async cleanLectureContent(buffer: Buffer): Promise<HTMLBodyElement> {
        const htmlString = await this.convertToHTML(buffer);
        const htmlElement = new JSDOM(htmlString).window.document.querySelector(
            'body',
        ) as HTMLBodyElement;
        if ( htmlElement && htmlElement.children ) {
            htmlElement.innerHTML = Array.from(htmlElement.children)
                .filter(
                    ({ textContent }) =>
                        textContent && !textContent.match(/^\s*$/),
                )
                .map(({ outerHTML }) => outerHTML)
                .join('');
        }
        return htmlElement;
    }

    private async createInitialUnits(
        htmlBody: HTMLBodyElement,
        course: string,
        chapter: string,
        lecture: string,
    ) {
        const parsedUnits = Array.from(htmlBody.children)
            .map(({ outerHTML, textContent }) => {
                if ( textContent && !textContent.match(/^\s*$/) ) {
                    const unitTitle = textContent.match(
                        /(\S+\s+\S+|\S+)/,
                    ) as RegExpMatchArray;

                    return {
                        title: `Unit "${ unitTitle[1]
                            ?.replace(/\s+/g, ' ')
                            ?.trim() }"`,
                        content: outerHTML,
                        course,
                        chapter,
                        lecture,
                    };
                }
            })
            .filter(Boolean);

        const createdUnits = await Unit.insertMany([ ...parsedUnits ]);

        return [ ...createdUnits ];
    }
}

export default new LectureService();
