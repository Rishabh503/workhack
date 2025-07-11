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

const sessionData = [
  { date: "2025-07-09", minutes: 20 },
  { date: "2025-07-10", minutes: 45 },
  { date: "2025-07-11", minutes: 30 },
  { date: "2025-07-12", minutes: 50 },
];

const DailyStudyTimeGraph = () => {
  return (
    <Card className="w-full bg-gray-800 max-w-4xl mx-auto p-4">
      <CardHeader>
        <CardTitle className='text-white'>Daily Study Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sessionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DailyStudyTimeGraph;
