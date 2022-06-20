import { Meta } from 'antd-form-builder';

export const getCurriculumMeta = (isChapterForm: boolean): Meta => {
    const contentTypes = ['Lecture', 'Quiz'];
    const meta: Meta = {
        columns: 1,
        fields: [
            {
                key: 'title',
                label: 'Title',
                formItemLayout: [],
            },
        ],
    };
    if (Array.isArray(meta?.fields) && !isChapterForm)
        meta?.fields?.push({
            key: 'type',
            label: 'ContentType',
            widget: 'select',
            options: contentTypes,
        });
    return meta;
};
