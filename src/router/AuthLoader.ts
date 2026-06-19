import api from '../api';
import { getMenuPath } from '../utils';
export default async function AuthLoader() {
    const data = await api.getPermissionList();
    const { menuList } = data;
    const menuPathList = getMenuPath(menuList);
    console.log(menuList, 'menuList');
    // [ '/dashboard', '/dashboard/analysis' ]
    return {
        menuList,
        menuPathList,
        buttonList: data.buttonList,
        // "buttonList": [
        //     "driverList@query",
        //     "cluster@query",
        //     "order@detail",
        //     "order@point",
        //     "order@route",
        //     "order@delete",
        //     "dept@query",
        //     "dept@create",
        //     "dept@edit",
        //     "dept@delete",
        //     "role@query",
        //     "role@edit",
        //     "role@setting",
        //     "role@delete",
        //     "menu@queyr",
        //     "menu@create",
        //     "menu@edit",
        //     "menu@delete",
        //     "user@query",
        //     "user@create",
        //     "user@edit",
        //     "user@delete",
        //     "home@query"
        // ]
    };
}

    // "code": 200,
    // "data": {
    //     "menuList": [
    //         {
    //             "_id": "655db45ff10762608048caec",
    //             "menuType": 1,
    //             "menuName": "Dashboard",
    //             "path": "/dashboard",
    //             "icon": "DesktopOutlined",
    //             "orderBy": 0,
    //             "menuState": 1,
    //             "parentId": "",
    //             "createId": 1000002,
    //             "createTime": "2023-06-22T07:50:59.931Z",
    //             "updateTime": "2024-07-22T08:27:07.828Z",
    //             "__v": 0,
    //             "children": [
    //                 {
    //                     "_id": "655db4a4f10762608048caf4",
    //                     "menuType": 2,
    //                     "menuName": "查看",
    //                     "menuCode": "home@query",
    //                     "orderBy": 0,
    //                     "menuState": 1,
    //                     "parentId": "655db45ff10762608048caec",
    //                     "createId": 1000002,
    //                     "createTime": "2024-07-22T08:27:07.828Z",
    //                     "updateTime": "2024-07-22T08:27:07.828Z",
    //                     "__v": 0
    //                 }
    //             ],
    //             "buttons": [
    //                 {
    //                     "_id": "655db4a4f10762608048caf4",
    //                     "menuType": 2,
    //                     "menuName": "查看",
    //                     "menuCode": "home@query",
    //                     "orderBy": 0,
    //                     "menuState": 1,
    //                     "parentId": "655db45ff10762608048caec",
    //                     "createId": 1000002,
    //                     "createTime": "2024-07-22T08:27:07.828Z",
    //                     "updateTime": "2024-07-22T08:27:07.828Z",
    //                     "__v": 0
    //                 }
    //             ]
    //         },
    //         {
    //             "_id": "655db520f10762608048cafa",
    //             "menuType": 1,
    //             "menuName": "用户模块",
    //             "path": "",
    //             "icon": "UsergroupAddOutlined",
    //             "orderBy": 1,
    //             "menuState": 1,
    //             "parentId": "",
    //             "createId": 1000002,
    //             "createTime": "2024-07-22T08:27:07.828Z",
    //             "updateTime": "2024-07-22T08:27:07.828Z",
    //             "__v": 0,
    //             "children": [
    //                 {
    //                     "_id": "655db546f10762608048cafe",
    //                     "menuType": 1,
    //                     "menuName": "用户列表",
    //                     "path": "/userList",
    //                     "icon": "UserOutlined",
    //                     "orderBy": 0,
    //                     "menuState": 1,
    //                     "parentId": "655db520f10762608048cafa",
    //                     "createId": 1000002,
    //                     "createTime": "2024-07-22T08:27:07.828Z",
    //                     "updateTime": "2024-07-22T08:27:07.828Z",
    //                     "__v": 0,
    //                     "children": [
    //                         {
    //                             "_id": "655db556f10762608048cb02",
    //                             "menuType": 2,
    //                             "menuName": "查看",
    //                             "menuCode": "user@query",
    //                             "orderBy": 0,
    //                             "menuState": 1,
    //                             "parentId": "655db546f10762608048cafe",
    //                             "createId": 1000002,
    //                             "createTime": "2024-07-22T08:27:07.828Z",
    //                             "updateTime": "2024-07-22T08:27:07.828Z",
    //                             "__v": 0
    //                         },
    //                         {
    //                             "_id": "655dc53ed4dc6d6fda15dbad",
    //                             "menuType": 2,
    //                             "menuName": "新增",
    //                             "menuCode": "user@create",
    //                             "orderBy": 1,
    //                             "menuState": 1,
    //                             "parentId": "655db546f10762608048cafe",
    //                             "createId": 1000002,
    //                             "createTime": "2024-07-22T08:27:07.828Z",
    //                             "updateTime": "2024-07-22T08:27:07.828Z",
    //                             "__v": 0
    //                         },
    //                         {
    //                             "_id": "655dc67ed4dc6d6fda15dbc7",
    //                             "menuType": 2,
    //                             "menuName": "编辑",
    //                             "menuCode": "user@edit",
    //                             "orderBy": 2,
    //                             "menuState": 1,
    //                             "parentId": "655db546f10762608048cafe",
    //                             "createId": 1000002,
    //                             "createTime": "2023-11-22T08:52:47.967Z",
    //                             "updateTime": "2023-11-22T08:52:47.967Z",
    //                             "__v": 0
    //                         },
    //                         {
    //                             "_id": "655dc68ad4dc6d6fda15dbcb",
    //                             "menuType": 2,
    //                             "menuName": "删除",
    //                             "menuCode": "user@delete",
    //                             "orderBy": 3,
    //                             "menuState": 1,
    //                             "parentId": "655db546f10762608048cafe",
    //                             "createId": 1000002,
    //                             "createTime": "2023-11-22T08:52:47.967Z",
    //                             "updateTime": "2023-11-22T08:52:47.967Z",
    //                             "__v": 0
    //                         }
    //                     ],
    //                     "buttons": [
    //                         {
    //                             "_id": "655db556f10762608048cb02",
    //                             "menuType": 2,
    //                             "menuName": "查看",
    //                             "menuCode": "user@query",
    //                             "orderBy": 0,
    //                             "menuState": 1,
    //                             "parentId": "655db546f10762608048cafe",
    //                             "createId": 1000002,
    //                             "createTime": "2023-11-22T07:50:59.931Z",
    //                             "updateTime": "2023-11-22T07:50:59.931Z",
    //                             "__v": 0
    //                         },
    //                         {
    //                             "_id": "655dc53ed4dc6d6fda15dbad",
    //                             "menuType": 2,
    //                             "menuName": "新增",
    //                             "menuCode": "user@create",
    //                             "orderBy": 1,
    //                             "menuState": 1,
    //                             "parentId": "655db546f10762608048cafe",
    //                             "createId": 1000002,
    //                             "createTime": "2023-11-22T08:52:47.967Z",
    //                             "updateTime": "2023-11-22T08:52:47.967Z",
    //                             "__v": 0
    //                         },
    //                         {
    //                             "_id": "655dc67ed4dc6d6fda15dbc7",
    //                             "menuType": 2,
    //                             "menuName": "编辑",
    //                             "menuCode": "user@edit",
    //                             "orderBy": 2,
    //                             "menuState": 1,
    //                             "parentId": "655db546f10762608048cafe",
    //                             "createId": 1000002,
    //                             "createTime": "2023-11-22T08:52:47.967Z",
    //                             "updateTime": "2023-11-22T08:52:47.967Z",
    //                             "__v": 0
    //                         },
    //                         {
    //                             "_id": "655dc68ad4dc6d6fda15dbcb",
    //                             "menuType": 2,
    //                             "menuName": "删除",
    //                             "menuCode": "user@delete",
    //                             "orderBy": 3,
    //                             "menuState": 1,
    //                             "parentId": "655db546f10762608048cafe",
    //                             "createId": 1000002,
    //                             "createTime": "2023-11-22T08:52:47.967Z",
    //                             "updateTime": "2023-11-22T08:52:47.967Z",
    //                             "__v": 0
    //                         }
    //                     ]
    //                 },
                