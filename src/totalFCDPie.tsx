import React from "react";
import { PieChart, Pie, Sector, Cell, Tooltip, Legend } from "recharts";

export interface TotalFCDPieProps {
  data: any;
}
const COLORS = ["green", "red"];

const TotalFCDPie: React.SFC<TotalFCDPieProps> = ({ data }) => {
  var cF = 0,
    cP = 0;
  data.batchResult.map((student: any) => {
    if (student.totalFCD === "F") cF++;
    else cP++;
  });
  var data01 = [
    { name: "Pass", value: cP },
    { name: "Fail", value: cF },
  ];

  return (
    <PieChart width={800} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data01}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data01.map((entry: any, index: any) => (
          <Cell fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TotalFCDPie;
