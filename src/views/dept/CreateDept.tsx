import { useEffect } from 'react';
import { Form, Modal, Input, Select, TreeSelect, message } from 'antd';
import { useState, RefObject, useImperativeHandle } from 'react';
import { IDept, IUser } from '../../types/api';
import api from '../../api';
interface IProps {
    mref: RefObject<{ openModal: (type: string, data?: IDept | { parentId: string }) => void }>;
    update: () => void;
}
export default function CreateDept(props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deptList, setDeptList] = useState<IDept[]>();
    const [userList, setUserList] = useState<IUser[]>();
    const [action, setAction] = useState<string>('create');
    const [form] = Form.useForm();
    useEffect(() => {
        getAllUserList();
    }, []);
    // 获取部门列表
    const getDepthData = async () => {
        const data = await api.getDeptList();
        setDeptList(data);
    };
    const getAllUserList = async () => {
        const data = await api.getAllUserList();
        setUserList(data);
    };
    const handleOk = async () => {
        const valid = await form.validateFields();
        if (!valid) return;
        if (action === 'create') {
            await api.createDept(form.getFieldsValue());
            message.success('创建成功');
        } else if (action === 'edit') {
            await api.updateDept(form.getFieldsValue());
            message.success('编辑成功');
        }
        handleCancel();
        props.update();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const openModal = (type: string, data?: IDept | { parentId: string }) => {
        setAction(type);
        setIsModalOpen(true);
        getDepthData();
        if (data) {
            form.setFieldsValue(data);
        }
    };
    useImperativeHandle(props.mref, () => ({ openModal }));
    // emit
    return (
        <>
            <Modal
                title={action === 'create' ? '创建部门' : '编辑部门'}
                open={isModalOpen}
                width={800}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} labelAlign="right" labelCol={{ span: 4 }}>
                    <Form.Item hidden name="_id">
                        <Input />
                    </Form.Item>
                    <Form.Item label="上级部门" name="parentId">
                        <TreeSelect
                            placeholder="请选择上级部门"
                            allowClear
                            treeDefaultExpandAll
                            treeData={deptList}
                            fieldNames={{ label: 'deptName', value: '_id' }}
                        ></TreeSelect>
                    </Form.Item>
                    <Form.Item label="部门名称" name="deptName" rules={[{ required: true, message: '请输入部门名称' }]}>
                        <Input placeholder="请输入部门名称" />
                    </Form.Item>
                    <Form.Item label="负责人" name="userName" rules={[{ required: true, message: '请选择负责人' }]}>
                        <Select>
                            {userList?.map((item) => (
                                <Select.Option key={item._id} value={item.userName}>
                                    {item.userName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
