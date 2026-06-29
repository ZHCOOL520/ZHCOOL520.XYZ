import { FiPackage, FiCoffee } from 'react-icons/fi';

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
  {
    id: 'minecraft-java-jdk', category: 'games',
    title: 'Minecraft Java JDK', icon: FiCoffee,
    version: 'Java 版推荐', size: '按版本来', updated: '2026-06-30',
    tags: ['Minecraft', 'Java', 'JDK', '运行环境'],
    desc: '部分推荐的《我的世界》Java 版本 JDK 运行环境，适用于 Minecraft Java 版。',
    detail: '这是部分推荐的《我的世界》Java 版本 JDK 运行环境合集，包含适用于 Minecraft Java 版的 Java 开发工具包。\n\nMinecraft Java 版需要对应的 Java 运行环境才能正常启动，不同版本的 Minecraft 可能需要不同版本的 JDK。',
    requirements: 'Windows / macOS / Linux · 按需选择对应版本',
    links: [
      { label: '百度网盘', url: 'https://pan.baidu.com/s/1Daei7HFgYiTSqJweOv6aUA?pwd=2333', note: '提取码：2333', code: '2333', type: '百度网盘' },
    ],
  },
];

export default games;
