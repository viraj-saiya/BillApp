import React from 'react';

// Define button variants and sizes
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  // Content
  children?: React.ReactNode;
  title?: string;
  
  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  // Styling
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  
  // Behavior
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  
  // HTML button props
  type?: 'button' | 'submit' | 'reset';
  
  // Accessibility
  'aria-label'?: string;
  'data-testid'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  title,
  leftIcon,
  rightIcon,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  'aria-label': ariaLabel,
  'data-testid': testId,
  ...props
}) => {
  // Base classes
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-md',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:transform-none',
  ];

  // Size variants
  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm', 'gap-1.5'],
    md: ['px-4', 'py-2', 'text-sm', 'gap-2'],
    lg: ['px-6', 'py-3', 'text-base', 'gap-2.5'],
  };

  // Color variants
  const variantClasses = {
    primary: [
      // 'bg-gradient-to-r',
      // 'from-blue-500',
      // 'to-purple-500',
      // 'hover:from-blue-600',
      // 'hover:to-purple-600',
      'text-white',
      'hover:shadow-lg',
      'hover:-translate-y-0.5',
      'focus:ring-blue-500',
      "bg-brand-primary hover:bg-brand-primary text-cream"
    ],
    secondary: [
      // 'bg-gray-100',
      // 'hover:bg-gray-200',
      'text-gray-900',
      'hover:shadow-md',
      'focus:ring-gray-500',
      "bg-brand-secondary hover:bg-brand-secondary text-cream"
    ],
    outline: [
      'border',
      'border-gray-300',
      'bg-transparent',
      'hover:bg-gray-50',
      'text-gray-700',
      'hover:border-gray-400',
      'focus:ring-gray-500',
    ],
    ghost: [
      'bg-transparent',
      'hover:bg-gray-100',
      'text-gray-600',
      'hover:text-gray-900',
      'focus:ring-gray-500',
    ],
    danger: [
      'bg-brand-accent',
      'hover:bg-brand-accent',
      'text-white',
      'hover:shadow-lg',
      'hover:-translate-y-0.5',
      'focus:ring-red-500',
    ],
  };

  // Width classes
  const widthClasses = fullWidth ? ['w-full'] : [];

  // Loading classes
  const loadingClasses = loading ? ['cursor-wait'] : [];

  // Combine all classes
  const buttonClasses = [
    ...baseClasses,
    ...sizeClasses[size],
    ...variantClasses[variant],
    ...widthClasses,
    ...loadingClasses,
    className,
   
  ].join(' ');

  // Content to display
  
  const displayContent = children || title;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-label={ariaLabel}
      data-testid={testId}
      {...props}
    >
      {/* Left Icon */}
      {leftIcon && !loading && (
        <span className="flex-shrink-0">
          {leftIcon}
        </span>
      )}
      
      {/* Loading Spinner */}
      {loading && (
        <span className="flex-shrink-0">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}

      {/* Button Content */}
      {displayContent && (
        <span className={loading ? 'opacity-70' : ''}>
          {displayContent}
        </span>
      )}

      {/* Right Icon */}
      {rightIcon && !loading && (
        <span className="flex-shrink-0">
          {rightIcon}
        </span>
      )}
    </button>
  );
};