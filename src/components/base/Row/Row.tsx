import React from "react";
import { Row as BootstrapRow } from "react-bootstrap";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Row: React.FC<Props> = ({ children, className = "", ...props }) => {
  return (
    <BootstrapRow className={className} {...props}>
      {children}
    </BootstrapRow>
  );
};

export default Row;
