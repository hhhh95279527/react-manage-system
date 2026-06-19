import stytles from './index.module.less';
export default function Welcome() {
    return (
        <div className={stytles.welcome}>
            <div className={stytles.welcome}>
                <div className={stytles.subTitle}>欢迎使用</div>
                <div className={stytles.title}>React-admin/18/19企业中台通用管理系统</div>
                <div className={stytles.desc}>React19、Zustand 、Antd、TypeScript</div>
            </div>
            <div className={stytles.img}></div>
        </div>
    );
}
