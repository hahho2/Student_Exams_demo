'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ProgressChartProps {
  data: { name: string; score: number }[];
  mounted: boolean;
}

export default function ProgressChart({ data, mounted }: ProgressChartProps) {
  return (
    <div className="bg-card-bg border border-surface-border rounded-xl p-6 shadow-soft space-y-6">
      <div className="space-y-1">
        <h3 className="font-bold text-base">Growth and Performance Index</h3>
        <p className="text-xs text-secondary">Score progression chart across assessments</p>
      </div>

      <div className="w-full h-64 mt-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-border)" />
              <XAxis
                dataKey="name"
                stroke="var(--secondary)"
                fontSize={11}
                tickLine={false}
                tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
                axisLine={false}
              />
              <YAxis
                stroke="var(--secondary)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--surface-border)',
                  color: 'var(--foreground)',
                  fontSize: '12px',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--primary)"
                strokeWidth={3}
                activeDot={{ r: 6 }}
                dot={{ strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full bg-surface border border-surface-border rounded-lg animate-pulse" />
        )}
      </div>
    </div>
  );
}
