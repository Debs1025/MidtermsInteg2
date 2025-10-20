import { getAllUsers } from '../models/userStore.js';

export function getHomeData(req, res) {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ message: 'Missing userId' });
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!user.verified) return res.status(403).json({ message: 'Email not verified' });

  const data = {
    featuredStories: [
      { id: 's1', title: 'The Cozy Forest', coverUrl: null },
      { id: 's2', title: 'Mystery at Dawn', coverUrl: null }
    ],
    readingStreak: user.profile.streakDays,
    ongoingQuests: user.progress.ongoingQuests,
    navigation: ['Home', 'Library', 'Dashboard', 'Shop', 'Profile'],
    tips: ['Read 15 minutes today!', 'Try a new genre.'],
    avatarUrl: user.profile.avatarUrl,
    rank: user.profile.rank,
  };
  res.json(data);
}


