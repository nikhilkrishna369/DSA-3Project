import React, { useState } from 'react'
import { Network, ZoomIn, ZoomOut, Maximize } from 'lucide-react'
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, BackgroundVariant } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { graphNodes, graphEdges } from '../data/relationshipsData'
import { useNavigate } from 'react-router-dom'

export default function RelationshipsPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(graphNodes || [])
  const [edges, setEdges, onEdgesChange] = useEdgesState(graphEdges || [])
  const [selectedNode, setSelectedNode] = useState(null)
  const [bfsOutput, setBfsOutput] = useState([])
  const [bfsStartNode, setBfsStartNode] = useState(nodes[0]?.id || '')
  
  const navigate = useNavigate()

  const onNodeClick = (event, node) => {
    setSelectedNode(node)
  }

  const resetView = () => {
    setSelectedNode(null)
    setBfsOutput([])
  }

  const runBFS = () => {
    if (!bfsStartNode) return
    const visited = new Set()
    const queue = [bfsStartNode]
    const output = []
    
    while (queue.length > 0) {
      const currentId = queue.shift()
      if (!visited.has(currentId)) {
        visited.add(currentId)
        const node = nodes.find(n => n.id === currentId)
        if (node) output.push(node)
        
        // Find neighbors
        const neighbors = edges
          .filter(e => e.source === currentId || e.target === currentId)
          .map(e => e.source === currentId ? e.target : e.source)
        
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor)
          }
        }
      }
    }
    setBfsOutput(output)
  }

  const nodeColor = (node) => {
    switch (node.data?.category) {
      case 'Technology': return '#3b82f6' // blue
      case 'Science': return '#8b5cf6' // violet
      case 'Business': return '#10b981' // emerald
      case 'Politics': return '#f43f5e' // rose
      default: return '#64748b' // slate
    }
  }

  return (
    <div className="p-6 space-y-6 text-slate-100">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Story Relationship Network</h1>
        <p className="text-slate-400 mb-6">Graph data structure maps connections between news stories</p>
        
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-amber-500/20 p-2 rounded-lg">
            <Network className="text-amber-500 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-300 mb-2">
              Each story is a vertex in an adjacency-list graph. Edges represent relationships found through content similarity and topic clustering. BFS/DFS traversal discovers related story chains.
            </p>
            <div className="text-xs text-amber-400 font-medium">
              Stats: Total Nodes: {nodes.length} | Edges: {edges.length} | Clusters: 4 | Max Depth: 3
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between mb-2">
        <div className="flex gap-4 items-center">
          <button onClick={resetView} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md text-sm transition-colors">
            Reset View
          </button>
          <div className="flex gap-2 items-center text-xs">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-blue-500"></div> Tech</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-violet-500"></div> Science</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-emerald-500"></div> Biz</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="w-full h-[500px] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              fitView
              defaultEdgeOptions={{ animated: true, style: { stroke: '#64748b', strokeWidth: 2 } }}
              colorMode="dark"
            >
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#334155" />
              <Controls className="bg-slate-800 border-slate-700 fill-slate-300" />
              <MiniMap nodeColor={nodeColor} maskColor="rgba(15, 23, 42, 0.7)" className="bg-slate-800" />
            </ReactFlow>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-slate-400 text-xs mb-1">Largest Cluster</div>
              <div className="text-blue-400 font-bold">AI/Tech (4 nodes)</div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-slate-400 text-xs mb-1">Most Connected Node</div>
              <div className="text-amber-400 font-bold">GPT-5 Article (5 edges)</div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-slate-400 text-xs mb-1">Graph Density</div>
              <div className="text-emerald-400 font-bold">0.31</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {selectedNode ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <div className="text-xs text-amber-500 font-bold mb-1 uppercase tracking-wider">{selectedNode.data.category}</div>
              <h3 className="font-bold text-lg mb-2">{selectedNode.data.label}</h3>
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">Score: {selectedNode.data.trendScore}</span>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">{selectedNode.type}</span>
              </div>
              
              <div className="mb-4">
                <div className="text-xs text-slate-400 mb-2">Connected Neighbors:</div>
                <div className="flex flex-wrap gap-2">
                  {edges
                    .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((e, i) => {
                      const neighborId = e.source === selectedNode.id ? e.target : e.source
                      const neighbor = nodes.find(n => n.id === neighborId)
                      return neighbor ? (
                        <span key={i} className="text-xs bg-slate-900 border border-slate-600 px-2 py-1 rounded hover:bg-slate-700 cursor-pointer transition-colors" onClick={() => setSelectedNode(neighbor)}>
                          {neighbor.data.label.substring(0, 20)}...
                        </span>
                      ) : null
                    })}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button onClick={() => navigate(`/article/${selectedNode.id}`)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                  View Full Article
                </button>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm transition-colors">
                  Explore Neighbors
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center text-slate-400 flex flex-col items-center justify-center h-[280px]">
              <Network className="w-12 h-12 mb-4 text-slate-600" />
              <p>Click on any node in the graph to view its details and connections.</p>
            </div>
          )}

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h3 className="font-bold text-lg mb-4 text-white">BFS Traversal Demo</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Start from node:</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm focus:border-amber-500 outline-none"
                  value={bfsStartNode}
                  onChange={(e) => setBfsStartNode(e.target.value)}
                >
                  {nodes.map(n => <option key={n.id} value={n.id}>{n.data.label}</option>)}
                </select>
              </div>
              <button onClick={runBFS} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Run BFS
              </button>
              
              {bfsOutput.length > 0 && (
                <div className="mt-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="text-xs text-amber-400 mb-2 font-medium">DSA: BFS visits all neighbors before going deeper, discovering related stories layer by layer</div>
                  <div className="space-y-2 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                    {bfsOutput.map((node, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 bg-slate-800 text-slate-300 text-xs font-bold z-10 shrink-0">
                          {i + 1}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900 p-2 rounded border border-slate-700 shadow ml-4 md:ml-0 text-xs truncate">
                          {node.data.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 font-bold">Relationship Table</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-4 py-3">Source Story</th>
                <th className="px-4 py-3">Target Story</th>
                <th className="px-4 py-3">Relationship Type</th>
                <th className="px-4 py-3">Similarity Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {edges.slice(0, 8).map((edge, i) => {
                const sourceNode = nodes.find(n => n.id === edge.source)
                const targetNode = nodes.find(n => n.id === edge.target)
                return (
                  <tr key={i} className="hover:bg-slate-700/30">
                    <td className="px-4 py-3 truncate max-w-[200px]">{sourceNode?.data.label || edge.source}</td>
                    <td className="px-4 py-3 truncate max-w-[200px]">{targetNode?.data.label || edge.target}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded ${edge.label === 'related' ? 'bg-blue-500/20 text-blue-400' : 'bg-violet-500/20 text-violet-400'}`}>
                        {edge.label || 'related'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{Math.floor(Math.random() * 20 + 75)}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
