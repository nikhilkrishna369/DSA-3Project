import React, { useState } from 'react'
import { AlertCircle, Check, Flag, Eye, Clock, ShieldAlert } from 'lucide-react'
import { moderationQueue } from '../data/moderationData'
import StatCard from '../components/ui/StatCard'

export default function ModerationPage() {
  const [queue, setQueue] = useState(moderationQueue || [])
  const [filter, setFilter] = useState('All')
  const [toast, setToast] = useState(null)
  
  const showToast = (msg, type) => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAction = (id, action) => {
    setQueue(queue.map(item => {
      if (item.id === id) {
        return { ...item, status: action === 'approve' ? 'Approved' : 'Flagged' }
      }
      return item
    }))
    showToast(
      action === 'approve' ? 'Post successfully approved.' : 'Post has been flagged and hidden.',
      action === 'approve' ? 'emerald' : 'red'
    )
  }

  const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 }
  const sortedQueue = [...queue].sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority])
  
  const filteredQueue = filter === 'All' ? sortedQueue : sortedQueue.filter(q => q.status === filter)

  return (
    <div className="p-6 space-y-6 text-slate-100">
      {toast && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white font-medium z-50 flex items-center gap-2 transition-all ${toast.type === 'emerald' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          {toast.type === 'emerald' ? <Check size={18} /> : <AlertCircle size={18} />}
          {toast.msg}
        </div>
      )}
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Content Moderation</h1>
        <p className="text-slate-400 mb-6">Priority-based queue manages high-importance content review</p>
        
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <ShieldAlert className="text-blue-500 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-300">
              Priority Queue ensures highest-risk content reaches moderators first, with O(log n) insertion and O(1) access to the critical post. Data is maintained in a binary max-heap structured by priority score.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Pending Review" value={queue.filter(q=>q.status==='Pending').length} color="amber" />
        <StatCard title="Flagged Content" value={queue.filter(q=>q.status==='Flagged').length} color="red" />
        <StatCard title="Approved Today" value={queue.filter(q=>q.status==='Approved').length} color="emerald" />
        <StatCard title="Total in Queue" value={queue.length} color="blue" />
      </div>

      <div className="flex gap-2 border-b border-slate-700 pb-2">
        {['All', 'Pending', 'Reviewed', 'Approved', 'Flagged'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === f ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Content Snippet</th>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredQueue.map((item, i) => (
                <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-4 font-mono text-xs text-slate-500">{item.id}</td>
                  <td className="px-4 py-4 max-w-xs">
                    <div className="truncate font-medium">{item.content}</div>
                    <div className="text-xs text-slate-400 mt-1">by @{item.author}</div>
                  </td>
                  <td className="px-4 py-4">{item.platform}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded font-bold ${item.priority === 'High' ? 'bg-red-500/20 text-red-400' : item.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-300'}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-slate-900 border border-slate-600 px-2 py-1 rounded text-slate-300">
                      {item.reason}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded flex w-fit items-center gap-1 ${
                      item.status === 'Pending' ? 'text-amber-400' : 
                      item.status === 'Approved' ? 'text-emerald-400' : 
                      item.status === 'Flagged' ? 'text-red-400' : 'text-blue-400'
                    }`}>
                      {item.status === 'Pending' && <Clock size={12}/>}
                      {item.status === 'Approved' && <Check size={12}/>}
                      {item.status === 'Flagged' && <Flag size={12}/>}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {item.status === 'Pending' && (
                        <>
                          <button onClick={() => handleAction(item.id, 'approve')} className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded hover:bg-emerald-500/20" title="Approve">
                            <Check size={16} />
                          </button>
                          <button onClick={() => handleAction(item.id, 'flag')} className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20" title="Flag">
                            <Flag size={16} />
                          </button>
                        </>
                      )}
                      <button className="p-1.5 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20" title="Review Context">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredQueue.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-slate-500">No items match the current filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-bold mb-6">Priority Queue Heap Visualization</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-red-500/20 border border-red-500/30 p-3 rounded-lg text-center min-w-[200px]">
            <div className="text-xs text-red-400 font-bold mb-1">Root (High Priority)</div>
            <div className="text-sm truncate">Misinformation detected...</div>
          </div>
          <div className="flex gap-8 relative before:absolute before:top-[-16px] before:left-1/2 before:w-[calc(100%-80px)] before:-translate-x-1/2 before:h-4 before:border-t before:border-x before:border-slate-600 before:rounded-t-lg">
            <div className="bg-amber-500/20 border border-amber-500/30 p-3 rounded-lg text-center w-[180px] mt-4">
              <div className="text-xs text-amber-400 font-bold mb-1">Medium Priority</div>
              <div className="text-sm truncate">Spam link...</div>
            </div>
            <div className="bg-amber-500/20 border border-amber-500/30 p-3 rounded-lg text-center w-[180px] mt-4">
              <div className="text-xs text-amber-400 font-bold mb-1">Medium Priority</div>
              <div className="text-sm truncate">Unverified claim...</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded">Low priority items form the leaves...</div>
          </div>
        </div>
      </div>
    </div>
  )
}
