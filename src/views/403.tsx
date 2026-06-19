import { Result, Button } from 'antd';

const NotFound = () => {
    const handleClick = () => {
        window.location.href = '/';
    };
    return (
        <Result
            status={403}
            title="403"
            subTitle="抱歉，您当前没有权限访问此页面"
            extra={
                <Button type="primary" onClick={handleClick}>
                    回首页
                </Button>
            }
        ></Result>
    );
};
export default NotFound;
