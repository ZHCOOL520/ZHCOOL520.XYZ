import { FiMonitor, FiHardDrive } from 'react-icons/fi';

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
  {
    id: 'vmware-virtual-machine', category: 'system',
    title: 'VMware 虚拟机', icon: FiHardDrive,
    version: '精选合集', size: '按版本不同', updated: '2026-07-16',
    tags: ['VMware', '虚拟机', '系统安装', '环境模拟'],
    desc: 'VMware 虚拟机资源合集，可在现有系统上运行独立的操作系统环境，适合软件开发、测试与学习。',
    detail: 'VMware 是一款功能强大的桌面虚拟化软件，允许你在当前操作系统上运行多个独立的操作系统。\n\n通过虚拟机，你可以：\n• 安全地测试各种操作系统（Windows、Linux 等）\n• 为软件开发提供隔离的运行环境\n• 学习和练习系统安装、配置等操作\n• 运行不兼容当前系统的软件\n\n虚拟机与宿主机完全隔离，操作不影响你现有的系统环境，非常适合开发、测试和学习使用。',
    requirements: '建议 8GB+ 内存 · 50GB+ 可用存储 · 支持 VT-x/AMD-V 虚拟化',
    links: [
      { label: '百度网盘', url: 'https://pan.baidu.com/s/1CkrmJ6LD-l89zamlSxfVyA?pwd=2333', note: '提取码：2333', code: '2333', type: '百度网盘' },
    ],
  },
];

export default system;
