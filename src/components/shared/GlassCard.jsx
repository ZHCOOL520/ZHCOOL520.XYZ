export default function GlassCard({ children, className = '', hover = false }) {
  return (
    <div
      className={`glass rounded-2xl p-6 neon-border ${
        hover ? 'card-hover hover:border-neon-cyan/40' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
