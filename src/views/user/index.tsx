import {
  Button,
  Table,
  Form,
  Input,
  Select,
  Space,
  Modal,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import api from "../../api";
import { formatDateToChinese } from "../../utils";
import CreateUser from "./CreateUser";
import { useAntdTable } from "ahooks";
import { IUser, IUserSearchParams } from "../../types/api";
import SearchForm from "../../components/SearchForm";
import AuthButton from "../../components/AuthButton";
export default function UserList() {
  const [form] = Form.useForm();
  const [userIds, setUserIds] = useState<number[]>([]);
  const userRef = useRef<{
    openModal: (type: string, data?: IUser) => void;
  }>();

  const getTableData = async (
    { current, pageSize }: { current: number; pageSize: number },
    formData: IUserSearchParams,
  ) => {
    const data = await api.getUserList({
      ...formData,
      pageNum: current,
      pageSize: pageSize,
    });
    return {
      total: data.page.total,
      list: data.list,
    };
  };

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10,
  });

  // 创建用户
  const handleCreate = () => {
    userRef.current?.openModal("create");
  };

  // 编辑用户
  const handleEdit = (record: IUser) => {
    userRef.current?.openModal("edit", record);
  };

  // 删除用户
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: "删除确认",
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit([userId]);
      },
    });
  };

  // 批量删除确认
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error("请选择要删除的用户");
      return;
    }
    Modal.confirm({
      title: "删除确认",
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds);
      },
    });
  };

  // 公共删除用户接口
  const handleUserDelSubmit = async (ids: number[]) => {
    await api.delUser({
      userIds: ids,
    });
    message.success("删除成功");
    setUserIds([]);
    search.reset();
  };

  const columns: ColumnsType<IUser> = [
    {
      title: "用户ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "用户邮箱",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "用户角色",
      dataIndex: "role",
      key: "role",
      render(role: number) {
        return {
          0: "超级管理员",
          1: "管理员",
          2: "体验管理员",
          3: "普通用户",
        }[role];
      },
    },
    {
      title: "用户状态",
      dataIndex: "state",
      key: "state",
      render(state: number) {
        return {
          1: "在职",
          2: "离职",
          3: "试用期",
        }[state];
      },
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      key: "createTime",
      render(createTime: string) {
        return formatDateToChinese(createTime);
      },
    },
    {
      title: "操作",
      key: "address",
      render(record: IUser) {
        return (
          <Space>
            <Button type="text" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="text" danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="user-list">
      <SearchForm
        form={form}
        initialValues={{ state: 1 }}
        submit={search.submit}
        reset={search.reset}
        layout="inline"
      >
        <Form.Item name="userId" label="用户ID">
          <Input placeholder="请输入用户ID" />
        </Form.Item>
        <Form.Item name="userName" label="用户名称">
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item name="state" label="状态">
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
      </SearchForm>
      <div className="wrap-table">
        <div className="header">
          <div className="title">用户列表</div>
          <div className="action">
            <AuthButton
              auth="user@create"
              type="primary"
              onClick={handleCreate}
            >
              新增
            </AuthButton>
            <Button type="primary" danger onClick={handlePatchConfirm}>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey="userId"
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[]);
            },
          }}
          columns={columns}
          {...tableProps}
        />
      </div>
      <CreateUser
        mref={userRef}
        update={() => {
          search.reset();
        }}
      />
    </div>
  );
}
