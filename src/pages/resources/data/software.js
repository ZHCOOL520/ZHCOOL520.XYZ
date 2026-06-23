import { FiTerminal } from 'react-icons/fi';

const software = [
  {
    id: 'music-converter', category: 'software',
    title: '音乐转码工具', icon: FiTerminal,
    version: '3.2.0', size: '15 MB', updated: '2025-04',
    tags: ['酷狗', 'QQ音乐', '网易云', 'MP3', 'FLAC', '转码'],
    desc: '支持加密音乐文件转换为通用格式 MP3 / FLAC，兼容主流音乐平台。',
    detail: '一款轻量级的音乐格式转换工具，支持将酷狗音乐（.kgm）、QQ 音乐（.qmc）、网易云音乐（.ncm）等主流平台的加密音频文件，无损转换为通用的 MP3、FLAC、AAC 等格式。采用 FFmpeg 内核，转换速度快、质量高，保留完整元数据（标题、艺术家、专辑、封面）。',
    requirements: 'Windows 7+ · 50MB 磁盘空间 · 依赖 VC++ 运行库',
    links: [
      { label: '蓝奏云', url: 'https://wwavs.lanzouv.com/b01d70zyuh', note: '密码：2333', code: '2333', type: '蓝奏云' },
    ],
  },
];

export default software;
