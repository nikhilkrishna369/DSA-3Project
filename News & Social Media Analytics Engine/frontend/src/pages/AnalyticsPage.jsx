import React from 'react'
import { Download, PieChart, BarChart3, Activity, Users } from 'lucide-react'
import StatCard from '../components/ui/StatCard'

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Comprehensive metrics and visualizations of processed data</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Year</option>
          </select>
          <button 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            onClick={() => alert('Analytics report downloaded!')}
          >
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Processed Articles" value="12,483" trend="up" color="blue" />
        <StatCard title="Social Engagement Events" value="1.2M" trend="up" color="violet" />
        <StatCard title="Avg Processing Time" value="4.2ms" trend="down" color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 lg:col-span-2">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Activity className="text-blue-500"/> News Volume Over Time</h3>
          <div className="h-64 flex items-end justify-between gap-2 border-l border-b border-slate-700 pb-2 px-2">
            {[45, 60, 35, 80, 55, 90, 75].map((val, i) => (
              <div key={i} className="w-full flex justify-center group relative">
                <div 
                  className="w-full max-w-[40px] bg-blue-500/80 hover:bg-blue-400 rounded-t-sm transition-all"
                  style={{ height: `${val}%` }}
                ></div>
                <div className="absolute -bottom-6 text-xs text-slate-400">Day {i+1}</div>
                <div className="absolute -top-8 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {val * 12} articles
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><PieChart className="text-violet-500"/> News by Category</h3>
          <div className="space-y-4">
            {[{name: 'Technology', val: 45, col: 'bg-blue-500'}, {name: 'Politics', val: 25, col: 'bg-rose-500'}, {name: 'Business', val: 15, col: 'bg-emerald-500'}, {name: 'Science', val: 10, col: 'bg-violet-500'}, {name: 'Sports', val: 5, col: 'bg-amber-500'}].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span className="font-bold">{item.val}%</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.col}`} style={{ width: `${item.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Users className="text-emerald-500"/> Engagement by Platform</h3>
          <div className="flex items-end justify-between h-48 border-b border-slate-700 pb-2 pt-4 px-4">
            {[{name: 'Twitter/X', h: '85%'}, {name: 'Reddit', h: '60%'}, {name: 'LinkedIn', h: '45%'}, {name: 'Facebook', h: '30%'}].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-1/4 group relative">
                <div className="w-12 bg-emerald-500/80 hover:bg-emerald-400 rounded-t-sm transition-all" style={{ height: item.h }}></div>
                <div className="text-xs text-slate-400">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mt-6">
        <h3 className="text-lg font-bold mb-4">Duplicate Content Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
            <div className="text-3xl font-bold text-white">12,483</div>
            <div className="text-xs text-slate-400">Total Articles</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
            <div className="text-3xl font-bold text-red-400">1,124</div>
            <div className="text-xs text-slate-400">Duplicates Filtered</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
            <div className="text-3xl font-bold text-amber-400">9.0%</div>
            <div className="text-xs text-slate-400">Duplicate Rate</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
            <div className="text-3xl font-bold text-emerald-400">0.2ms</div>
            <div className="text-xs text-slate-400">Avg Hash Time</div>
          </div>
        </div>
        
        <h4 className="text-sm font-bold text-slate-300 mb-3">Recent Detection Timeline</h4>
        <div className="space-y-2 relative before:absolute before:inset-0 before:ml-[9px] before:h-full before:w-0.5 before:bg-slate-700">
          {[
            {time: '2 mins ago', msg: 'Intercepted exact duplicate of "GPT-5 Announcement" from source B'},
            {time: '14 mins ago', msg: 'Flagged near-duplicate (92% similarity) in Politics category'},
            {time: '1 hour ago', msg: 'Resolved hash collision in bucket 142 using chaining'},
            {time: '2 hours ago', msg: 'Rehashing triggered: Hash table capacity doubled to 4096'}
          ].map((log, i) => (
            <div key={i} className="relative flex items-center pl-8 text-sm group">
              <div className="absolute left-0 w-5 h-5 rounded-full border-2 border-slate-800 bg-blue-500 z-10"></div>
              <div className="flex gap-4 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 w-full group-hover:border-slate-500 transition-colors">
                <span className="text-xs text-slate-500 whitespace-nowrap min-w-[80px]">{log.time}</span>
                <span className="text-slate-300">{log.msg}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
