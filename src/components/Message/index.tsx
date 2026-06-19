import ReactDom from 'react-dom/client'
import './index.css';
const Message = () => {
    return (
        <div>
            消息提示
        </div>
    )
}
interface Item {
    root: ReactDom.Root;
    messageContainer: HTMLElement;
}
const res: Item[] = [];
window.onShow = () => {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message';
    messageContainer.style.top = `${res.length * 40}px`;
    document.body.appendChild(messageContainer);
    // 容器如何关联到根节点
    const root = ReactDom.createRoot(messageContainer);
    root.render(<Message />);

    res.push({
        root,
        messageContainer
    });

    setTimeout(() => {
        const item = res.find((item) => item.messageContainer === messageContainer)!;
        item.root.unmount();
        document.body.removeChild(messageContainer);
        res.splice(res.indexOf(item), 1);
    }, 2000);
};
// 声明扩容
declare global {
    interface Window {
        onShow: () => void;
    }
}

export default Message;