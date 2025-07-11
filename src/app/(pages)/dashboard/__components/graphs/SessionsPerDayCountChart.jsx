"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const sessionCountData = [
  { date: "2025-07-10", sessions: 3 },
  { date: "2025-07-11", sessions: 4 },
  { date: "2025-07-12", sessions: 2 },
];

const SessionsPerDayCountChart = () => {
  return (
    <Card className="w-full bg-gray-800 max-w-3xl mx-auto p-4">
      <CardHeader>
        <CardTitle className='text-white'>Sessions Per Day</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sessionCountData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sessions" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SessionsPerDayCountChart;
