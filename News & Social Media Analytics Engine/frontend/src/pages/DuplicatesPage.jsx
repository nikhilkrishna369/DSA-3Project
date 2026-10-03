import React, { useState } from 'react'
import { Cpu, Search, AlertTriangle, CheckCircle, FileText } from 'lucide-react'
import { newsArticles } from '../data/newsData'
import StatCard from '../components/ui/StatCard'

export default function DuplicatesPage() {
  const [inputText, setInputText] = useState('')
  const [comparisonText, setComparisonText] = useState('')
  const [hashOutput, setHashOutput] = useState('')
  const [similarityResult, setSimilarityResult] = useState(null)

  const handleInputChange = (e) => {
    const text = e.target.value
    setInputText(text)
    // Mock hash function output based on length and first few chars
    if (text.length > 0) {
      const mockHash = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(16) + 'a8f9c2e'
      setHashOutput(mockHash.substring(0, 8))
    } else {
      setHashOutput('')
    }
  }

  const checkSimilarity = () => {
    if (!inputText || !comparisonText) return
    // Simple mock similarity
    const words1 = inputText.toLowerCase().split(' ')
    const words2 = comparisonText.toLowerCase().split(' ')
    const intersection = words1.filter(w => words2.includes(w)).length
    const union = new Set([...words1, ...words2]).size
    const sim = Math.round((intersection / union) * 100) || 0
    setSimilarityResult(sim)
  }

  const duplicates = newsArticles.filter(a => a.isDuplicate)
  const originals = newsArticles.filter(a => !a.isDuplicate)

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Duplicate Content Detection</h1>
        <p className="text-slate-400 mb-6">Hash Table-based content fingerprinting detects similar articles</p>
        
        <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-violet-500/20 p-2 rounded-lg">
            <Cpu className="text-violet-500 w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-violet-300 mb-1">Hash Table Implementation</h3>
            <p className="text-sm text-slate-300 mb-2">
              Each article is processed through a polynomial rolling hash function (Rabin-Karp inspired). The resulting fingerprint is stored in a Hash Table. When a new article arrives, its hash is computed and compared against existing entries. For near-duplicates, Jaccard similarity on word bigrams is computed.
            </p>
            <div className="text-xs text-violet-400 font-medium">
              Stats: Total Hashed: 847 | Collisions Resolved: 12 | Detection Rate: 97.3%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Articles Hashed" value="847" />
        <StatCard title="Duplicates Detected" value="23" trend="up" color="red" />
        <StatCard title="Near-Duplicates" value="11" trend="up" color="amber" />
        <StatCard title="Unique Articles" value="824" trend="up" color="emerald" />
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-bold mb-4">Live Hash Demonstration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all h-32"
              placeholder="Enter any text to see how the hash function works..."
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 font-mono text-violet-400 text-sm">
              Hash: {hashOutput || '...'}
            </div>
          </div>
          <div className="space-y-4">
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all h-32"
              placeholder="Enter comparison text..."
              value={comparisonText}
              onChange={(e) => setComparisonText(e.target.value)}
            ></textarea>
            <div className="flex gap-4 items-center">
              <button 
                onClick={checkSimilarity}
                className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Similarity Check
              </button>
              {similarityResult !== null && (
                <span className={`font-bold ${similarityResult > 80 ? 'text-red-400' : similarityResult > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {similarityResult}% Similar
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">Note: In production, this runs server-side with O(1) lookup in the Hash Table</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">Detected Duplicate Clusters</h2>
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 bg-slate-800/50">
            <h3 className="font-semibold text-slate-200">AI/GPT-5 Cluster</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg">
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">ORIGINAL</span>
              <p className="text-sm font-medium">GPT-5 Expected to Launch Later This Year, Revolutionizing AI Capabilities</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {duplicates.slice(0, 2).map((dup, i) => (
                <div key={i} className="flex flex-col border border-slate-700 rounded-lg overflow-hidden">
                  <div className="p-3 bg-slate-700/30 border-b border-slate-700 flex justify-between items-center">
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded font-semibold">Duplicate Detected</span>
                    <span className="text-xl font-bold text-red-400">{dup.similarityScore || 92}%</span>
                  </div>
                  <div className="p-3 text-sm text-slate-300 bg-slate-800">
                    {dup.title}
                  </div>
                  <div className="p-2 bg-slate-900 text-xs text-slate-500 flex justify-between">
                    <span>{dup.source}</span>
                    <span>{dup.publishedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold">All Articles Hash Table View</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-800 text-slate-400 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Hash</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Similarity</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 bg-slate-900">
              {newsArticles.map((article, i) => (
                <tr key={i} className="hover:bg-slate-800/50">
                  <td className="px-4 py-3 truncate max-w-xs">{article.title}</td>
                  <td className="px-4 py-3">{article.source}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{article.hash?.substring(0, 8) || 'a8f9c2e'}...</td>
                  <td className="px-4 py-3">
                    {article.isDuplicate ? (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Duplicate</span>
                    ) : article.similarityScore > 80 ? (
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">Near Dup</span>
                    ) : (
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Unique</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{article.similarityScore ? `${article.similarityScore}%` : '-'}</td>
                  <td className="px-4 py-3">
                    <button className="text-violet-400 hover:text-violet-300 text-xs font-semibold">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-bold mb-4">How Hash Table Works</h2>
        <div className="flex flex-col md:flex-row items-center gap-8 py-4">
          <div className="flex-1 bg-slate-900 p-4 rounded-lg border border-slate-700 w-full text-center text-sm">
            <span className="text-violet-400 font-mono block mb-2">New Article Title</span>
            "GPT-5 Announced"
          </div>
          <div className="text-slate-500">→ hash() →</div>
          <div className="flex-1 bg-slate-900 p-4 rounded-lg border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)] w-full">
            <div className="text-xs text-slate-400 mb-2">Hash Table (Buckets)</div>
            <div className="flex flex-col gap-1 font-mono text-xs">
              <div className="flex bg-slate-800 rounded"><span className="w-6 text-center border-r border-slate-700 text-slate-500">0</span><span className="p-1 pl-2 text-slate-500 italic">empty</span></div>
              <div className="flex bg-slate-800 rounded"><span className="w-6 text-center border-r border-slate-700 text-slate-500">1</span><span className="p-1 pl-2 text-slate-500 italic">empty</span></div>
              <div className="flex bg-violet-900/40 border border-violet-500/50 rounded"><span className="w-6 text-center border-r border-violet-500/50 text-violet-300">2</span><span className="p-1 pl-2 text-violet-300">id: 17 (Collision! check sim)</span></div>
              <div className="flex bg-slate-800 rounded"><span className="w-6 text-center border-r border-slate-700 text-slate-500">3</span><span className="p-1 pl-2 text-slate-500 italic">empty</span></div>
              <div className="text-center text-slate-600 my-1">...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
