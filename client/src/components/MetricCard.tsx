import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    direction: "up" | "down";
    percentage: number;
  };
  className?: string;
  delay?: number;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = "",
  delay = 0,
}: MetricCardProps) {
  return (
    <div
      className={`
        relative group overflow-hidden
        bg-gradient-to-br from-card to-card/95
        text-card-foreground rounded-xl p-6
        border border-border/50 shadow-sm
        hover:shadow-lg hover:border-primary/20
        transition-all duration-500 ease-out
        animate-fade-in
        ${className}
      `}
      style={{
        animationDelay: `${delay * 100}ms`,
      }}
    >
      {/* Decorative background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {title}
            </p>
            <p className="text-2xl font-bold font-poppins bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {icon && (
            <div className="ml-4 p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors duration-300">
              {icon}
            </div>
          )}
        </div>

        {trend && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <span
                className={`
                  text-sm font-semibold
                  ${trend.direction === "up" ? "text-green-600" : "text-orange-600"}
                `}
              >
                {trend.direction === "up" ? "↑" : "↓"} {trend.percentage}%
              </span>
              <span className="text-xs text-muted-foreground">
                vs período anterior
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Accent line on top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
