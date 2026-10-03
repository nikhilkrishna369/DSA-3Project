export const graphNodes = [
  // AI Cluster (Top Left)
  { id: 'news-1', type: 'default', position: { x: 100, y: 100 }, data: { label: 'OpenAI GPT-5', type: 'news', category: 'Technology', trendScore: 94, priority: 'High', articleId: 1 }, style: { background: '#1d4ed8', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'news-6', type: 'default', position: { x: 50, y: 200 }, data: { label: 'New AI Tech (Dup)', type: 'news', category: 'Technology', trendScore: 78, priority: 'Medium', articleId: 6 }, style: { background: '#1d4ed8', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'news-8', type: 'default', position: { x: 200, y: 180 }, data: { label: 'Bing AI Search', type: 'news', category: 'Technology', trendScore: 83, priority: 'High', articleId: 8 }, style: { background: '#1d4ed8', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'news-17', type: 'default', position: { x: -50, y: 120 }, data: { label: 'GPT-5 Era', type: 'news', category: 'Technology', trendScore: 93, priority: 'High', articleId: 17 }, style: { background: '#1d4ed8', border: '2px solid #3b82f6', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'social-1', type: 'default', position: { x: 150, y: 30 }, data: { label: 'Tweet: Mind-blowing GPT-5', type: 'social' }, style: { background: '#374151', border: '2px solid #6b7280', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '10px' } },
  { id: 'social-8', type: 'default', position: { x: 0, y: 40 }, data: { label: 'Tweet: AI Skynet fears', type: 'social' }, style: { background: '#374151', border: '2px solid #6b7280', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '10px' } },

  // Science Cluster (Top Right)
  { id: 'news-5', type: 'default', position: { x: 500, y: 100 }, data: { label: 'Alzheimer Treatment', type: 'news', category: 'Science', trendScore: 91, priority: 'High', articleId: 5 }, style: { background: '#5b21b6', border: '2px solid #8b5cf6', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'news-13', type: 'default', position: { x: 650, y: 150 }, data: { label: 'Quantum Breakthrough', type: 'news', category: 'Science', trendScore: 89, priority: 'High', articleId: 13 }, style: { background: '#5b21b6', border: '2px solid #8b5cf6', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'news-18', type: 'default', position: { x: 450, y: 220 }, data: { label: 'Solar Cost Parity', type: 'news', category: 'Science', trendScore: 74, priority: 'Medium', articleId: 18 }, style: { background: '#5b21b6', border: '2px solid #8b5cf6', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'social-7', type: 'default', position: { x: 680, y: 60 }, data: { label: 'Reddit: Crypto broken?', type: 'social' }, style: { background: '#374151', border: '2px solid #6b7280', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '10px' } },

  // Finance Cluster (Bottom Left)
  { id: 'news-4', type: 'default', position: { x: 100, y: 400 }, data: { label: 'Markets Rally', type: 'news', category: 'Business', trendScore: 65, priority: 'Medium', articleId: 4 }, style: { background: '#92400e', border: '2px solid #f59e0b', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'news-9', type: 'default', position: { x: -20, y: 480 }, data: { label: 'Bitcoin $120k', type: 'news', category: 'Business', trendScore: 70, priority: 'Medium', articleId: 9 }, style: { background: '#92400e', border: '2px solid #f59e0b', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'news-12', type: 'default', position: { x: 180, y: 500 }, data: { label: 'Fed Holds Rates', type: 'news', category: 'Business', trendScore: 68, priority: 'Medium', articleId: 12 }, style: { background: '#92400e', border: '2px solid #f59e0b', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'social-5', type: 'default', position: { x: 150, y: 320 }, data: { label: 'LinkedIn: Rate cut soon?', type: 'social' }, style: { background: '#374151', border: '2px solid #6b7280', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '10px' } },

  // Politics/Climate Cluster (Bottom Right)
  { id: 'news-10', type: 'default', position: { x: 500, y: 400 }, data: { label: 'UN Climate Deal', type: 'news', category: 'Science', trendScore: 87, priority: 'High', articleId: 10 }, style: { background: '#5b21b6', border: '2px solid #8b5cf6', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } }, // Actually science in the dataset, but fits here contextually. Bordering politics.
  { id: 'news-14', type: 'default', position: { x: 650, y: 450 }, data: { label: 'G20 Trade Framework', type: 'news', category: 'Politics', trendScore: 58, priority: 'Medium', articleId: 14 }, style: { background: '#1e293b', border: '2px solid #64748b', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } },
  { id: 'social-3', type: 'default', position: { x: 420, y: 330 }, data: { label: 'Reddit: Climate deal weak', type: 'social' }, style: { background: '#374151', border: '2px solid #6b7280', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '10px' } },
  { id: 'social-6', type: 'default', position: { x: 700, y: 380 }, data: { label: 'Tweet: Telecom monopoly', type: 'social' }, style: { background: '#374151', border: '2px solid #6b7280', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '10px' } },
  
  // Extra sports node just to include it
  { id: 'news-3', type: 'default', position: { x: 350, y: 550 }, data: { label: 'CL Final: RMA vs MCI', type: 'news', category: 'Sports', trendScore: 88, priority: 'High', articleId: 3 }, style: { background: '#065f46', border: '2px solid #10b981', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '12px' } }
];

export const graphEdges = [
  // AI edges
  { id: 'e1-6', source: 'news-1', target: 'news-6', label: '91% sim', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 }, labelStyle: { fill: '#ef4444', fontSize: 10 } },
  { id: 'e1-8', source: 'news-1', target: 'news-8', label: 'Related', animated: false, style: { stroke: '#94a3b8' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },
  { id: 'e1-17', source: 'news-1', target: 'news-17', label: '88% sim', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 }, labelStyle: { fill: '#ef4444', fontSize: 10 } },
  { id: 's1-1', source: 'social-1', target: 'news-1', label: 'References', animated: false, style: { stroke: '#94a3b8', strokeDasharray: '5,5' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },
  { id: 's8-1', source: 'social-8', target: 'news-1', label: 'References', animated: false, style: { stroke: '#94a3b8', strokeDasharray: '5,5' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },

  // Science edges
  { id: 'e5-13', source: 'news-5', target: 'news-13', label: 'Related', animated: false, style: { stroke: '#94a3b8' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },
  { id: 'e5-18', source: 'news-5', target: 'news-18', label: 'Related', animated: false, style: { stroke: '#94a3b8' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },
  { id: 's7-13', source: 'social-7', target: 'news-13', label: 'References', animated: false, style: { stroke: '#94a3b8', strokeDasharray: '5,5' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },

  // Finance edges
  { id: 'e4-9', source: 'news-4', target: 'news-9', label: 'Related', animated: false, style: { stroke: '#94a3b8' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },
  { id: 'e4-12', source: 'news-4', target: 'news-12', label: 'Related', animated: false, style: { stroke: '#94a3b8' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },
  { id: 's5-4', source: 'social-5', target: 'news-4', label: 'References', animated: false, style: { stroke: '#94a3b8', strokeDasharray: '5,5' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },

  // Politics/Climate edges
  { id: 'e10-14', source: 'news-10', target: 'news-14', label: 'Related', animated: false, style: { stroke: '#94a3b8' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },
  { id: 's3-10', source: 'social-3', target: 'news-10', label: 'References', animated: false, style: { stroke: '#94a3b8', strokeDasharray: '5,5' }, labelStyle: { fill: '#94a3b8', fontSize: 10 } },
];
