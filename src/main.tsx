// 从 react-dom/client 模块导入 createRoot 方法
// createRoot: React 18 提供的新 API，用于创建根节点并启用并发特性
import { createRoot } from "react-dom/client";

// 导入主题样式文件（Less 预处理器格式）
import "./styles/theme.less";

// 导入全局 CSS 样式文件
import "./index.css";

// 导入应用的根组件 App
// App: React 函数组件，类型为 React.FC 或 () => JSX.Element
import App from "./App";

// import './components/Message/index.tsx';

/**
 * createRoot(container, options?) - 创建 React 根节点
 *
 * 参数说明：
 *- HTMLElement | Document | DocumentFragment | null
 *   必须是有效的 DOM 元素，作为 React 应用的挂载点
 *   这里使用 document.getElementById("root") 获取
 *
 *- 可选配置对象
 *   - identifierPrefix?: string - 用于 React 内部 useId 生成的前缀
 *   - onRecoverableError?: (error: Error) => void - 可恢复错误的回调函数
 *
 * 返回值：Root 对象，包含 render 和 unmount 方法
 *
 * document.getElementById(elementId: string): HTMLElement | null
 *   参数：elementId - string 类型，要获取元素的 id 属性值
 *   返回值：HTMLElement 或 null（未找到时）
 *
 * ! 非空断言操作符 (TypeScript)
 *   告诉 TypeScript 编译器该值一定不为 null 或 undefined
 *   这里断言 document.getElementById("root") 一定返回 HTMLElement
 */
createRoot(document.getElementById("root")!).render(<App />);

// Root.render(element) - 将 React 元素渲染到根节点
//
// 参数说明：
// @param element - React.ReactElement | null
//   要渲染的 React 元素（JSX 表达式）
//   这里传入 <App />，即 App 组件的 JSX 元素
//   类型为 ReactElementElement<AppProps, typeof App>

// history hash
