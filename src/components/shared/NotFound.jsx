import { Link } from 'react-router-dom';
import PageLayout from './PageLayout.jsx';

export default function NotFound({ title = '页面未找到', backTo = '/', backLabel = '返回首页' }) {
  return (
    <PageLayout>
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-light-900 dark:text-white mb-4">{title}</h1>
        <Link to={backTo} className="text-neon-cyan hover:underline">{backLabel}</Link>
      </div>
    </PageLayout>
  );
}
