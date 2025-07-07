import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105",
  {
    variants: {
      variant: {
        success: "bg-success/10 text-success border border-success/20 shadow-success/20",
        warning: "bg-warning/10 text-warning border border-warning/20 shadow-warning/20",
        error: "bg-destructive/10 text-destructive border border-destructive/20 shadow-error/20",
        info: "bg-primary/10 text-primary border border-primary/20 shadow-glow/20",
        neutral: "bg-muted/50 text-muted-foreground border border-border/50",
        pending: "bg-orange-500/10 text-orange-600 border border-orange-500/20",
        processing: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
        completed: "bg-green-500/10 text-green-600 border border-green-500/20",
        cancelled: "bg-red-500/10 text-red-600 border border-red-500/20",
        active: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
        inactive: "bg-gray-500/10 text-gray-600 border border-gray-500/20",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
      animated: {
        true: "animate-pulse-slow",
        false: "",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
      animated: false,
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  icon?: React.ReactNode;
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  className,
  variant,
  size,
  animated,
  icon,
  pulse = false,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        statusBadgeVariants({ variant, size, animated }),
        pulse && "animate-pulse",
        className
      )}
      {...props}
    >
      {icon && <span className="w-2 h-2">{icon}</span>}
      {children}
    </span>
  );
};

// Predefined status badges for common use cases
export const SuccessBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="success" {...props} />
);

export const WarningBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="warning" {...props} />
);

export const ErrorBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="error" {...props} />
);

export const InfoBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="info" {...props} />
);

export const PendingBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="pending" pulse {...props} />
);

export const ProcessingBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="processing" animated {...props} />
);

export const CompletedBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="completed" {...props} />
);

export const CancelledBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="cancelled" {...props} />
);

export const ActiveBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="active" {...props} />
);

export const InactiveBadge: React.FC<Omit<StatusBadgeProps, 'variant'>> = (props) => (
  <StatusBadge variant="inactive" {...props} />
);