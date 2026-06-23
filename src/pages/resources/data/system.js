import { FiMonitor } from 'react-icons/fi';

const system = [
  {
    id: 'windows-iso', category: 'system',
    title: 'Windows 系统镜像', icon: FiMonitor,
    version: '2025.06', size: '4.7 GB - 6.4 GB', updated: '2025-06',
    tags: ['Win 11', 'Win 10', 'Win 7', 'Win 8.1', 'Win XP'],
    desc: '从 Windows 11 到 Windows XP 全版本系统镜像合集，包含原版 ISO 和优化版本。',
    detail: '收录 Microsoft 官方发布的 Windows 操作系统原版 ISO 镜像，涵盖 Windows 11 24H2、Windows 10 22H2、Windows 8.1、Windows 7 SP1 以及 Windows XP SP3 等主流版本。所有镜像均从官方渠道获取，SHA-1 校验一致，纯净无修改。另附部分常用的精简优化版，适合低配置设备使用。',
    requirements: '4GB+ 内存 · 64GB+ 存储 · 支持 UEFI/Legacy 启动',
    links: [
      { label: '百度网盘', url: 'https://pan.baidu.com/s/1xTAtytZd8OgLfQPhRvcoqA', note: '提取码：2333', code: '2333', type: '百度网盘' },
    ],
  },
];

export default system;
