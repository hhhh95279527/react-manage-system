import React from 'react';
import './index.css';
interface Props {
    title?: string;
    children?: React.ReactNode;
    callback?: (params: string) => void;
}
const Card: React.FC<Props> = (props) => {
    const event = new Event('on-card-click'); // 添加事件中心
    const clickCard = () => {
        event.params = { name: '我是参数' };
        window.dispatchEvent(event); // 触发事件
    };
    return (
        <div className="card">
            <header>
                <div>{props.title || '标题'}</div>
                <div>副标题</div>
            </header>
            <main>{props.children}</main>
            <footer>
                <button onClick={clickCard}>确定</button>
                <button>取消</button>
            </footer>
        </div>
    );
};
//扩充event类型
declare global {
    interface Event {
        params: { name: string };
    }
}
export default Card;
// export default function Card(props: Props) {
//     console.log(props);
// }
