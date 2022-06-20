// import CrudService from '@services/crud.service';
import { IClass } from '@general-types/class.type';
import { ICourse } from '@general-types/course.type';
import { IUser } from '@general-types/user.type';
import { Button, Form, Space } from 'antd';
import FormBuilder, { Meta } from 'antd-form-builder';
import { useEffect, useState } from 'react';
// import { getMeta } from './formFields';
import './index.scss';

interface ICreateForm {
    createHandler: (values: IUser | ICourse | IClass) => Promise<void>;
    dataType: string;
}

export const CreateForm = ({ createHandler, dataType }: ICreateForm) => {
    const [ form ] = Form.useForm();
    const [ meta, setMeta ] = useState<Meta>();

    useEffect(() => {
        if ( dataType ) {
            // setMeta(getMeta<typeof dataType>(dataType));
        }
    }, [ dataType ]);

    return (
        <Form form={ form } onFinish={ createHandler } className="w-4/5 mx-auto">
            <Space>
                <Space>
                    {/* {createForm && ( */ }
                    <Space className="create-form">
                        <FormBuilder
                            meta={ meta as FormBuilder.Meta }
                            form={ form }
                        />
                    </Space>
                    {/* )} */ }
                </Space>
                <Form.Item>
                    {/* {!createForm ? (
                     <Button
                     type='primary'
                     htmlType={'submit'}
                     onClick={handleForm}
                     >
                     Submit
                     </Button>
                     ) : (
                     )} */ }
                    <Button
                        type="primary"
                        htmlType={ 'button' }
                        // onClick={handleForm}
                    >
                        Add new
                    </Button>
                </Form.Item>
            </Space>
        </Form>
    );
};
