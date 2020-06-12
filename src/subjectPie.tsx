import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export interface SubjectPieProps {
  data: any;
}
const COLORS = ["green", "red"];

const SubjectPie: React.SFC<SubjectPieProps> = ({ data }) => {
  let subjectWize = data.subjectWizeResult.filter(
    (value: any) => value.marks.length === 1
  );
  var cF = 0,
    cP = 0;
  subjectWize.map((student: any) => {
    if (student.marks[0].fcd === "F") cF++;
    else cP++;
    return 0;
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
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SubjectPie;
