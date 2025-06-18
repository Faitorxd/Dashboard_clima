import { ChevronDown, ChevronUp } from 'lucide-react';

export default function StatCard({
  icon,
  colorClass,
  title,
  value,
  unit,
  badge,
  expanded,
  onClick,
  children
}) {
  return (
    <div
      className={`${colorClass} card-stat${expanded ? ' expanded' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer', transition: 'box-shadow 0.3s, min-height 0.3s', position: 'relative' }}
    >
      <div className="card-content">
        <div className="card-header">
          <div className="icon-bg">{icon}</div>
          {badge}
        </div>
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}{unit}</p>
        {children}
        <div
          className="card-chevron"
          style={{ position: 'absolute', bottom: expanded ? 8 : 18, right: 22, zIndex: 2 }}
        >
          {expanded ? (
            <ChevronUp size={28} color="#fff" style={{ transition: 'transform 0.3s' }} />
          ) : (
            <ChevronDown size={28} color="#fff" style={{ transition: 'transform 0.3s' }} />
          )}
        </div>
      </div>
    </div>
  );
} 