import { useEffect, useState } from 'react';
import { Button, Transfer, Modal } from 'antd';

const CreateExcerciseModal = ({ isModalOpen, setIsModalOpen }) => {
    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const getMock = () => {
        const tempTargetKeys = [];
        const tempMockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: i % 2 === 0
            };
            if (data.chosen) {
                tempTargetKeys.push(data.key);
            }
            tempMockData.push(data);
        }
        setMockData(tempMockData);
        setTargetKeys(tempTargetKeys);
    };
    useEffect(() => {
        getMock();
    }, []);
    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
    };

    const getMoreData = () => {
        const tempMockData = [];
        for (let i = 0; i < 10; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1 + 100}`,
                description: `description of content${i + 1 + 100}`,
                chosen: false
            };
            tempMockData.push(data);
        }
        console.log(tempMockData, 'tempMockData');
        setMockData([...mockData, ...tempMockData]);
    };

    return (
        <Modal
            title="Create excercise"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={() => <></>}
            style={{ margin: '0 auto' }}
            width="640px"
        >
            <Transfer
                dataSource={mockData}
                showSearch
                listStyle={{
                    width: 250,
                    height: 350
                }}
                operations={['to right', 'to left']}
                targetKeys={targetKeys}
                onChange={handleChange}
                render={(item) => `${item.title}-${item.description}`}
                onScroll={(direction, e) => {
                    const container = e.target;
                    if (
                        container.scrollHeight - container.scrollTop ===
                        container.clientHeight &&
                        direction === 'left'
                    ) {
                        console.log('end');
                        getMoreData();
                    }
                }}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '20px'
                }}
            >
                <Button type="primary">Create</Button>
            </div>
        </Modal>
    );
};

export default CreateExcerciseModal;