import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
export interface StudentLineProps {
  raw_data: any;
}

const StudentLine: React.SFC<StudentLineProps> = ({ raw_data }) => {
  let data: Array<{ name: string; gpa: number }> = [];
  raw_data.student.map((student: any) =>
    data.push({ name: `Semester ${student.sem}`, gpa: student.gpa })
  );
  return (
    <LineChart
      width={450}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="gpa" stroke="red" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default StudentLine;
