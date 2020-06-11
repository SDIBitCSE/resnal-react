import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export interface SubjectBarProps {
  data: any;
}

const SubjectBar: React.SFC<SubjectBarProps> = ({ data }) => {
  let subjectWize = data.subjectWizeResult.filter(
    (value: any) => value.marks.length === 1
  );
  var cfcd = 0,
    cFC = 0,
    cSC = 0,
    cP = 0,
    cF = 0;
  subjectWize.map((student: any) => {
    switch (student.marks[0].fcd) {
      case "FCD":
        cfcd++;
        break;
      case "FC":
        cFC++;
        break;
      case "SC":
        cSC++;
        break;
      case "P":
        cP++;
        break;
      case "F":
        cF++;
        break;
    }
    return 0;
  });
  let chartData = [
    { name: "FCD", count: cfcd },
    { name: "FC", count: cFC },
    { name: "SC", count: cSC },
    { name: "P", count: cP },
    { name: "F", count: cF },
  ];
  return (
    <div style={{ position: "relative", left: "-50px", top: "50px" }}>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="teal" />
      </BarChart>
    </div>
  );
};

export default SubjectBar;
