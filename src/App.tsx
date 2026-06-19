import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import router from "./router";
import { useStore } from "./store";
// 定义 App 函数组件
// 返回值类型: JSX.Element - React 组件返回的 JSX 元素
function App() {
  // useStore: 自定义 Hook，用于访问全局状态管理（Zustand/Redux 等）
  // 参数: (state) => state.isDark - 选择器函数，从全局状态中提取 isDark 属性
  // 参数类型: (state: StoreState) => boolean
  // 返回值: boolean - 当前是否为暗黑模式
  const isDark = useStore((state) => state.isDark);

  // 返回 JSX 元素，作为组件的渲染输出
  return (
    // ConfigProvider: Ant Design 的配置提供者组件
    // 作用: 为子组件提供全局主题配置
    // 属性 theme: 主题配置对象
    <ConfigProvider
      theme={{
        // token: 主题令牌，定义设计系统的颜色、字体等基础变量
        // colorPrimary: 主题主色，类型为 string（CSS 颜色值）
        token: {
          colorPrimary: "#123456",
        },
        // algorithm: 主题算法，用于计算派生颜色
        // 类型: (token: SeedToken) => MapToken
        // theme.darkAlgorithm: 暗黑模式算法
        // theme.defaultAlgorithm: 默认（亮色）模式算法
        // 根据 isDark 的值动态切换算法
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {/* RouterProvider: React Router v6 的路由提供者组件 */}
      {/* 属性 router: Router 实例，类型为 RemixRouter */}
      {/* 作用: 为子组件提供路由上下文 */}
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
export default App;
