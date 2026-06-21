import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-light-700 dark:text-gray-500 font-mono text-sm">{subtitle}</p>
      )}
    </motion.div>
  );
}
