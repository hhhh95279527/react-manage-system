import React from 'react';
import './index.css';
interface Props {
    title?: string;
    children?: React.ReactNode;
    callback?: (params: string) => void;
}
const Card: React.FC<Props> = (props) => {
    window.addEventListener('on-card-click', (e) => {
        console.log(e.params, '触发了');
    });
    return (
        <div className="card">
            <header>
                <div>{props.title || '标题'}</div>
                <div>副标题</div>
            </header>
            <main>{props.children}</main>
            <footer>
                <button>确定</button>
                <button>取消</button>
            </footer>
        </div>
    );
};

export default Card;
// export default function Card(props: Props) {
//     console.log(props);
// }
