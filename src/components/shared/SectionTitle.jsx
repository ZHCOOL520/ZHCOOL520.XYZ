import { useGsapInView } from '../../utils/gsapAnimations';

export default function SectionTitle({ title, subtitle, light = false }) {
  const ref = useGsapInView();
  return (
    <div ref={ref} className="text-center mb-12">
      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${light ? 'text-white' : 'text-light-900 dark:text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm font-mono ${light ? 'text-gray-500' : 'text-light-500 dark:text-gray-500'} tracking-wide`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
