export default function GlassCard({ children, className = '', hover = false }) {
  return (
    <div className={`glass rounded-2xl p-6 ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
}
