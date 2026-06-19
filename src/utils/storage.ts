export default {
    // 存储在本地的方法
    get: (key: string) => {
        return localStorage.getItem(key);
    },
    // 存储在本地的方法
    set: (key: string, value: unknown) => {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    // 删除本地的方法
    remove: (key: string) => {
        return localStorage.removeItem(key);
    },
    // 清空本地的方法
    clear: () => {
        return localStorage.clear();
    },
};
