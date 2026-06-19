import { Button, Table, Space, Form, Input, Modal } from "antd";
import { useState, useRef } from "react";
import type { TableColumnsType } from "antd";
import api from "../../api";
import { useEffect } from "react";
import { IDept } from "../../types/api";
import { formatDateToChinese } from "../../utils";
import CreateDept from "./CreateDept";
export default function Depth() {
  const deptRef = useRef<{
    openModal: (type: string, data?: IDept | { parentId: string }) => void;
  }>(null);
  const [data, setData] = useState<IDept[]>([]);
  const [loading, setLoading] = useState(false); // // 用来控制加载状态
  const [form] = Form.useForm();
  useEffect(() => {
    getDepthData();
  }, []);
  /**
   * 获取部门列表数据
   *
   * 根据表单查询条件获取部门列表，并更新表格数据
   */
  const getDepthData = async () => {
    setLoading(true);
    const data = await api.getDeptList(form.getFieldsValue());
    setData(data);
    setLoading(false);
  };
  const columns: TableColumnsType<IDept> = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "deptName",
      width: "200",
    },
    {
      title: "负责人",
      dataIndex: "userName",
      key: "userName",
      width: "150",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (text) => {
        return formatDateToChinese(text);
      },
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (text) => {
        return formatDateToChinese(text);
      },
    },
    {
      title: "操作",
      key: "action",
      width: "200",
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
    deptRef.current?.openModal("create", { parentId: id });
  };
  const handleEdit = (record: IDept) => {
    console.log(record);
    deptRef.current?.openModal("edit", record);
  };
  const handleDel = (id: string) => {
    Modal.confirm({
      title: "删除部门",
      content: "确定删除该部门吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        handleDelOk(id);
      },
    });
  };
  const handleDelOk = async (id: string) => {
    await api.deleteDept({ _id: id });
    getDepthData();
  };
  const handleReset = () => {
    form.resetFields();
    getDepthData();
  };
  const handleCreate = () => {
    console.log("新增");
    deptRef.current?.openModal("create");
  };
  return (
    <div>
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item name="deptName" label="部门名称">
          <Input placeholder="请输入部门名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mr10" onClick={getDepthData}>
            查询
          </Button>
          <Button type="primary" htmlType="submit" onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className="wrap-table">
        <div className="header">
          <div className="title">部门列表</div>
          <div className="action">
            <Button onClick={handleCreate}>新增</Button>
          </div>
        </div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data}
          loading={loading}
        />
      </div>
      <CreateDept mref={deptRef} update={getDepthData} />
    </div>
  );
}
