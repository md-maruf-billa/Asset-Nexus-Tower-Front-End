import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../Utils/Hooks/useAxiosSecure';
import useCurrentUser from '../../../Utils/Hooks/userCurrentUser';
import { useQuery } from '@tanstack/react-query';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];


const PieCharts = () => {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useCurrentUser();
    const { data } = useQuery({
        queryKey: ["load data for chart"],
        queryFn: async () => {
            const result = await axiosSecure(`/all-asset-length/${currentUser?.email}`);
            return result.data;
        }
    })

    const returnAbleData = data?.filter(element => element.productType == "Returnable")
    const nonReturnAbleData = data?.filter(element => element.productType == "Non Returnable")
    const data01 = [
        { name: "Returnable", value: returnAbleData?.length , percentage : (returnAbleData?.length / data?.length) * 100},
        { name: "Non Returnable", value: nonReturnAbleData?.length, percentage : (nonReturnAbleData?.length / data?.length) * 100 }
    ]
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, data01) => {
        setActiveIndex(data01);
    };

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percentage, name, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';


        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${name} ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Percentage ${percentage}%)`}
                </text>
            </g>
        );
    };


    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>



    );
};

export default PieCharts;
