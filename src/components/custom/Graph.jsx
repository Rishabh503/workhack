"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', progress: 20 },
  { day: 'Tue', progress: 40 },
  { day: 'Wed', progress: 65 },
  { day: 'Thu', progress: 80 },
  { day: 'Fri', progress: 100 },
]

const Graph = () => {
  return (
    <section className="bg-[#1e293b] mt-4 rounded-md text-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side: Text */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">Track Your Progress with Ease</h2>
          <p className="text-gray-300">
            Our intelligent dashboard helps you visualize daily achievements, identify study patterns, and stay on top of your academic goals.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Daily session logging and streaks</li>
            <li>Visual performance graphs</li>
            <li>Goal completion indicators</li>
          </ul>
        </div>

        {/* Right Side: Sample Graph */}
        <div className="md:w-1/2 bg-[#0f172a] p-6 rounded-xl shadow-md w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default Graph;
