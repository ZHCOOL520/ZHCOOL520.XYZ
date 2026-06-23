import { Link } from 'react-router-dom';

export default function BackLink({ to, label = '返回', hash }) {
  const linkTo = hash ? { pathname: to, hash } : to;
  return (
    <Link to={linkTo} className="btn-glass text-sm mb-8" aria-label={`${label}，返回上一级页面`}>
      {label}
    </Link>
  );
}
