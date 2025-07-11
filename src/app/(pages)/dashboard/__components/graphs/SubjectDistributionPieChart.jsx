"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const subjectData = [
  { subject: "Maths", count: 4 },
  { subject: "Physics", count: 4 },
  { subject: "DSA", count: 1 },
];

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

const SubjectDistributionPieChart = () => {
  return (
    <Card className="w-full bg-gray-800 max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle className='text-white'>Subject Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={subjectData}
              dataKey="count"
              nameKey="subject"
              outerRadius={100}
              innerRadius={50}
              label
            >
              {subjectData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SubjectDistributionPieChart;
