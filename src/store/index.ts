import { create } from 'zustand';
import { IUser } from '../types/api';
export const useStore = create<{
    collapsed: boolean;
    userInfo: IUser;
    currentMenu: string;
    isDark: boolean;
    updateTheme: (isDark: boolean) => void;
    updateCollapsed: () => void;
    updateUserInfo: (userInfo: IUser) => void;
    setCurrentMenu: (menu: string) => void;
}>((set) => ({
    collapsed: false,
    isDark: false,
    userInfo: {
        _id: '',
        userId: 0,
        userName: '',
        userEmail: '',
        deptId: '',
        state: 0,
        mobile: '',
        job: '',
        role: 0,
        roleList: '',
        createId: 0,
        deptName: '',
        userImg: '',
    },
    currentMenu: '/dashboard',
    updateTheme: (isDark) => set({ isDark }),
    setCurrentMenu: (menu: string) => set({ currentMenu: menu }),
    updateUserInfo: (userInfo: IUser) => set({ userInfo }),
    updateCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));
