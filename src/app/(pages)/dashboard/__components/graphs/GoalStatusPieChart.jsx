"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { status: "COMPLETED", count: 3 },
  { status: "PENDING", count: 2 },
  { status: "HALF DONE", count: 1 },
  { status: "PARTIAL DONE", count: 1 },
  { status: "ALMOST DONE", count: 2 },
];

const COLORS = {
  "COMPLETED": "#22c55e",
  "PENDING": "#facc15",
  "HALF DONE": "#60a5fa",
  "PARTIAL DONE": "#f97316",
  "ALMOST DONE": "#8b5cf6",
};

const GoalStatusPieChart = () => {
  return (
    <Card className="w-full bg-gray-800 max-w-2xl mx-auto p-4">
      <CardHeader>
        <CardTitle className='text-white'>Goal Completion Status</CardTitle>
      </CardHeader>
      <CardContent>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="count"
            nameKey="status"
            label={({ status }) => status}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[entry.status]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default GoalStatusPieChart;
