export const moderationQueue = [
  {
    id: 1,
    postId: 6, // Refers to the infrastructure conspiracy tweet
    content: 'The new digital infrastructure bill is a complete scam. All that money is going straight to big telecom monopolies. Don\'t believe the lies they feed you! #CorruptGov',
    author: 'Truth Seeker',
    platform: 'Twitter',
    priority: 'High',
    reason: 'Misinformation',
    status: 'Pending',
    reportedAt: '2026-09-01T16:30:00Z',
    assignedTo: null,
    reviewedAt: null
  },
  {
    id: 2,
    postId: 8, // Refers to anti-AI tweet
    content: 'I don\'t know about you, but GPT-5 being self-aware sounds like exactly how Skynet started. We should be halting AI research, not accelerating it.',
    author: 'Anti Tech Bro',
    platform: 'Twitter',
    priority: 'Medium',
    reason: 'Unverified Claims',
    status: 'Pending',
    reportedAt: '2026-09-02T11:00:00Z',
    assignedTo: 'alexj',
    reviewedAt: null
  },
  {
    id: 3,
    postId: 14, // Climate scam
    content: 'Fake news! The climate summit agreement is just a ploy to tax the working class. Wake up sheeple! There is no climate crisis! #ClimateScam',
    author: 'Free Thinker',
    platform: 'Twitter',
    priority: 'High',
    reason: 'Misinformation',
    status: 'Flagged',
    reportedAt: '2026-09-01T20:00:00Z',
    assignedTo: 'alexj',
    reviewedAt: '2026-09-01T20:15:00Z'
  },
  {
    id: 4,
    postId: 201, // Mock
    content: 'Win a free iPhone 18 by clicking this link and sending $5 to this crypto address!',
    author: 'Crypto Scammer',
    platform: 'LinkedIn',
    priority: 'Medium',
    reason: 'Spam',
    status: 'Reviewed',
    reportedAt: '2026-09-02T05:00:00Z',
    assignedTo: 'bot',
    reviewedAt: '2026-09-02T05:01:00Z'
  },
  {
    id: 5,
    postId: 202,
    content: 'The opposing team supporters should be physically banned from the stadium by any means necessary.',
    author: 'Ultra Fan',
    platform: 'Reddit',
    priority: 'High',
    reason: 'Hate Speech / Violence',
    status: 'Pending',
    reportedAt: '2026-09-02T14:20:00Z',
    assignedTo: null,
    reviewedAt: null
  },
  {
    id: 6,
    postId: 203,
    content: 'Great product, loved it! Buy here: link',
    author: 'Bot Network',
    platform: 'Twitter',
    priority: 'Low',
    reason: 'Coordinated Inauthentic Behavior',
    status: 'Pending',
    reportedAt: '2026-09-02T10:10:00Z',
    assignedTo: null,
    reviewedAt: null
  },
  {
    id: 7,
    postId: 204,
    content: 'Stock market is rigged, the elites are stealing your 401k right now. Sell everything immediately!',
    author: 'Panic Poster',
    platform: 'Reddit',
    priority: 'Medium',
    reason: 'Misinformation',
    status: 'Reviewed',
    reportedAt: '2026-09-01T17:15:00Z',
    assignedTo: 'alexj',
    reviewedAt: '2026-09-01T18:00:00Z'
  },
  {
    id: 8,
    postId: 205,
    content: 'I have insider info on the next Fed rate cut. Subscribe to my discord to get the exact time and date.',
    author: 'Finance Guru',
    platform: 'Twitter',
    priority: 'High',
    reason: 'Spam / Scam',
    status: 'Pending',
    reportedAt: '2026-09-02T12:00:00Z',
    assignedTo: null,
    reviewedAt: null
  }
];
