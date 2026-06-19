import { Form, Input, Button } from 'antd';
import styles from './index.module.less';
import { ILoginParams } from '../../types/api';
import api from '../../api';
import storage from '../../utils/storage.ts';
const Login = () => {
    const onFinish = async (values: ILoginParams) => {
        const data = await api.login(values);
        storage.set('token', data);
        window.location.href = '/';
        console.log('Success:', data);
    };
    return (
        <div className={styles.login}>
            <div className={styles.loginWrapper}>
                <div className={styles.title}>系统登陆</div>
                <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default Login;
