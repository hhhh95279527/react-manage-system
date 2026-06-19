import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { lazyLoad } from "./LazyLoad";
import NotFound from "../views/NotFound";
import NotFound403 from "../views/403";
import Login from "../views/login";
import Layout from "../layout";
import AuthLoader from "./AuthLoader";

export const router = [
  {
    //   方便识别和管理该条路由，方便做权限和菜单匹配
    id: "layout",
    element: <Layout />,
    // React Router 官方功能：页面加载前执行的函数
    // 作用：权限验证！
    // 进入页面之前先运行 AuthLoader
    // 验证：有没有登录？有没有权限？
    // 没权限 → 跳转到 403 或登录页
    // 进入页面之后，再运行子路由的 loader
    // 进入Layout 之前，先执行 AuthLoader
    loader: AuthLoader,
    // 访问子路由会先匹配到父路由，然后再匹配子路由
    children: [
      {
        path: "/welcome",
        element: lazyLoad(lazy(() => import("../views/welcome"))),
      },
      {
        path: "/dashboard",
        element: lazyLoad(lazy(() => import("../views/dashboard"))),
      },
      {
        path: "/userList",
        element: lazyLoad(lazy(() => import("../views/user"))),
        meta: {
          auth: true,
        },
      },
      {
        path: "/deptList",
        element: lazyLoad(lazy(() => import("../views/dept"))),
        // 自定义元信息 → 放权限、标题、菜单配置等
        // auth: true → 需要登录才能访问
        // requireAuth: true → 需要更高权限
        // 这些字段自己定义，给权限判断用
        // 大白话：给页面贴标签，用来控制权限。
        // 自定义元信息 → 放权限、标题、菜单配置等，在AuthLoader中通过path=new URL(requst.url).pathname获取到当前路由的path，然后通过path(c=searchRoute(path, router),c.meta)去匹配meta中的auth和requireAuth字段来判断是否有权限访问该页面。
        meta: {
          requireAuth: true,
          auth: true,
        },
      },
      {
        path: "/menuList",
        element: lazyLoad(lazy(() => import("../views/menu"))),
      },
      {
        path: "/roleList",
        element: lazyLoad(lazy(() => import("../views/role"))),
      },
    ],
  },
  { path: "/", element: <Navigate to="/welcome" /> },
  { path: "/login", element: <Login /> },
  { path: "/403", element: <NotFound403 /> },
  { path: "*", element: <NotFound /> },
];
export default createBrowserRouter(router);
