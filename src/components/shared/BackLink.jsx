import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackLink({ to, label = '返回' }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-light-700 dark:text-gray-400 hover:text-neon-cyan transition-colors mb-8"
      aria-label={`${label}，返回上一级页面`}
    >
      <FiArrowLeft aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
