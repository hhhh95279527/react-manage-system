import { Form, Modal, Tree, message } from 'antd';
import { useState, RefObject, useImperativeHandle, useEffect } from 'react';
import type { TreeProps, TreeDataNode } from 'antd';
import { IMenu, IPermission, IRole } from '../../types/api';
import api from '../../api';
import roleApi from '../../api/roleApi';
interface IProps {
    mref: RefObject<{ openModal: (type: string, data?: IRole) => void }>;
    update: () => void;
}
export default function CreateRole(props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuList, setMenuList] = useState<IMenu[]>([]);
    const [checkedKeys, setCheckKeys] = useState<string[]>([]);
    const [permission, setPermission] = useState<IPermission>();
    const [roleInfo, setRoleInfo] = useState<IRole>();
    const [form] = Form.useForm();
    // 初始化数据
    useEffect(() => {
        getMenuList();
    }, []);
    const getMenuList = async () => {
        const data = await api.getMenuList();
        setMenuList(data);
    };
    const handleOk = async () => {
        if (permission) {
            await roleApi.updatePermission(permission);
            message.success('设置成功');
        }
        handleCancel();
        props.update();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const openModal = (type: string, data?: IRole) => {
        setRoleInfo(data);
        setIsModalOpen(true);
        setCheckKeys(data?.permissionList.checkedKeys || []);
        if (data) {
            form.setFieldsValue(data);
        }
    };
    useImperativeHandle(props.mref, () => ({ openModal }));
    // emit
    const onCheck: TreeProps['onCheck'] = (checkedKeys: any, info: any) => {
        setCheckKeys(checkedKeys);
        console.log('onCheck', checkedKeys, info);
        const checkedKeysTemp: string[] = [];
        const halfCheckedKeysTemp: string[] = [];
        info.checkedNodes.map((node: IMenu) => {
            if (node.menuType === 2) {
                checkedKeysTemp.push(node._id);
            } else {
                halfCheckedKeysTemp.push(node._id);
            }
        });
        setPermission({
            _id: roleInfo?._id || '',
            permissionList: {
                checkedKeys: checkedKeysTemp,
                halfCheckedKeys: halfCheckedKeysTemp.concat(info.halfCheckedKeys),
            },
        });
    };
    return (
        <>
            <Modal title="设置权限" open={isModalOpen} width={600} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} labelAlign="right" labelCol={{ span: 4 }}>
                    <Form.Item label="角色名称"></Form.Item>
                    <Form.Item label="权限">
                        <Tree
                            checkable
                            onCheck={onCheck}
                            defaultExpandAll
                            checkedKeys={checkedKeys}
                            fieldNames={{
                                key: '_id',
                                children: 'children',
                                title: 'menuName',
                            }}
                            treeData={menuList as unknown as TreeDataNode[]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
