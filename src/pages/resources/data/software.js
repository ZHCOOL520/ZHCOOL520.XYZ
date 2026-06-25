import { FiTerminal, FiMessageCircle } from 'react-icons/fi';

const software = [
  {
    id: 'revoke-msg-patcher', category: 'software',
    title: '微信/QQ/TIM防撤回补丁', icon: FiMessageCircle,
    version: '2.1', size: '~2 MB', updated: '2025-08',
    tags: ['微信', 'QQ', 'TIM', '防撤回', 'Windows', '多开'],
    desc: 'PC版微信/QQ/TIM防撤回补丁，支持微信多开功能，轻量实用。',
    detail: '一款适用于 Windows 的微信/QQ/TIM防撤回补丁工具，由 huiyadanli 开发。支持微信、QQ、TIM 三大平台的消息防撤回，微信还可选择安装多开功能。\n\n⚠️ 声明：本站仅作搬运分享，不参与任何开发与维护。本软件版权归原作者 huiyadanli 所有，请前往 GitHub 查看完整文档与开源协议（GPL-3.0）。\n\n使用方法：\n1. 确保系统满足 .NET Framework 4.5.2+，Windows 7+\n2. 关闭微信/QQ/TIM后以管理员身份运行本程序\n3. 选择安装路径，点击"防撤回"等待完成\n\n注意：微信/QQ/TIM更新后需重新安装补丁！杀毒软件可能误报，放行即可。',
    requirements: 'Windows 7+ · .NET Framework 4.5.2+ · 管理员权限',
    links: [
      { label: 'GitHub', url: 'https://github.com/huiyadanli/RevokeMsgPatcher', type: 'GitHub' },
      { label: '蓝奏云', url: 'https://wwavs.lanzouv.com/i8iOT3sxf8dg', type: '蓝奏云' },
    ],
  },
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
