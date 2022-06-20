import { useAppSelector } from '@hooks/redux.hook';
import { PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface IContentHeader {
    defaultTitle?: string;
}

export const ContentHeader = ({ defaultTitle = '' }: IContentHeader) => {
    const { chapter_id, course_id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const actualCourseTitle = useAppSelector(
        (state) => state.courses.item.title,
    );
    const actualChapterTitle = useAppSelector(
        (state) => state.chapters.item.title,
    );

    const getActualTitle = () => {
        if (actualChapterTitle && chapter_id) return actualChapterTitle;
        if (actualCourseTitle && course_id) return actualCourseTitle;
        return '';
    };

    useEffect(() => {
        setTitle(getActualTitle());
    }, [chapter_id, course_id, actualCourseTitle, actualChapterTitle]);

    return (
        <PageHeader
            className='px-5 py-0 w-100'
            onBack={() => navigate(-1)}
            title={defaultTitle || title}
        />
    );
};
