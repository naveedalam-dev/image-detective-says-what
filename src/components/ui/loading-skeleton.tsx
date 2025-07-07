import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'rectangular' | 'text';
  animation?: 'pulse' | 'wave' | 'none';
  width?: string | number;
  height?: string | number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'default',
  animation = 'pulse',
  width,
  height,
}) => {
  const baseClasses = "bg-muted/50";
  
  const variantClasses = {
    default: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-none",
    text: "rounded h-4",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-pulse-slow",
    none: "",
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  );
};

interface SkeletonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {children}
    </div>
  );
};

// Pre-built skeleton components
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("card-premium p-6", className)}>
    <SkeletonGroup>
      <LoadingSkeleton variant="text" width="60%" />
      <LoadingSkeleton variant="text" width="40%" />
      <LoadingSkeleton variant="rectangular" height={200} className="mt-4" />
      <div className="flex gap-2 mt-4">
        <LoadingSkeleton variant="rectangular" width={80} height={32} />
        <LoadingSkeleton variant="rectangular" width={80} height={32} />
      </div>
    </SkeletonGroup>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; className?: string }> = ({ 
  rows = 5, 
  className 
}) => (
  <div className={cn("space-y-3", className)}>
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="flex gap-4 items-center">
        <LoadingSkeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton variant="text" width="70%" />
          <LoadingSkeleton variant="text" width="50%" />
        </div>
        <LoadingSkeleton variant="rectangular" width={80} height={32} />
      </div>
    ))}
  </div>
);