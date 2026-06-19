import {
  Form,
  Modal,
  Input,
  TreeSelect,
  message,
  Radio,
  InputNumber,
} from "antd";
import { useState, RefObject, useImperativeHandle } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { IMenu } from "../../types/api";
import api from "../../api";
interface IProps {
  mref: RefObject<{
    openModal: (type: string, data?: IMenu | { parentId: string }) => void;
  }>;
  update: () => void;
}
export default function CreateDept(props: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuList, setMenuList] = useState<IMenu[]>();
  const [action, setAction] = useState<string>("create");
  const [form] = Form.useForm();
  // 获取菜单列表
  const getMenuData = async () => {
    const data = await api.getMenuList();
    setMenuList(data);
  };
  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    if (action === "create") {
      await api.createDept(form.getFieldsValue());
      message.success("创建成功");
    } else if (action === "edit") {
      await api.updateDept(form.getFieldsValue());
      message.success("编辑成功");
    }
    handleCancel();
    props.update();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const openModal = (type: string, data?: IMenu | { parentId: string }) => {
    setAction(type);
    getMenuData();
    setIsModalOpen(true);
    if (data) {
      form.setFieldsValue(data);
    }
  };
  useImperativeHandle(props.mref, () => ({ openModal }));
  // emit
  return (
    <>
      <Modal
        title={action === "create" ? "创建菜单" : "编辑菜单"}
        open={isModalOpen}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelAlign="right"
          labelCol={{ span: 4 }}
          initialValues={{ menuType: 1, menuState: 1 }}
        >
          <Form.Item hidden name="_id">
            <Input />
          </Form.Item>
          <Form.Item label="上级菜单" name="parentId">
            <TreeSelect
              placeholder="请选择父级菜单"
              allowClear
              treeDefaultExpandAll
              treeData={menuList}
              fieldNames={{ label: "menuName", value: "_id" }}
            ></TreeSelect>
          </Form.Item>
          <Form.Item label="菜单类型" name="menuType">
            <Radio.Group>
              <Radio value={1}>菜单</Radio>
              <Radio value={2}>按钮</Radio>
              <Radio value={3}>页面</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="菜单名称"
            name="menuName"
            rules={[{ required: true, message: "请输入菜单名称" }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {() => {
              return form.getFieldValue("menuType") === 2 ? (
                <Form.Item label="权限标识" name="menuCode">
                  <Input placeholder="请输入权限标识" />
                </Form.Item>
              ) : (
                <>
                  <Form.Item label="菜单图标" name="icon">
                    <Input placeholder="请输入菜单图标" />
                  </Form.Item>
                  <Form.Item label="路由地址" name="path">
                    <Input placeholder="请输入路由地址" />
                  </Form.Item>
                </>
              );
            }}
          </Form.Item>
          <Form.Item label="组件名称" name="component">
            <Input placeholder="请输入组件名称" />
          </Form.Item>
          <Form.Item
            label="排序"
            name="orderBy"
            tooltip={{
              title: "排序值越大越靠后",
              icon: <InfoCircleOutlined rev={undefined} />,
            }}
          >
            <InputNumber placeholder="请输入排序值" />
          </Form.Item>
          <Form.Item label="菜单状态" name="menuState">
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>停用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
