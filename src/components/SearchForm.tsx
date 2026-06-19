import { Form, Space, Button } from 'antd';
export default function SearchForm(props: any) {
    return (
        <Form className="search-form" form={props.form} initialValues={props.initialValues} layout="inline">
            {props.children}
            <Form.Item>
                <Space>
                    <Button type="primary" onClick={props.submit}>
                        搜索
                    </Button>
                    <Button type="default" onClick={props.reset}>
                        重置
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
