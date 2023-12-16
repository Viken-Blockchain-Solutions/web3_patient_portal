"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { groupBy, map } from "lodash";

export function Overview({ contributions }: {contributions: any[]}) {
  const groupedContributions = groupBy(contributions, (contribution: any) => contribution.submitted_at.slice(0, 7));
  const data = map(groupedContributions, (contributions: any[], month: any) => ({
    name: month,
    total: contributions.length
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}