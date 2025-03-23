import React, { ReactNode } from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import './Card.scss';

interface Props {
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  onClick?: () => void;
  isEmployeeCard?: boolean;
}

const Card: React.FC<Props> = ({
  title,
  children,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  onClick,
  isEmployeeCard = false,
  ...props
}) => {
  const cardClassName =
    `${className} ${isEmployeeCard ? 'employee-card' : ''}`.trim();

  return (
    <BootstrapCard className={cardClassName} onClick={onClick} {...props}>
      {title && (
        <BootstrapCard.Header className={headerClassName}>
          {title}
        </BootstrapCard.Header>
      )}
      <BootstrapCard.Body className={bodyClassName}>
        {children}
      </BootstrapCard.Body>
      {footer && (
        <BootstrapCard.Footer className={footerClassName}>
          {footer}
        </BootstrapCard.Footer>
      )}
    </BootstrapCard>
  );
};

export default Card;
