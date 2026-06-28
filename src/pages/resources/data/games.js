import { FiPackage } from 'react-icons/fi';

const games = [
  {
    id: 'minecraft-pack', category: 'games',
    title: 'Minecraft 整合包', icon: FiPackage,
    version: '按整合包来', size: '按整合包来', updated: '2026-06-28',
    tags: ['科技模组', '魔法冒险', '整合包合集'],
    desc: '精选 Minecraft 整合包资源合集，收集了科技向与魔法向的一些整合包。',
    detail: '收集了科技向、魔法向以及生活类（如生活大冒险等）的一些 Minecraft Java 版整合包。种类比较杂，因整合包较多，简介无法完整展示所有内容，具体详情请以整合包实际情况为准。\n\n📌 此合集我会不定时更新，有新的整合包会陆续添加进来。',
    requirements: '具体要求请按对应整合包来看，不同整合包的系统要求可能不同。',
    links: [
      { label: '百度网盘', url: 'https://pan.baidu.com/s/1M-dmHBNFObMpkCnhRlfi0A?pwd=b2z2', note: '提取码：b2z2', code: 'b2z2', type: '百度网盘' },
    ],
  },
];

export default games;
