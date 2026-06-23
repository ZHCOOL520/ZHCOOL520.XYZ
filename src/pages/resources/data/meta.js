export const categories = [
  { id: 'system', label: '电脑系统', accent: 'text-blue-500' },
  { id: 'software', label: '实用软件', accent: 'text-emerald-500' },
  { id: 'games', label: '游戏资源', accent: 'text-purple-500' },
];

export const categoryMeta = {
  system: {
    accent: 'text-blue-500', accentBg: 'bg-blue-500/10',
    border: 'border-blue-500/15', iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    glow: 'hover:shadow-blue-500/10', label: '电脑系统',
  },
  software: {
    accent: 'text-emerald-500', accentBg: 'bg-emerald-500/10',
    border: 'border-emerald-500/15', iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    glow: 'hover:shadow-emerald-500/10', label: '实用软件',
  },
  games: {
    accent: 'text-purple-500', accentBg: 'bg-purple-500/10',
    border: 'border-purple-500/15', iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    glow: 'hover:shadow-purple-500/10', label: '游戏资源',
  },
};
