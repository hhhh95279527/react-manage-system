import { Descriptions, Card, Button } from 'antd';
import { useRef, useState, useEffect } from 'react';
import api from '../../api';
import styles from './index.module.less';
import { IReportData } from '../../types/api';
import { useStore } from '../../store';
import { formateState } from '../../utils';
import { useCharts } from '../../hooks/useCharts';
export default function Dashboard() {
    const userInfo = useStore((state) => state.userInfo);

    const [lineRef, lineChart] = useCharts();
    const [pieRef1, pieChart1] = useCharts();
    const [pieRef2, pieChart2] = useCharts();
    const [radarRef, radarEchart] = useCharts();
    const [report, setReport] = useState<IReportData>();
    useEffect(() => {
        getReportData();
    }, []);
    useEffect(() => {
        renderLineChart();
        getPieChart1();
        getPieChart2();
        getRadarData();
    }, [lineChart, pieChart1, pieChart2, radarEchart]);
    // 获取数据统计
    const getReportData = async () => {
        const data = await api.getReportData();
        setReport(data);
    };
    // 获取折线图
    const getLineChart = async () => {
        const data = await api.getLineData();
        if (lineChart) {
            lineChart.setOption({
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['收入', '支出'],
                },
                grid: {
                    left: 50,
                    right: 50,
                    bottom: 20,
                },
                xAxis: {
                    data: data.label,
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '订单',
                        data: data.order,
                        type: 'line',
                    },
                    {
                        name: '流水',
                        data: data.money,
                        type: 'line',
                    },
                ],
            });
        }
    };
    // 获取饼图
    const getPieChart1 = async () => {
        const data = await api.getPieCityData();
        if (pieChart1) {
            pieChart1?.setOption({
                title: {
                    text: '前端top分布',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '城市分布',
                        type: 'pie',
                        radius: '50%',
                        data,
                    },
                ],
            });
        }
    };
    const getPieChart2 = async () => {
        const data = await api.getPieAgeData();
        pieChart2?.setOption({
            title: {
                text: '后端top分布',
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '年龄分布',
                    type: 'pie',
                    radius: [50, 180],
                    roseType: 'area',
                    data,
                },
            ],
        });
    };
    // 获取雷达图
    const getRadarData = async () => {
        const data = await api.getRadarData();
        radarEchart?.setOption({
            legend: {
                data: ['程序员技术分析模型'],
            },
            radar: {
                indicator: data.indicator,
            },
            series: [
                {
                    name: '模型诊断',
                    type: 'radar',
                    data: data.data,
                },
            ],
        });
    };
    // 按钮的刷新
    const renderLineChart = () => {
        getLineChart();
    };

    const renderPieChart = () => {
        getPieChart1();
        getPieChart2();
    };
    const renderRadarChart = () => {
        renderLineChart();
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.userInfo}>
                <img src={userInfo.userImg} className={styles.userImg} />
                <Descriptions title="用户信息">
                    <Descriptions.Item label="用户ID">{userInfo.userId}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{userInfo.userEmail}</Descriptions.Item>
                    <Descriptions.Item label="状态">{formateState(userInfo.state)}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{userInfo.mobile}</Descriptions.Item>
                    <Descriptions.Item label="岗位">{userInfo.job}</Descriptions.Item>
                    <Descriptions.Item label="部门">{userInfo.deptName}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className={styles.report}>
                <div className={styles.card}>
                    <div className={styles.title}>提交代码行数</div>
                    <div className={styles.content}>{report?.codeLine}行</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>工资</div>
                    <div className={styles.content}>{report?.salary}元</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>完成需求</div>
                    <div className={styles.content}>{report?.icafeCount}卡片</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>项目数量</div>
                    <div className={styles.content}>{report?.projectNum}个</div>
                </div>
            </div>
            <div className={styles.chart}>
                <Card
                    title="消费流水"
                    extra={
                        <Button type="primary" onClick={renderLineChart}>
                            刷新
                        </Button>
                    }
                >
                    <div ref={lineRef} className={styles.lineChart}></div>
                </Card>
            </div>
            <div className={styles.chart}>
                <Card
                    title="程序员top6"
                    extra={
                        <Button type="primary" onClick={renderPieChart}>
                            刷新
                        </Button>
                    }
                >
                    <div className={styles.pieChart}>
                        <div ref={pieRef1} className={styles.pieItem}></div>
                        <div ref={pieRef2} className={styles.pieItem}></div>
                    </div>
                </Card>
            </div>
            <div className={styles.chart}>
                <Card
                    title="技能雷达图"
                    extra={
                        <Button type="primary" onClick={renderRadarChart}>
                            刷新
                        </Button>
                    }
                >
                    <div ref={radarRef} className={styles.radarChart}></div>
                </Card>
            </div>
        </div>
    );
}
