import { motion } from 'framer-motion';

export default function PageLayout({ children, maxWidth = 'max-w-4xl' }) {
  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-900 transition-colors duration-300">
      <div className={`${maxWidth} mx-auto px-6 py-20`}>
        {children}
      </div>
    </div>
  );
}
