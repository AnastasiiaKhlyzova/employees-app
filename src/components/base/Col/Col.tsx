import React from "react";
import { Col as BootstrapCol } from "react-bootstrap";

interface Props {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: React.ReactNode;
  className?: string;
}

const Col: React.FC<Props> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  children,
  className = "",
  ...props
}) => {
  return (
    <BootstrapCol
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      className={className}
      {...props}
    >
      {children}
    </BootstrapCol>
  );
};

export default Col;
