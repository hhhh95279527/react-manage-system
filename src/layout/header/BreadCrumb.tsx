import { useLocation, useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect, ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { findTreeNode } from '../../utils';
export default function BreadCrumb() {
    const { pathname } = useLocation();
    const [breadList, setBreadList] = useState<(string | ReactNode)[]>([]);
    const data = useRouteLoaderData('layout');
    useEffect(() => {
        const list = findTreeNode(data.menuList, pathname, []);
        setBreadList([<a href="/welcome">首页</a>, ...list]);
    }, [pathname]);
    return <Breadcrumb items={breadList.map((item) => ({ title: item }))} />;
}
