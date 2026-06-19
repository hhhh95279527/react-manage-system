import { useSyncExternalStore } from 'react';

// history api实现， 跳转， 监听history变化
export const useHistory = () => {
    const subscribe = (callback: () => void) => {
        // 订阅浏览器api 监听history变化
        // vue 三种路由结构  ssr  浏览器： hash history
        // hash 底层 监听hashchange事件
        // history 底层 监听popstate事件
        window.addEventListener('popstate', callback);
        window.addEventListener('hashchange', callback);
        return () => {
            // 取消订阅
            window.removeEventListener('hashchange', callback);
            window.removeEventListener('popstate', callback);
        };
        // popstate 只能监听浏览器的前进和后退按钮 无法监听 pushState replaceState
    };
    const getSnapshot = () => {
        return window.location.href;
    };
    const url = useSyncExternalStore(subscribe, getSnapshot);

    const push = (url: string) => {
        // 跳转
        window.history.pushState({}, '', url);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };
    const replace = (url: string) => {
        // 替换
        window.history.replaceState({}, '', url);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };
    return [url, push, replace] as const; // 元组类型
};
