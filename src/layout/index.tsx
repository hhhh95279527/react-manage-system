import { Layout, Watermark } from "antd";
import {
  Navigate,
  Outlet,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
const { Sider } = Layout;
import api from "../api/index";
import styles from "./index.module.less";
import NavHeader from "./header";
import Footer from "./footer";
import SiberMenu from "./menu";
import { useStore } from "../store";
import { router } from "../router";
import { searchRoute } from "../utils";
import { useEffect } from "react";
export default function LayoutCon() {
  const { collapsed, updateUserInfo } = useStore();
  const { pathname } = useLocation();
  useEffect(() => {
    getUserInfoData();
  }, []);
  const getUserInfoData = async () => {
    const data = await api.getUserInfo();
    updateUserInfo(data);
  };
  const data = useRouteLoaderData("layout");
  const staticPathList = ["/welcome", "/403", "/404"];

  const route = searchRoute(pathname, router);
  console.log(route, "-----");
  // pathname
  if (route && route.meta?.auth) {
    // 需要鉴权 处理自己的逻辑
  }
  if (
    !data.menuPathList.includes(pathname) &&
    !staticPathList.includes(pathname)
  ) {
    return <Navigate to="/403" />;
  }
  return (
    <Watermark content="React 19">
      {/* 第一个 Layout（外层）默认是横向 → 左右布局
第二个 Layout（内层）默认是纵向 → 上下布局 */}
      <Layout style={{ minHeight: "100vh" }}>
        {/* Ant Design 的 Layout 布局容器 style={{ minHeight: "100vh" }}
        ：让布局最小高度占满整个屏幕高度（vh=视口高度） 重点：Layout 组件默认是
        **flex 弹性布局**，所以不需要设置高度，直接使用即可。 */}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {/* 
          侧边栏 Sider 组件
          trigger={null}：隐藏自带的收缩/展开触发器（自定义触发）
          collapsible：允许侧边栏可以收缩/展开
          collapsed：接收状态，控制是否收缩
        */}
          <SiberMenu />
        </Sider>
        <Layout>
          <NavHeader />
          <div className={styles.content}>
            <div className={styles.wrapper} style={{ flex: 1 }}>
              <Outlet />
            </div>
            <Footer></Footer>
          </div>
        </Layout>
      </Layout>
    </Watermark>
  );
}
