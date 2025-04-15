
export type BetaUser = {
  id: string;
  email: string;
  joinedAt: Date;
  status: 'active' | 'pending' | 'inactive';
  hasFeedback: boolean;
  lastActive: Date;
  inviteCode?: string;
};

export type FeedbackType = {
  id: string;
  userId: string;
  content: string;
  category: 'general' | 'bugs' | 'features' | 'ux';
  createdAt: Date;
  rating: 1 | 2 | 3 | 4 | 5;
};
