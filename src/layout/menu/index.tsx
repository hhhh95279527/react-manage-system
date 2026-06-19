import { Menu } from "antd";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import { useStore } from "../../store";
import styles from "./index.module.less";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { IMenu } from "../../types/api";

type MenuItem = Required<MenuProps>["items"][number];

// const items: MenuItem[] = [
//     { key: '/dashboard', icon: <HomeOutlined />, label: 'Dashboard' },
//     {
//         key: '/user',
//         label: '用户模块',
//         icon: <UsergroupDeleteOutlined />,
//         children: [
//             { key: '/userList', label: '用户列表', icon: <UserOutlined /> },
//             { key: '/menuList', label: '菜单管理', icon: <MailOutlined /> },
//             { key: '/roleList', label: '角色管理', icon: <SolutionOutlined /> },
//             { key: '/deptList', label: '部门管理', icon: <LaptopOutlined /> },
//         ],
//     },
// ];

const SiberMenu = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [menuList, setMenuList] = useState<MenuItem[]>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collapsed, isDark } = useStore();
  const data = useRouteLoaderData("layout");
  const menuClick = ({ key }: { key: string }) => {
    navigate(key);
    setSelectedKeys([key]);
  };

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem;
  }
  function createIcon(name?: string) {
    if (!name) return <></>;
    const customerIcons: { [key: string]: any } = Icons;
    const icon = customerIcons[name];
    if (!icon) return <></>;
    return React.createElement(icon);
  }

  const getTreeMenu = (menuList: IMenu[], treeList: MenuItem[] = []) => {
    menuList.forEach((item) => {
      console.log("item", item);
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) {
          return treeList.push(
            getItem(item.menuName, item.path, createIcon(item.icon)),
          );
        }
        treeList.push(
          getItem(
            item.menuName,
            item.path,
            createIcon(item.icon),
            getTreeMenu(item.children || []),
          ),
        );
      }
    });
    return treeList;
  };

  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList);
    setMenuList(treeMenuList);
    setSelectedKeys([pathname]);
    // setMenuList():
  }, []);
  return (
    <div className={styles.navHeader}>
      <div className={styles.logo}>
        <img src="/imgs/logo.png" className={styles.logo} alt="" />
        {collapsed ? "" : <span>企业中台</span>}
      </div>
      <Menu
        mode="inline" /* 模式：内联（纵向、可展开） */
        theme={isDark ? "light" : "dark"} /* 主题：light / dark */
        onClick={menuClick} /* 点击菜单触发：跳转+高亮 */
        inlineCollapsed={collapsed} /* 控制菜单是否折叠（图标/文字） */
        selectedKeys={selectedKeys} /* 当前选中高亮的菜单项 */
        items={menuList} /* 要渲染的树形菜单数据 */
      />
    </div>
  );
};

export default SiberMenu;
