// 日期格式函数
import { IMenu } from '../types/api';

export function formatDateToChinese(dateString: string): string {
    // 将输入的日期字符串解析为 Date 对象
    const date = new Date(dateString);

    // 提取日期和时间部分
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 格式化为 "年月日时分秒" 格式
    return (
        `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日` +
        `${hours.toString().padStart(2, '0')}时${minutes.toString().padStart(2, '0')}分${seconds
            .toString()
            .padStart(2, '0')}秒`
    );
}

export function formateState(state: number) {
    if (state === 1) {
        return '在职';
    } else if (state === 2) {
        return '试用期';
    } else {
        return '离职';
    }
}

// 获取菜单的path
export function getMenuPath(list: IMenu[]): string[] {
    return list.reduce((res: string[], item: IMenu) => {
        return res.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '');
    }, []);
}

// 递归获取路由对象
export const searchRoute: any = (path: string, routes: any[]) => {
    for (const item of routes) {
        if (item.path === path) return item;
        if (item.children) {
            const res = searchRoute(path, item.children);
            if (res) return res;
        }
    }
};

export const findTreeNode = (treeData: IMenu[], pathName: string, path: string[]): string[] => {
    if (!treeData) return [];
    for (const item of treeData) {
        path.push(item.menuName);
        if (item.path === pathName) return path;
        if (item.children?.length) {
            const list = findTreeNode(item.children, pathName, path);
            if (list.length) return list;
        }
        path.pop();
    }
    return [];
};