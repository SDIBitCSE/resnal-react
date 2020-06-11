import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export interface TotalFCDBarProps {
  data: any;
}

const TotalFCDBar: React.SFC<TotalFCDBarProps> = ({ data }) => {
  var cfcd = 0,
    cFC = 0,
    cSC = 0,
    cP = 0,
    cF = 0;
  data.batchResult.map((student: any) => {
    switch (student.totalFCD) {
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

export default TotalFCDBar;
