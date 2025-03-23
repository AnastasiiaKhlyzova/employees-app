import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import './Button.scss';

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<Props> = ({
  variant = 'primary',
  size,
  disabled = false,
  onClick,
  type = 'button',
  children,
  className,
  ...props
}) => {
  return (
    <BootstrapButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={` ${className || ''}`}
      {...props}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;
