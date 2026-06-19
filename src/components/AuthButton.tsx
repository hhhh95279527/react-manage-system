import { useRouteLoaderData } from 'react-router-dom';
import { Button } from 'antd';
export default function AuthButton(props: any) {
    const data = useRouteLoaderData('layout');
    const { buttonList } = data;
    if (!props.auth) {
        return <></>;
    }
    if (buttonList.includes(props.auth)) {
        <Button {...props}>{props.children}</Button>;
    }
}
