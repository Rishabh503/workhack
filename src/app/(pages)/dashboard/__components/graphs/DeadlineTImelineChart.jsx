"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
  { date: "2025-07-09", count: 1 },
  { date: "2025-07-11", count: 2 },
  { date: "2025-07-15", count: 2 },
  { date: "2025-07-16", count: 3 },
];

const DeadlineTimelineChart = () => {
  return (
    <Card className="w-full bg-gray-800 max-w-3xl mx-auto p-4">
      <CardHeader>
        <CardTitle className='text-white'>Goal Deadlines Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DeadlineTimelineChart;
