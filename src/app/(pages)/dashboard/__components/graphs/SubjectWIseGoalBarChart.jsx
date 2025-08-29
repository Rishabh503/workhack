"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";

const data = [
  { subject: "Maths", COMPLETED: 1, "HALF DONE": 2, "ALMOST DONE": 2 },
  { subject: "Physics", COMPLETED: 2, PENDING: 1, "PARTIAL DONE": 1, "ALMOST DONE": 1 },
  { subject: "DSA", pending: 1 },
];

const COLORS = {
  COMPLETED: "#22c55e",
  PENDING: "#facc15",
  "HALF DONE": "#60a5fa",
  "PARTIAL DONE": "#f97316",
  "ALMOST DONE": "#8b5cf6",
  pending: "#f43f5e",
};

const SubjectWiseGoalBarChart = () => {
    const {user}=useUser();
console.log("me user h",user)
  return (
    <Card className="w-full bg-gray-800 max-w-5xl mx-auto p-4">
      <CardHeader>
        <CardTitle className='text-white'>Subject-wise Goal Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            {Object.keys(COLORS).map((status) => (
              <Bar
                key={status}
                dataKey={status}
                stackId="a"
                fill={COLORS[status]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SubjectWiseGoalBarChart;
