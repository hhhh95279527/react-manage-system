import { IRoleSearchParams, IPermission, IRoleCreateParams, IRoleEditParams, IRole, ResultData } from '../types/api';
import request from '../utils/request';

export default {
    // 获取角色列表
    getRoleList(params: IRoleSearchParams) {
        return request.get<ResultData<IRole>>('/roles/list', params);
    },
    // 删除角色
    deleteRole(params: { _id: string }) {
        return request.post('/roles/delete', params);
    },
    // 更新权限
    updatePermission(params: IPermission) {
        return request.post('/roles/update/permission', params);
    },
    // 创建角色
    createRole(params: IRoleCreateParams) {
        return request.post('/roles/create', params);
    },
    // 更新角色
    updateRole(params: IRoleEditParams) {
        return request.post('/roles/edit', params);
    },
    // 获取所有角色列表
    getAllRoleList() {
        return request.get<IRole[]>('/roles/allList');
    },
};
