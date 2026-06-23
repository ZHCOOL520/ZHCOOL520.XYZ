import { FiPackage } from 'react-icons/fi';

const games = [
  {
    id: 'minecraft-pack', category: 'games',
    title: 'Minecraft 整合包', icon: FiPackage,
    version: '2.1.0', size: '1.2 GB - 3.5 GB', updated: '2025-05',
    tags: ['原版增强', '科技模组', '魔法冒险'],
    desc: '精选 Minecraft 整合包资源合集，涵盖多种玩法，一键安装即玩。',
    detail: '精心收集并整理多款优质 Minecraft Java 版整合包，涵盖科技向（GregTech、Create）、魔法向（Ars Nouveau、Botania）、冒险向（The Twilight Forest、AdventureZ）以及原版增强等多种类型。每个整合包均经过兼容性测试，内置 OptiFine 和性能优化模组，提供开箱即用的游戏体验。',
    requirements: 'Java 17+ · 4GB+ 内存分配 · 独立显卡推荐',
    links: [
      { label: '百度网盘', url: 'https://pan.baidu.com/s/1M-dmHBNFObMpkCnhRlfi0A?pwd=b2z2', note: '提取码：b2z2', code: 'b2z2', type: '百度网盘' },
    ],
  },
];

export default games;
