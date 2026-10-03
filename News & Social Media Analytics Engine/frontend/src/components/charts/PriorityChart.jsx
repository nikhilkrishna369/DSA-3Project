import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function PriorityChart({ data, height = 250 }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 p-2 px-3 rounded-lg shadow-xl flex items-center gap-2">
          <span className="text-slate-300 font-medium">{label}:</span>
          <span className="text-slate-100 font-bold">{payload[0].value}</span>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (name) => {
    if (name === 'High') return '#ef4444'; // red-500
    if (name === 'Medium') return '#f59e0b'; // amber-500
    if (name === 'Low') return '#64748b'; // slate-500
    return '#3b82f6';
  };

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          layout="vertical" 
          data={data} 
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#334155', opacity: 0.4 }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.name)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
