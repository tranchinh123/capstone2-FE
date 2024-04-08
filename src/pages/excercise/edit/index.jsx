import { Select, Collapse, Input, Button, Tooltip, Switch } from 'antd';
import {
    PlusOutlined,
    FileDoneOutlined,
    CheckOutlined
} from '@ant-design/icons';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { CiBoxList } from 'react-icons/ci';
import ReactQuill from 'react-quill';
import { modules } from '../../../constants/RichTextEditorModules';
import 'react-quill/dist/quill.snow.css';

import styles from './styles.module.scss';

const ExcerciseEditPage = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <>
            <div className={styles.excerciseEditPage}>
                <Select
                    style={{
                        width: 350
                    }}
                    size="large"
                    onChange={handleChange}
                    placeholder={
                        <div className={styles.selectPlaceHolder}>
                            <PlusOutlined />
                            Add a new question
                        </div>
                    }
                    options={[
                        {
                            value: 'jack',
                            label: 'Jack'
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy'
                        },
                        {
                            value: 'Yiminghe',
                            label: 'yiminghe'
                        }
                    ]}
                />
            </div>
            <Collapse
                collapsible="header"
                defaultActiveKey={['1']}
                style={{
                    marginTop: '50px'
                }}
                items={[
                    {
                        key: '1',
                        label: (
                            <h3>
                                <CiBoxList style={{ width: '15px', height: '15px' }} /> Question
                            </h3>
                        ),
                        children: (
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '3fr 1fr',
                                    gap: '30px'
                                }}
                            >
                                <div>
                                    <h3>Question content</h3>
                                    <ReactQuill theme="snow" modules={modules} />
                                    <div className={styles.inputs}>
                                        <div className={styles.inputWrapper}>
                                            <Input />
                                            <FaRegTrashAlt className={styles.trashIcon} />
                                            <div className={styles.checkIcon}>
                                                <CheckOutlined style={{ color: 'white' }} />
                                            </div>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <Input />
                                            <FaRegTrashAlt className={styles.trashIcon} />
                                            <div className={styles.checkIcon}>
                                                <CheckOutlined style={{ color: 'white' }} />
                                            </div>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <Input />
                                            <FaRegTrashAlt className={styles.trashIcon} />
                                            <div className={styles.checkIcon}>
                                                <CheckOutlined style={{ color: 'white' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3>
                                        <FileDoneOutlined /> {'   '} Question mark
                                    </h3>
                                    <Input />
                                    <p style={{ marginTop: '4px' }}>
                                        Correct answer{'  '}
                                        <Tooltip title="Click ✓ to select the correct answer for the question">
                                            <FiAlertCircle />
                                        </Tooltip>
                                    </p>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            marginTop: '20px'
                                        }}
                                    >
                                        <Switch defaultChecked />
                                        <h3>Multiple answers</h3>
                                    </div>
                                </div>
                                <Button type="text" style={{ fontWeight: 'bold' }}>
                                    + Add choice
                                </Button>
                            </div>
                        )
                    }
                ]}
            />
        </>
    );
};

export default ExcerciseEditPage;