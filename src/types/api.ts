export interface ResultData<T> {
    list: T[];
    page: {
        total: number | 0;
        pageNum: number;
        pageSzie: number;
    };
}

// 登录模块
export interface ILoginParams {
    username: string;
    userPwd: string;
}

// 部门模块
export interface IDeptSearchParams {
    deptName?: string;
}
export interface IDept {
    _id: string;
    createTime: string;
    updateTime: string;
    deptName: string;
    parentId: string;
    userName: string;
    children: IDept[];
}

// 用户模块
export interface IUser {
    _id: string;
    userId: number;
    userName: string;
    userEmail: string;
    deptId: string;
    state: number;
    mobile: string;
    job: string;
    role: number;
    roleList: string;
    createId: number;
    deptName: string;
    userImg: string;
}

// 菜单模块

// 创建菜单参数
export interface ICreateMenuParams {
    menuName: string; // 菜单名称
    icon?: string; // 菜单图标
    path: string; // 菜单路径
    menuType: number; // 菜单类型 1:菜单 2:按钮 3:页面
    menuCode: string; // 菜单权限标示
    parentId: string; // 父级菜单id
    component: string; // 组件名称
    menuState: number; // 菜单状态 1:启用 2:禁用
}
// 更新菜单参数
export interface IUpdateMenuParams extends ICreateMenuParams {
    _id: string;
}
// 菜单list
export interface IMenu extends ICreateMenuParams {
    _id: string;
    createTime: string;
    buttons?: IMenu[];
    children?: IMenu[];
}

// 搜索参数
export interface ISearchParams {
    menuName: string;
    menuState: number;
}

export interface IPageParams {
    pageNum: number;
    pageSize?: number;
}

// 角色模块
export interface IRole {
    _id: string;
    roleName: string;
    remark: string;
    permissionList: {
        checkedKeys: string[];
        halfCheckedKeys: string[];
    };
    createTime: string;
    updateTime: string;
}
export interface IRoleSearchParams extends IPageParams {
    roleName?: string;
}
export interface IRoleCreateParams {
    roleName: string;
    remark: string;
}

export interface IRoleEditParams extends IRoleCreateParams {
    _id: string;
}
export interface IPermission {
    _id: string;
    permissionList: {
        checkedKeys: string[];
        halfCheckedKeys: string[];
    };
}

// 用户模块

// 用户搜索参数
export interface IUserSearchParams extends IPageParams {
    userId?: number;
    userName?: string;
    state?: number;
}
// 用户列表
export interface IUser {
    _id: string;
    userId: number;
    userName: string;
    userEmail: string;
    deptId: string;
    state: number;
    mobile: string;
    job: string;
    role: number;
    roleList: string;
    createId: number;
    deptName: string;
    userImg: string;
}
// 创建用户参数
export interface ICreateUserParams {
    userName: string;
    userEmail: string;
    mobile?: number;
    deptId: string;
    job?: string;
    state?: number;
    roleList: string[];
    userImg: string;
}
// 更新用户参数
export interface IUpdateUserParams extends ICreateUserParams {
    userId: string;
}


// dashboard 模块

export interface IReportData {
    codeLine: number;
    salary: number;
    icafeCount: number;
    projectNum: number;
}

export interface ILineData {
    label: string[];
    order: number[];
    money: number[];
}
export interface IPieData {
    value: number;
    name: string;
}
export interface IRadarData {
    indicator: Array<{ name: string; max: number }>;
    data: {
        value: number[];
        name: string;
    }
}

