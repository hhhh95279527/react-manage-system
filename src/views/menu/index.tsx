import { Button, Table, Space, Form, Input, Modal, Select } from 'antd';
import { useState, useRef } from 'react';
import type { TableColumnsType } from 'antd';
import api from '../../api';
import { useEffect } from 'react';
import { IMenu } from '../../types/api';
import { formatDateToChinese } from '../../utils';
import CreateDept from './CreateMenu';
export default function Menu() {
    const menuRef = useRef<{
        openModal: (type: string, data?: IMenu | { parentId: string }) => void;
    }>(null);
    const [data, setData] = useState<IMenu[]>([]);
    const [loading, setLoading] = useState(false); // // 用来控制加载状态
    const [form] = Form.useForm();
    useEffect(() => {
        getMenuData();
    }, []);
    // 获取菜单列表
    const getMenuData = async () => {
        setLoading(true);
        const data = await api.getMenuList(form.getFieldsValue());
        setData(data);
        setLoading(false);
    };
    const columns: TableColumnsType<IMenu> = [
        {
            title: '菜单名称',
            dataIndex: 'menuName',
            key: 'menuName',
        },
        {
            title: '菜单图标',
            dataIndex: 'icon',
            key: 'icon',
        },
        {
            title: '菜单类型',
            dataIndex: 'menuType',
            key: 'menuType',
            render: (text: number) => {
                return {
                    1: '菜单',
                    2: '按钮',
                    3: '页面',
                }[text];
            },
        },
        {
            title: '权限标识',
            dataIndex: 'menuCode',
            key: 'menuCode',
        },
        {
            title: '路由地址',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: '组件名称',
            dataIndex: 'component',
            key: 'component',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text) => {
                return formatDateToChinese(text);
            },
        },
        {
            title: '操作',
            key: 'action',
            width: '200',
            render: (_, record) => {
                return (
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                handleSubCreate(record._id);
                            }}
                        >
                            新增
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                handleEdit(record);
                            }}
                        >
                            编辑
                        </Button>
                        <Button
                            danger
                            onClick={() => {
                                handleDel(record._id);
                            }}
                        >
                            删除
                        </Button>
                    </Space>
                );
            },
        },
    ];
    const handleSubCreate = (id: string) => {
        console.log(id);
        menuRef.current?.openModal('create', { parentId: id });
    };
    const handleEdit = (record: IMenu) => {
        console.log(record);
        menuRef.current?.openModal('edit', record);
    };
    const handleDel = (id: string) => {
        Modal.confirm({
            title: '删除菜单信息',
            content: '确定删除该菜单吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                handleDelOk(id);
            },
        });
    };
    const handleDelOk = async (id: string) => {
        await api.deleteDept({ _id: id });
        getMenuData();
    };
    const handleReset = () => {
        form.resetFields();
        getMenuData();
    };
    const handleCreate = () => {
        menuRef.current?.openModal('create');
    };
    return (
        <div>
            <Form className="search-form" layout="inline" form={form} initialValues={{ menuState: 1 }}>
                <Form.Item name="menuName" label="菜单名称">
                    <Input placeholder="请输入菜单名称" />
                </Form.Item>
                <Form.Item name="menuState" label="菜单状态">
                    <Select placeholder="请选择菜单状态" style={{ width: 100 }}>
                        <Select.Option value={1}>启用</Select.Option>
                        <Select.Option value={2}>禁用</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="mr10" onClick={getMenuData}>
                        查询
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleReset}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
            <div className="wrap-table">
                <div className="header">
                    <div className="title">菜单列表</div>
                    <div className="action">
                        <Button onClick={handleCreate}>新增</Button>
                    </div>
                </div>
                <Table bordered rowKey="_id" columns={columns} dataSource={data} loading={loading} pagination={false} />
            </div>
            <CreateDept mref={menuRef} update={getMenuData} />
        </div>
    );
}
